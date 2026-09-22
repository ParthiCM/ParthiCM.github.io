import * as THREE from 'three'

/**
 * The node field.
 *
 * A volumetric field of test nodes joined by pipeline edges, flown
 * through by a camera that reads scroll progress. Nodes resolve
 * pass-green or fail-red; packets travel along edges.
 *
 * Infinity without repetition:
 * the field is five independent "slabs" on a treadmill. Each slab
 * carries its own randomised nodes and edges. When a slab drifts past
 * the lens it is recycled to the back of the queue — and because that
 * happens *behind* the camera, it is invisible. The two obvious
 * alternatives both fail: wrapping individual nodes snaps their edges,
 * and looping one identical chunk shows a visible repeat within about
 * twenty seconds.
 */

const VERT = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vFade;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float d = -mv.z;
    gl_PointSize = aSize * (440.0 / max(d, 1.0));
    // Fade distant nodes into the fog, and very near ones out of the
    // way so they never smear across the lens as huge soft blobs.
    vFade = smoothstep(360.0, 40.0, d) * smoothstep(3.0, 18.0, d);
    gl_Position = projectionMatrix * mv;
  }
`

const FRAG = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;
  varying float vFade;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float core = 1.0 - smoothstep(0.0, 0.5, d);
    gl_FragColor = vec4(vColor, pow(core, 2.2) * vFade);
  }
`

const SLAB_DEPTH = 64
const SLAB_COUNT = 5
const FIELD_W = 78
const FIELD_H = 48

const PASS: [number, number, number] = [0.24, 0.86, 0.59]
const FAIL: [number, number, number] = [1.0, 0.36, 0.36]

type Pulse = { i: number; t: number; dur: number; c: [number, number, number] }
type Traveller = { e: number; t: number; v: number }

type SlabData = {
  count: number
  pts: [number, number, number][]
  pairs: [number, number][]
  colAttr: THREE.BufferAttribute
  sizAttr: THREE.BufferAttribute
  baseCol: Float32Array
  baseSiz: Float32Array
  pulses: Pulse[]
  travellers: Traveller[]
  tGeo: THREE.BufferGeometry | null
}

export type Quality = 'low' | 'med' | 'high'
const DENSITY: Record<Quality, number> = { low: 52, med: 88, high: 140 }

const rand = (a: number, b: number) => a + Math.random() * (b - a)

/** Camera keyframes, one per scroll beat. Progress is 0..1 across the page. */
type Key = { at: number; z: number; x: number; y: number; fov: number }
const KEYS: Key[] = [
  { at: 0.0, z: 40, x: 0, y: 0, fov: 55 }, // 01 hero — inside the field
  { at: 0.16, z: 52, x: 16, y: 4, fov: 52 }, // 02 about — arc right, recede
  { at: 0.34, z: 44, x: -14, y: -3, fov: 58 }, // 03 capabilities — orbit back left
  { at: 0.54, z: 96, x: 0, y: 10, fov: 48 }, // 04 experience — pull back wide
  { at: 0.76, z: 58, x: 34, y: 0, fov: 54 }, // 05 work — lateral dolly
  { at: 0.94, z: 22, x: 0, y: 0, fov: 62 }, // 06 contact — push into a node
  { at: 1.0, z: 16, x: 0, y: 0, fov: 64 },
]

function sampleKeys(p: number): Key {
  if (p <= KEYS[0].at) return KEYS[0]
  if (p >= KEYS[KEYS.length - 1].at) return KEYS[KEYS.length - 1]
  for (let i = 0; i < KEYS.length - 1; i++) {
    const a = KEYS[i]
    const b = KEYS[i + 1]
    if (p >= a.at && p <= b.at) {
      const raw = (p - a.at) / (b.at - a.at)
      // smoothstep between keys so the camera eases rather than snapping
      const t = raw * raw * (3 - 2 * raw)
      return {
        at: p,
        z: a.z + (b.z - a.z) * t,
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        fov: a.fov + (b.fov - a.fov) * t,
      }
    }
  }
  return KEYS[KEYS.length - 1]
}

