export type Lang = 'it' | 'en';

export const COPY = {
  it: {
    navHome: 'Home',
    navProjects: 'Progetti',
    navSkills: 'Skills',
    badge: 'Software Architect',
    description: "Studio software architect presso l'ITS Angelo Rizzoli.",
    cta: 'Contattami',

    projectsTag: '//I miei progetti',
    projectOneType: 'App',
    projectOneTitle: 'Applicazione di online food delivery',
    projectOneDesc:
      "Un'architettura completa per una app di food delivery con autenticazione cifrata e gestione DB.",
    projectTwoType: 'Bigliettino',
    projectTwoTitle: 'Bigliettino da visita tramite NFC card',
    projectTwoDesc:
      'Creazione di un bigliettino da visita digitale con tecnologia NFC e sito web integrato.',

    stackTag: '//Stack',
    skillsTitle: 'Le mie Skills',

    statsProjects: 'Progetti',
    statsTech: 'Tecnologie',
    statsFrameworks: 'Framework',

    footerHeading: 'Restiamo in contatto',
    footer: '\u00A9 2026 Mattia Amendola. Tutti i diritti riservati.',
    githubLabel: 'GitHub \u2192',
    privateLabel: 'Repo privata',
    saveContact: 'Salvami in Rubrica',
    savedContact: '\u2713 Salvato in Rubrica',
  },
  en: {
    navHome: 'Home',
    navProjects: 'Projects',
    navSkills: 'Skills',
    badge: 'Software Architect',
    description: 'I study software architecture at ITS Angelo Rizzoli.',
    cta: 'Contact me',

    projectsTag: '//My projects',
    projectOneType: 'App',
    projectOneTitle: 'Online food delivery application',
    projectOneDesc:
      'A complete food-delivery app architecture with secure authentication and database management.',
    projectTwoType: 'Business card',
    projectTwoTitle: 'NFC business card',
    projectTwoDesc: 'A digital business card built with NFC and an embedded website.',

    stackTag: '//Stack',
    skillsTitle: 'My Skills',

    statsProjects: 'Projects',
    statsTech: 'Technologies',
    statsFrameworks: 'Frameworks',

    footerHeading: "Let's connect",
    footer: '\u00A9 2026 Mattia Amendola. All rights reserved.',
    githubLabel: 'GitHub \u2192',
    privateLabel: 'Private repo',
    saveContact: 'Save to Contacts',
    savedContact: '\u2713 Saved to Contacts',
  },
} as const;

export type CopyStrings = (typeof COPY)[Lang];
