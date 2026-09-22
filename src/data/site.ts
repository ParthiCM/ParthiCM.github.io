export const site = {
  name: 'Parthiban Murugan',
  role: 'Senior QA Automation Engineer',
  roleShort: 'SDET',
  location: 'Chennai, India',
  geo: { lat: '13.0827°N', lon: '80.2707°E' },
  timezone: 'Asia/Kolkata',
  url: 'https://parthicm.github.io',

  email: 'Parthiban.murugan2705@gmail.com',
  phone: '+91 8220251080',
  linkedin: 'https://www.linkedin.com/in/parthibanmurugan',
  github: 'https://github.com/ParthiCM',
  resume: '/resume.pdf',

  /** Availability chip in the hero. One line to remove when it stops being true. */
  available: true,
  availableLabel: 'Open to senior SDET roles',
} as const

export const sections = [
  { id: 'hero', n: '01', label: 'Home' },
  { id: 'about', n: '02', label: 'About' },
  { id: 'capabilities', n: '03', label: 'Capabilities' },
  { id: 'experience', n: '04', label: 'Experience' },
  { id: 'work', n: '05', label: 'Work' },
  { id: 'contact', n: '06', label: 'Contact' },
] as const

export type SectionId = (typeof sections)[number]['id']
