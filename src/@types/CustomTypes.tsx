// Header
export type NavLink = {
  text: string
  path: string
}

export type Button = {
  text: string
  link: string
}

export type Header = {
  logo: string
  nav: NavLink[]
  buttonCv: Button
}

// Home
export type Byline = {
  name: string
  role: string
  location: string
  github: string
  githubLink: string
  linkedin: string
  linkedinLink: string
}

export type FeaturedApp = {
  kicker: string
  icon: string
  name: string
  tagline: string
  learnMore: string
  learnMoreLink: string
  support: string
  supportLink: string
  breadcrumb: string[]
}

export type NetworkEntry = {
  number: string
  kind: 'app' | 'website'
  icon?: string
  initials?: string
  initialsBg?: string
  initialsFg?: string
  initialsBordered?: boolean
  name: string
  year?: string
  descriptor: string
  tileDescription?: string
  pathText: string
  link: string
  external: boolean
  status: 'live' | 'in-development' | 'open-source' | 'planned'
  statusLabel: string
  featured?: boolean
}

export type Home = {
  heroTitle: string
  byline: Byline
  featured: FeaturedApp
  facts: string[]
  networkTitle: string
  allApps: string
}

// Apps page
export type AppDetail = {
  label: string
  value: string
}

export type AppsPage = {
  kicker: string
  title: string
  description: string
  filters: { all: string; apps: string; websites: string; inProgress: string }
  featuredTagline: string
  featuredDescription: string
  detailsLabel: string
  details: AppDetail[]
  screenshot: string
  screenshotAlt: string
  getNotifiedLabel: string
  getNotifiedText: string
  getNotifiedLink: string
  getNotifiedLinkText: string
}

// Values
export type Card = {
  icon: string
  title: string
  description: string
}

export type Values = {
  title: string
  description: string
  cards: Card[]
}

// About
export type Fact = {
  value: string
  label: string
}

export type About = {
  kicker: string
  title: string
  bio: string
  downloadResume: string
  seeExperience: string
  facts: Fact[]
  valuesTitle: string
  hobbyKicker: string
  hobbyTitle: string
  hobbyLink: string
  hobbyLinkText: string
}

// Experiences page
export type ExperiencesPage = {
  kicker: string
  title: string
  description: string
  downloadResume: string
  toolboxLabel: string
  allLabel: string
  clearLabel: string
  rolesLabel: string
  countAllSuffix: string
  ofLabel: string
  useLabel: string
}

// Experiences data
export type Company = {
  logo: string
  name: string
  link: string
  invertInDarkMode?: boolean
}

export type ThirdParty = {
  name: string
  link: string
}

export type TechStack = {
  category: string
  stack: string[]
}

export type Job = {
  title: string
  duration: string
  techStack: TechStack[]
  description: string
}

export type Entry = {
  company: Company
  thirdParty?: ThirdParty
  jobs?: Job[]
  job?: Job
}

export type Experiences = {
  title: string
  entries: Entry[]
}

// Footer
export type Footer = {
  copyright: string
  github: string
  linkedin: string
}

// Portfolio
export type Portfolio = {
  header: Header
  home: Home
  apps: AppsPage
  values: Values
  about: About
  experiencesPage: ExperiencesPage
  network: NetworkEntry[]
  experiences: Experiences
  footer: Footer
}

export const DefaultPortfolio: Portfolio = {
  header: {
    logo: '',
    nav: [],
    buttonCv: {
      text: '',
      link: ''
    }
  },
  home: {
    heroTitle: '',
    byline: {
      name: '',
      role: '',
      location: '',
      github: '',
      githubLink: '',
      linkedin: '',
      linkedinLink: ''
    },
    featured: {
      kicker: '',
      icon: '',
      name: '',
      tagline: '',
      learnMore: '',
      learnMoreLink: '',
      support: '',
      supportLink: '',
      breadcrumb: []
    },
    facts: [],
    networkTitle: '',
    allApps: ''
  },
  apps: {
    kicker: '',
    title: '',
    description: '',
    filters: { all: '', apps: '', websites: '', inProgress: '' },
    featuredTagline: '',
    featuredDescription: '',
    detailsLabel: '',
    details: [],
    screenshot: '',
    screenshotAlt: '',
    getNotifiedLabel: '',
    getNotifiedText: '',
    getNotifiedLink: '',
    getNotifiedLinkText: ''
  },
  values: {
    title: '',
    description: '',
    cards: []
  },
  about: {
    kicker: '',
    title: '',
    bio: '',
    downloadResume: '',
    seeExperience: '',
    facts: [],
    valuesTitle: '',
    hobbyKicker: '',
    hobbyTitle: '',
    hobbyLink: '',
    hobbyLinkText: ''
  },
  experiencesPage: {
    kicker: '',
    title: '',
    description: '',
    downloadResume: '',
    toolboxLabel: '',
    allLabel: '',
    clearLabel: '',
    rolesLabel: '',
    countAllSuffix: '',
    ofLabel: '',
    useLabel: ''
  },
  network: [],
  experiences: {
    title: '',
    entries: []
  },
  footer: {
    copyright: '',
    github: '',
    linkedin: ''
  }
}

export type FilterContextType = {
  filteredTags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
}

export enum Themes {
  dark = 'dark',
  light = 'light'
}