export class NodeField {
  private renderer!: THREE.WebGLRenderer
  private scene!: THREE.Scene
  private camera!: THREE.PerspectiveCamera
  private slabs: THREE.Group[] = []
  private raf = 0
  private last = 0
  private running = false

  private mx = 0
  private my = 0
  private cx = 0
  private cy = 0

  /** Scroll progress 0..1, written from outside by the scroll timeline. */
  progress = 0
  private shownProgress = 0

  private reduced: boolean
  private quality: Quality
  readonly ok: boolean

  constructor(canvas: HTMLCanvasElement, opts: { reduced: boolean; quality: Quality }) {
    this.reduced = opts.reduced
    this.quality = opts.quality

    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: opts.quality === 'high',
        alpha: false,
        powerPreference: 'high-performance',
      })
    } catch {
      this.ok = false
      return
    }

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, opts.quality === 'high' ? 1.75 : 1.5))
    this.renderer.setSize(window.innerWidth, window.innerHeight, false)
    this.renderer.setClearColor(0x050607, 1)

    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2(0x050607, 0.0082)

    this.camera = new THREE.PerspectiveCamera(66, window.innerWidth / window.innerHeight, 0.1, 500)
    this.camera.position.set(0, 0, 70)

    this.build()
    this.ok = true
  }

  private build() {
    for (const s of this.slabs) this.scene.remove(s)
    this.slabs = []
    for (let i = 0; i < SLAB_COUNT; i++) {
      const s = this.makeSlab(DENSITY[this.quality])
      s.position.z = -i * SLAB_DEPTH
      this.scene.add(s)
      this.slabs.push(s)
    }
  }

  private makeSlab(count: number): THREE.Group {
    const g = new THREE.Group()

    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const siz = new Float32Array(count)
    const baseCol = new Float32Array(count * 3)
    const baseSiz = new Float32Array(count)
    const pts: [number, number, number][] = []

    for (let i = 0; i < count; i++) {
      const x = rand(-FIELD_W / 2, FIELD_W / 2)
      const y = rand(-FIELD_H / 2, FIELD_H / 2)
      const z = -Math.random() * SLAB_DEPTH
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      pts.push([x, y, z])

      // A few hubs read brighter and cyan; the rest stay quiet slate,
      // so the field has hierarchy instead of uniform noise.
      const hub = Math.random() < 0.06
      let r: number, gg: number, b: number, s: number
      if (hub) {
        r = 0.05
        gg = 0.62
        b = 0.8
        s = rand(3.4, 4.6)
      } else {
        const t = Math.random()
        r = 0.16 + t * 0.06
        gg = 0.26 + t * 0.14
        b = 0.32 + t * 0.2
        s = rand(1.3, 2.4)
      }
      col[i * 3] = baseCol[i * 3] = r
      col[i * 3 + 1] = baseCol[i * 3 + 1] = gg
      col[i * 3 + 2] = baseCol[i * 3 + 2] = b
      siz[i] = baseSiz[i] = s
    }

    const pg = new THREE.BufferGeometry()
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    pg.setAttribute('aColor', new THREE.BufferAttribute(col, 3))
    pg.setAttribute('aSize', new THREE.BufferAttribute(siz, 1))

    const pm = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    g.add(new THREE.Points(pg, pm))

    // Edges: nearest-neighbour, capped at 3 per node so the field
    // reads as a sparse pipeline graph rather than a solid mesh.
    const linePos: number[] = []
    const lineCol: number[] = []
    const deg = new Array<number>(count).fill(0)
    const pairs: [number, number][] = []
    const R = 17
    for (let a = 0; a < count; a++) {
      if (deg[a] >= 3) continue
      for (let b = a + 1; b < count; b++) {
        if (deg[a] >= 3 || deg[b] >= 3) continue
        const dx = pts[a][0] - pts[b][0]
        const dy = pts[a][1] - pts[b][1]
        const dz = pts[a][2] - pts[b][2]
        if (dx * dx + dy * dy + dz * dz < R * R) {
          deg[a]++
          deg[b]++
          pairs.push([a, b])
          const c = rand(0.055, 0.13)
          linePos.push(...pts[a], ...pts[b])
          lineCol.push(c * 0.1, c * 0.75, c, c * 0.1, c * 0.75, c)
        }
      }
    }

    if (pairs.length) {
      const lg = new THREE.BufferGeometry()
      lg.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3))
      lg.setAttribute('color', new THREE.Float32BufferAttribute(lineCol, 3))
      g.add(
        new THREE.LineSegments(
          lg,
          new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            fog: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        ),
      )
    }

    // Travellers: packets moving along edges — the "pipeline" read.
    const tN = pairs.length ? (this.quality === 'low' ? 2 : this.quality === 'med' ? 3 : 6) : 0
    let tGeo: THREE.BufferGeometry | null = null
    const travellers: Traveller[] = []
    if (tN) {
      const tp = new Float32Array(tN * 3)
      const tc = new Float32Array(tN * 3)
      const ts = new Float32Array(tN)
      for (let k = 0; k < tN; k++) {
        travellers.push({ e: Math.floor(Math.random() * pairs.length), t: Math.random(), v: rand(0.18, 0.42) })
        tc[k * 3] = 0.1
        tc[k * 3 + 1] = 0.85
        tc[k * 3 + 2] = 1.0
        ts[k] = 2.8
      }
      tGeo = new THREE.BufferGeometry()
      tGeo.setAttribute('position', new THREE.BufferAttribute(tp, 3))
      tGeo.setAttribute('aColor', new THREE.BufferAttribute(tc, 3))
      tGeo.setAttribute('aSize', new THREE.BufferAttribute(ts, 1))
      g.add(new THREE.Points(tGeo, pm.clone()))
    }

    const data: SlabData = {
      count,
      pts,
      pairs,
      colAttr: pg.attributes.aColor as THREE.BufferAttribute,
      sizAttr: pg.attributes.aSize as THREE.BufferAttribute,
      baseCol,
      baseSiz,
      pulses: [],
      travellers,
      tGeo,
    }
    g.userData = data
    return g
  }

  private tickSlab(g: THREE.Group, dt: number) {
    const d = g.userData as SlabData

    if (!this.reduced && d.pulses.length < 4 && Math.random() < dt * 1.1) {
      d.pulses.push({
        i: Math.floor(Math.random() * d.count),
        t: 0,
        dur: rand(1.1, 2.0),
        c: Math.random() < 0.78 ? PASS : FAIL,
      })
    }

    if (d.pulses.length) {
      const col = d.colAttr.array as Float32Array
      const siz = d.sizAttr.array as Float32Array
      for (let p = d.pulses.length - 1; p >= 0; p--) {
        const pu = d.pulses[p]
        pu.t += dt
        const n = pu.t / pu.dur
        const i3 = pu.i * 3
        if (n >= 1) {
          col[i3] = d.baseCol[i3]
          col[i3 + 1] = d.baseCol[i3 + 1]
          col[i3 + 2] = d.baseCol[i3 + 2]
          siz[pu.i] = d.baseSiz[pu.i]
          d.pulses.splice(p, 1)
        } else {
          const e = Math.sin(n * Math.PI) // rise then settle
          col[i3] = d.baseCol[i3] + (pu.c[0] - d.baseCol[i3]) * e
          col[i3 + 1] = d.baseCol[i3 + 1] + (pu.c[1] - d.baseCol[i3 + 1]) * e
          col[i3 + 2] = d.baseCol[i3 + 2] + (pu.c[2] - d.baseCol[i3 + 2]) * e
          siz[pu.i] = d.baseSiz[pu.i] + (7.5 - d.baseSiz[pu.i]) * e
        }
      }
      d.colAttr.needsUpdate = true
      d.sizAttr.needsUpdate = true
    }

    if (d.tGeo && !this.reduced) {
      const tp = d.tGeo.attributes.position.array as Float32Array
      for (let k = 0; k < d.travellers.length; k++) {
        const tr = d.travellers[k]
        tr.t += tr.v * dt
        if (tr.t > 1) {
          tr.t = 0
          tr.e = Math.floor(Math.random() * d.pairs.length)
          tr.v = rand(0.18, 0.42)
        }
        const [ia, ib] = d.pairs[tr.e]
        const A = d.pts[ia]
        const B = d.pts[ib]
        tp[k * 3] = A[0] + (B[0] - A[0]) * tr.t
        tp[k * 3 + 1] = A[1] + (B[1] - A[1]) * tr.t
        tp[k * 3 + 2] = A[2] + (B[2] - A[2]) * tr.t
      }
      d.tGeo.attributes.position.needsUpdate = true
    }
  }

  private frame = (now: number) => {
    if (!this.running) return
    this.raf = requestAnimationFrame(this.frame)

    const dt = this.last ? Math.min((now - this.last) / 1000, 0.05) : 0.016
    this.last = now

    // Ease the camera toward the scroll position rather than binding
    // it rigidly — the lag is what makes it feel like a camera operator
    // following the move, not a value driven by a scrollbar.
    const chase = this.reduced ? 1 : 1 - Math.pow(0.0001, dt)
    this.shownProgress += (this.progress - this.shownProgress) * chase
    const k = sampleKeys(this.shownProgress)

    const speed = this.reduced ? 0 : 4.4
    for (const s of this.slabs) {
      s.position.z += speed * dt
      if (s.position.z > k.z + 22) s.position.z -= SLAB_DEPTH * SLAB_COUNT
      this.tickSlab(s, dt)
    }

    const lerp = this.reduced ? 1 : 1 - Math.pow(0.001, dt)
    this.cx += (k.x + this.mx * 4.5 - this.cx) * lerp
    this.cy += (k.y + this.my * 2.6 - this.cy) * lerp

    this.camera.position.set(this.cx, this.cy, k.z)
    this.camera.lookAt(this.cx * 0.35, this.cy * 0.35, k.z - 60)
    if (Math.abs(this.camera.fov - k.fov) > 0.01) {
      this.camera.fov = k.fov
      this.camera.updateProjectionMatrix()
    }

    this.renderer.render(this.scene, this.camera)
  }

  /** The opening push-in, run once after the preloader clears. */
  intro(duration = 2.8) {
    if (!this.ok) return
    if (this.reduced) return
    const startZ = 70
    const startFov = 66
    const t0 = performance.now()
    const step = (now: number) => {
      const n = Math.min((now - t0) / (duration * 1000), 1)
      const e = n >= 1 ? 1 : 1 - Math.pow(2, -10 * n)
      const k = sampleKeys(0)
      this.camera.position.z = startZ + (k.z - startZ) * e
      this.camera.fov = startFov + (k.fov - startFov) * e
      this.camera.updateProjectionMatrix()
      if (n < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  setPointer(x: number, y: number) {
    this.mx = x
    this.my = y
  }

  setReduced(v: boolean) {
    this.reduced = v
  }

  setQuality(q: Quality) {
    if (q === this.quality) return
    this.quality = q
    this.build()
  }

  resize = () => {
    if (!this.ok) return
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight, false)
  }

  start() {
    if (!this.ok || this.running) return
    this.running = true
    this.last = 0
    this.raf = requestAnimationFrame(this.frame)
  }

  stop() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  dispose() {
    this.stop()
    if (!this.ok) return
    this.scene.traverse((o) => {
      const any = o as THREE.Mesh
      if (any.geometry) any.geometry.dispose()
      const m = (any as unknown as { material?: THREE.Material | THREE.Material[] }).material
      if (Array.isArray(m)) m.forEach((x) => x.dispose())
      else m?.dispose()
    })
    this.renderer.dispose()
  }
}
