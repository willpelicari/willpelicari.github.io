/**
 * Résumé text in English, French and Portuguese. `node scripts/cv/build.js` turns each language into
 * public/cv/<lang>/index.html and a PDF next to it. Edit here, then rebuild.
 *
 * Shared facts (names, links, stacks) live in SHARED so the three languages can't drift apart.
 */

const SHARED = {
  name: 'Wilton Pelicari',
  email: 'wilton.pelicari@gmail.com',
  site: { href: 'https://www.wiltonpelicari.com', text: 'wiltonpelicari.com' },
  linkedin: { href: 'https://www.linkedin.com/in/wiltonpelicari/', text: 'linkedin.com/in/wiltonpelicari' },
  github: { href: 'https://github.com/willpelicari', text: 'github.com/willpelicari' },
  apps: {
    cataloc: { name: 'Cataloc', href: 'https://www.wiltonpelicari.com/cataloc/', urlText: 'wiltonpelicari.com/cataloc' },
    oval: { name: 'Oval', href: 'https://oval.wiltonpelicari.com', urlText: 'oval.wiltonpelicari.com' },
    mapadoboi: { name: 'Mapa do Boi', href: 'https://www.wiltonpelicari.com/mapadoboi/', urlText: 'wiltonpelicari.com/mapadoboi' },
  },
  stacks: {
    integrationHub: 'C# · .NET · TypeScript · React · Spec Kit · Kubernetes · Helm · Argo CD · Docker · Azure DevOps',
    ssp: 'C# · .NET 10 · TypeScript · React 19 · Tailwind CSS · MassTransit · RabbitMQ · PostgreSQL · Java · Selenium · Cucumber · Kubernetes · Helm · Argo CD',
    c2: 'C# · .NET 6 · Entity Framework · SQL Server · Redis · AngularJS · jQuery · MassTransit · RabbitMQ · NUnit · Selenium · Mend',
  },
}

const en = {
  lang: 'en',
  locale: 'en-CA',
  title: 'Senior Full Stack Developer',
  location: 'Québec City, QC, Canada',
  labels: {
    pageTitle: 'Résumé',
    summary: 'Profile',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Independent apps',
    projectsNote: 'Designed, built and published on my own.',
    education: 'Education',
    languages: 'Spoken',
    download: 'Download PDF',
    print: 'Print',
    back: 'wiltonpelicari.com',
    via: 'via',
  },
  summary:
    'Full stack developer since 2014, working mostly in C#/.NET and TypeScript, from enterprise systems in Brazil to SaaS platforms in Canada. At Sherweb I build distributed .NET services and React front ends that run on Kubernetes, working spec-first with AI-assisted tooling. On my own time I design, build and publish mobile apps end to end; three are live in the stores today.',
  skills: [
    ['Languages', 'C#, TypeScript, JavaScript, SQL, Java, PHP'],
    ['Back end', '.NET 10 / ASP.NET Core, Entity Framework, MassTransit, RabbitMQ, Node.js'],
    ['Data', 'SQL Server, PostgreSQL (PL/pgSQL), Redis, MySQL'],
    ['Front end & mobile', 'React 19, React Native (Expo), Angular, AngularJS, Vue.js, Tailwind CSS, WPF (MVVM)'],
    ['Testing', 'NUnit, Moq, FluentAssertions, AutoFixture, Selenium, Cucumber, Playwright, SpecFlow, BrowserStack'],
    ['Cloud & DevOps', 'Kubernetes, Helm, Argo CD, Docker, Azure DevOps, Git, Mend'],
    ['Practices', 'Spec-driven and AI-assisted development (Spec Kit), Scrum, SAFe, Kanban, BDD'],
  ],
  jobs: [
    {
      company: 'Sherweb',
      place: 'Sherbrooke, QC · remote',
      period: 'Oct 2021 – present',
      title: 'Senior Full Stack Developer',
      note: 'promoted November 2026',
      projects: [
        {
          name: 'Integration Hub',
          period: 'Feb 2026 – present',
          bullets: [
            'Building a new service that lets resellers and partners subscribe their own APIs to events from Cumulus, Sherweb’s main platform, so they hear about changes on their accounts the moment they happen.',
            'Work spec-first with AI-assisted development: features start as specs in Spec Kit, and the team has automated much of its deployments, code reviews and ceremonies.',
          ],
          stack: SHARED.stacks.integrationHub,
        },
        {
          name: 'SSP — self-service portal',
          period: 'Nov 2024 – present',
          bullets: [
            'Portal where the customers of Sherweb partners across North America manage licences and subscriptions, buy products and ask for support without going through their reseller.',
            'React 19 and TypeScript front end; distributed .NET 10 back end that communicates over RabbitMQ with MassTransit, deployed to Kubernetes with Helm and Argo CD.',
            'Added automated end-to-end tests to an existing project (Java, Selenium, Cucumber) and set up automated production monitoring.',
          ],
          stack: SHARED.stacks.ssp,
        },
        {
          name: 'C2-ITSM',
          period: 'Oct 2021 – Oct 2024',
          bullets: [
            'Core developer on the IT service management product: internal APIs in .NET 6 with Entity Framework and SQL Server, AngularJS pages and components.',
            'Wrote unit, integration and UI tests with NUnit, Moq, FluentAssertions and Selenium.',
            'Ran developer meetings on process improvement and technical debt; investigated and followed up on vulnerabilities reported by Mend.',
          ],
          stack: SHARED.stacks.c2,
        },
      ],
    },
    {
      company: 'Revenu Québec',
      place: 'Québec City',
      via: 'SERTI',
      period: 'Feb 2021 – Sep 2021',
      title: 'Full Stack Developer (consultant)',
      bullets: [
        'Built an internal subsystem: .NET Framework APIs and a Vue.js and jQuery front end.',
        'Unit tests on both sides and integration tests with Moq, AutoFixture and FluentAssertions; read and interpreted legacy SQL Design code.',
      ],
    },
    {
      company: 'iA Financial Group (Industrielle Alliance)',
      place: 'Québec City',
      via: 'Cofomo',
      period: 'Jul 2019 – Feb 2021',
      roles: [
        {
          title: 'Full Stack Developer (consultant)',
          period: 'Mar 2020 – Feb 2021',
          bullets: [
            'Pages and a backend-for-frontend REST API for Modernia, a distributed system, in .NET Core 3.1, Entity Framework and React.',
            'Unit, end-to-end and BDD tests with Moq, FluentAssertions, Playwright and SpecFlow.',
          ],
        },
        {
          title: 'Software Developer (consultant)',
          period: 'Jul 2019 – Feb 2020',
          bullets: [
            'iA-Evo, an insurance policy calculator and simulator, built in WPF with MVVM while supporting the previous version.',
            'Unit tests, QA test cases, and Scrum and SAFe ceremonies (PI Planning, PI Review).',
          ],
        },
      ],
    },
    {
      company: 'DB1 Global Software',
      place: 'Brazil',
      period: 'Sep 2018 – Mar 2019',
      title: 'Full Stack Developer',
      bullets: [
        'Integrated management system for SENAC, a large Brazilian vocational school: .NET Core APIs and an Angular front end.',
        'Front- and back-end unit tests with Moq, AutoFixture and FluentAssertions; wrote and ran QA test cases.',
      ],
    },
    {
      company: 'Grupo Paschoalotto',
      place: 'Brazil',
      period: 'Sep 2016 – Aug 2018',
      title: '.NET Developer',
      bullets: [
        '“Pagou Fácil”, a friendly debt-recovery platform: internal .NET Framework APIs over PostgreSQL, QA test cases and legacy VB6 code.',
      ],
    },
    {
      company: 'Lecom',
      place: 'Brazil',
      period: 'Feb 2015 – Aug 2016',
      title: 'PHP Developer',
      bullets: ['Websites for small and medium businesses, from gathering requirements to delivery, in PHP and WordPress.'],
    },
    {
      company: 'Cognitive Class (formerly Big Data University, IBM)',
      place: 'Toronto',
      period: 'May 2014 – Aug 2014',
      title: 'Software Engineering Intern',
      bullets: [
        'Science Without Borders internship at the University of Toronto. Learned IBM’s cloud tools and wrote Bluemix articles, including one on Node.js and Cloudant that IBM published and translated.',
      ],
    },
  ],
  projects: [
    {
      ...SHARED.apps.cataloc,
      platforms: 'iPhone · iPad · Android',
      text: 'Home inventory that runs entirely on the phone: nest places and containers as deep as needed and search returns the full path to anything you own.',
    },
    {
      ...SHARED.apps.oval,
      platforms: 'iOS · Android (beta) · web',
      text: 'Exact-score predictions for every pro football game, solo or in private groups, with live leaderboards and season stats.',
    },
    {
      ...SHARED.apps.mapadoboi,
      platforms: 'Android · iPhone soon',
      text: 'Beef-cut encyclopedia with Brazilian, Argentine, US and Portuguese charts, on-device label reading and step-by-step recipes. In Portuguese, English and French.',
    },
  ],
  education: [
    {
      title: 'Bachelor of Computer Science',
      school: 'UNISAGRADO, Brazil',
      period: '2018',
      text: 'Four-year degree, evaluated by Québec’s Ministère de l’Immigration, de la Francisation et de l’Intégration.',
    },
  ],
  languages: ['Portuguese (native)', 'English', 'French'],
}

const fr = {
  lang: 'fr',
  locale: 'fr-CA',
  title: 'Développeur full stack senior',
  location: 'Québec (QC), Canada',
  labels: {
    pageTitle: 'CV',
    summary: 'Profil',
    skills: 'Compétences',
    experience: 'Expérience',
    projects: 'Applications indépendantes',
    projectsNote: 'Conçues, développées et publiées par moi-même.',
    education: 'Formation',
    languages: 'Langues parlées',
    download: 'Télécharger le PDF',
    print: 'Imprimer',
    back: 'wiltonpelicari.com',
    via: 'par',
  },
  summary:
    'Développeur full stack depuis 2014, surtout en C#/.NET et TypeScript, des systèmes d’entreprise au Brésil aux plateformes SaaS au Canada. Chez Sherweb, je développe des services .NET distribués et des interfaces React déployés sur Kubernetes, en partant de spécifications et avec des outils d’IA. Sur mon temps libre, je conçois, développe et publie des applications mobiles de A à Z; trois sont offertes dans les magasins d’applications.',
  skills: [
    ['Langages', 'C#, TypeScript, JavaScript, SQL, Java, PHP'],
    ['Back-end', '.NET 10 / ASP.NET Core, Entity Framework, MassTransit, RabbitMQ, Node.js'],
    ['Données', 'SQL Server, PostgreSQL (PL/pgSQL), Redis, MySQL'],
    ['Front-end et mobile', 'React 19, React Native (Expo), Angular, AngularJS, Vue.js, Tailwind CSS, WPF (MVVM)'],
    ['Tests', 'NUnit, Moq, FluentAssertions, AutoFixture, Selenium, Cucumber, Playwright, SpecFlow, BrowserStack'],
    ['Infonuagique et DevOps', 'Kubernetes, Helm, Argo CD, Docker, Azure DevOps, Git, Mend'],
    ['Pratiques', 'Développement piloté par les spécifications avec l’IA (Spec Kit), Scrum, SAFe, Kanban, BDD'],
  ],
  jobs: [
    {
      company: 'Sherweb',
      place: 'Sherbrooke (QC) · à distance',
      period: 'oct. 2021 – aujourd’hui',
      title: 'Développeur full stack senior',
      note: 'promu en novembre 2026',
      projects: [
        {
          name: 'Integration Hub',
          period: 'févr. 2026 – aujourd’hui',
          bullets: [
            'Développement d’un nouveau service qui permet aux revendeurs et partenaires d’abonner leurs propres API aux événements de Cumulus, la plateforme principale de Sherweb, pour être avisés dès qu’un changement survient dans leurs comptes.',
            'Développement assisté par l’IA à partir de spécifications : chaque fonctionnalité commence par une spec dans Spec Kit, et l’équipe a automatisé une bonne partie de ses déploiements, revues de code et cérémonies.',
          ],
          stack: SHARED.stacks.integrationHub,
        },
        {
          name: 'SSP — portail libre-service',
          period: 'nov. 2024 – aujourd’hui',
          bullets: [
            'Portail où les clients des partenaires de Sherweb en Amérique du Nord gèrent leurs licences et abonnements, achètent des produits et demandent du soutien sans passer par leur revendeur.',
            'Interface en React 19 et TypeScript; back-end .NET 10 distribué qui communique par RabbitMQ avec MassTransit, déployé sur Kubernetes avec Helm et Argo CD.',
            'Ajout de tests de bout en bout automatisés à un projet existant (Java, Selenium, Cucumber) et mise en place d’une surveillance automatisée de la production.',
          ],
          stack: SHARED.stacks.ssp,
        },
        {
          name: 'C2-ITSM',
          period: 'oct. 2021 – oct. 2024',
          bullets: [
            'Développement de la solution de gestion des services TI : API internes en .NET 6 avec Entity Framework et SQL Server, pages et composants AngularJS.',
            'Tests unitaires, d’intégration et d’interface avec NUnit, Moq, FluentAssertions et Selenium.',
            'Animation des rencontres de développeurs sur l’amélioration continue et la dette technique; analyse et suivi des vulnérabilités détectées par Mend.',
          ],
          stack: SHARED.stacks.c2,
        },
      ],
    },
    {
      company: 'Revenu Québec',
      place: 'Québec',
      via: 'SERTI',
      period: 'févr. 2021 – sept. 2021',
      title: 'Analyste-programmeur (mandat)',
      bullets: [
        'Développement d’un sous-système interne : API en .NET Framework et interface en Vue.js et jQuery.',
        'Tests unitaires front-end et back-end et tests d’intégration avec Moq, AutoFixture et FluentAssertions; lecture et interprétation de code patrimonial en SQL Design.',
      ],
    },
    {
      company: 'iA Groupe financier (Industrielle Alliance)',
      place: 'Québec',
      via: 'Cofomo',
      period: 'juill. 2019 – févr. 2021',
      roles: [
        {
          title: 'Analyste-programmeur full stack (mandat)',
          period: 'mars 2020 – févr. 2021',
          bullets: [
            'Pages et API REST « backend for frontend » pour Modernia, un système distribué, en .NET Core 3.1, Entity Framework et React.',
            'Tests unitaires, de bout en bout et BDD avec Moq, FluentAssertions, Playwright et SpecFlow.',
          ],
        },
        {
          title: 'Analyste-programmeur (mandat)',
          period: 'juill. 2019 – févr. 2020',
          bullets: [
            'iA-Evo, calculateur et simulateur de polices d’assurance en WPF selon le patron MVVM, tout en assurant le soutien de la version précédente.',
            'Tests unitaires, cas d’essai AQ, et cérémonies Scrum et SAFe (PI Planning, PI Review).',
          ],
        },
      ],
    },
    {
      company: 'DB1 Global Software',
      place: 'Brésil',
      period: 'sept. 2018 – mars 2019',
      title: 'Développeur full stack',
      bullets: [
        'Système intégré de gestion pour le SENAC, une grande école professionnelle brésilienne : API en .NET Core et interface en Angular.',
        'Tests unitaires front-end et back-end avec Moq, AutoFixture et FluentAssertions; rédaction et exécution de cas d’essai AQ.',
      ],
    },
    {
      company: 'Grupo Paschoalotto',
      place: 'Brésil',
      period: 'sept. 2016 – août 2018',
      title: 'Développeur .NET',
      bullets: [
        '« Pagou Fácil », une plateforme de recouvrement de dettes à l’amiable : API internes en .NET Framework sur PostgreSQL, cas d’essai AQ et code patrimonial en VB6.',
      ],
    },
    {
      company: 'Lecom',
      place: 'Brésil',
      period: 'févr. 2015 – août 2016',
      title: 'Développeur PHP',
      bullets: ['Sites web pour des PME, de la collecte des besoins jusqu’à la livraison, en PHP et WordPress.'],
    },
    {
      company: 'Cognitive Class (anciennement Big Data University, IBM)',
      place: 'Toronto',
      period: 'mai 2014 – août 2014',
      title: 'Stagiaire en génie logiciel',
      bullets: [
        'Stage Science sans frontières à l’Université de Toronto. Apprentissage des outils infonuagiques d’IBM et rédaction d’articles Bluemix, dont un sur Node.js et Cloudant publié et traduit par IBM.',
      ],
    },
  ],
  projects: [
    {
      ...SHARED.apps.cataloc,
      platforms: 'iPhone · iPad · Android',
      text: 'Inventaire de la maison entièrement sur le téléphone : lieux et contenants imbriqués à volonté, et la recherche donne le chemin complet de chaque objet.',
    },
    {
      ...SHARED.apps.oval,
      platforms: 'iOS · Android (bêta) · Web',
      text: 'Prédictions du score exact de chaque match de football professionnel, en solo ou en groupes privés, avec classements en direct et statistiques de saison.',
    },
    {
      ...SHARED.apps.mapadoboi,
      platforms: 'Android · iPhone bientôt',
      text: 'Encyclopédie des coupes de bœuf (tableaux brésilien, argentin, américain et portugais), lecture d’étiquettes sur l’appareil et recettes pas à pas. Trilingue.',
    },
  ],
  education: [
    {
      title: 'Baccalauréat en sciences informatiques',
      school: 'UNISAGRADO, Brésil',
      period: '2018',
      text: 'Programme de quatre ans, évalué par le MIFI (Québec).',
    },
  ],
  languages: ['Portugais (langue maternelle)', 'Français', 'Anglais'],
}

const pt = {
  lang: 'pt',
  locale: 'pt-BR',
  title: 'Desenvolvedor Full Stack Sênior',
  location: 'Cidade de Québec, QC, Canadá',
  labels: {
    pageTitle: 'Currículo',
    summary: 'Perfil',
    skills: 'Competências',
    experience: 'Experiência',
    projects: 'Aplicativos independentes',
    projectsNote: 'Projetados, desenvolvidos e publicados por mim.',
    education: 'Formação',
    languages: 'Idiomas',
    download: 'Baixar PDF',
    print: 'Imprimir',
    back: 'wiltonpelicari.com',
    via: 'via',
  },
  summary:
    'Desenvolvedor full stack desde 2014, principalmente em C#/.NET e TypeScript, de sistemas corporativos no Brasil a plataformas SaaS no Canadá. Na Sherweb, desenvolvo serviços .NET distribuídos e front-ends em React que rodam em Kubernetes, partindo de especificações e com ferramentas de IA. No meu tempo livre, projeto, desenvolvo e publico aplicativos móveis do início ao fim; três já estão nas lojas.',
  skills: [
    ['Linguagens', 'C#, TypeScript, JavaScript, SQL, Java, PHP'],
    ['Back-end', '.NET 10 / ASP.NET Core, Entity Framework, MassTransit, RabbitMQ, Node.js'],
    ['Dados', 'SQL Server, PostgreSQL (PL/pgSQL), Redis, MySQL'],
    ['Front-end e mobile', 'React 19, React Native (Expo), Angular, AngularJS, Vue.js, Tailwind CSS, WPF (MVVM)'],
    ['Testes', 'NUnit, Moq, FluentAssertions, AutoFixture, Selenium, Cucumber, Playwright, SpecFlow, BrowserStack'],
    ['Nuvem e DevOps', 'Kubernetes, Helm, Argo CD, Docker, Azure DevOps, Git, Mend'],
    ['Práticas', 'Desenvolvimento orientado a especificações e assistido por IA (Spec Kit), Scrum, SAFe, Kanban, BDD'],
  ],
  jobs: [
    {
      company: 'Sherweb',
      place: 'Sherbrooke, QC · remoto',
      period: 'out. 2021 – atual',
      title: 'Desenvolvedor Full Stack Sênior',
      note: 'promovido em novembro de 2026',
      projects: [
        {
          name: 'Integration Hub',
          period: 'fev. 2026 – atual',
          bullets: [
            'Desenvolvo um novo serviço que permite a revendedores e parceiros inscrever suas próprias APIs em eventos do Cumulus, a principal plataforma da Sherweb, para saberem de mudanças nas suas contas assim que acontecem.',
            'Desenvolvimento assistido por IA a partir de especificações: cada funcionalidade começa como spec no Spec Kit, e o time automatizou boa parte dos deploys, revisões de código e cerimônias.',
          ],
          stack: SHARED.stacks.integrationHub,
        },
        {
          name: 'SSP — portal de autoatendimento',
          period: 'nov. 2024 – atual',
          bullets: [
            'Portal em que os clientes dos parceiros da Sherweb na América do Norte gerenciam licenças e assinaturas, compram produtos e pedem suporte sem passar pelo revendedor.',
            'Front-end em React 19 e TypeScript; back-end .NET 10 distribuído que se comunica via RabbitMQ com MassTransit, implantado em Kubernetes com Helm e Argo CD.',
            'Adicionei testes ponta a ponta automatizados a um projeto existente (Java, Selenium, Cucumber) e configurei o monitoramento automatizado de produção.',
          ],
          stack: SHARED.stacks.ssp,
        },
        {
          name: 'C2-ITSM',
          period: 'out. 2021 – out. 2024',
          bullets: [
            'Desenvolvimento da solução de gestão de serviços de TI: APIs internas em .NET 6 com Entity Framework e SQL Server, páginas e componentes em AngularJS.',
            'Testes unitários, de integração e de interface com NUnit, Moq, FluentAssertions e Selenium.',
            'Conduzi reuniões de desenvolvedores sobre melhoria contínua e dívida técnica; investiguei e acompanhei vulnerabilidades apontadas pelo Mend.',
          ],
          stack: SHARED.stacks.c2,
        },
      ],
    },
    {
      company: 'Revenu Québec',
      place: 'Cidade de Québec',
      via: 'SERTI',
      period: 'fev. 2021 – set. 2021',
      title: 'Desenvolvedor Full Stack (consultor)',
      bullets: [
        'Desenvolvimento de um subsistema interno: APIs em .NET Framework e front-end em Vue.js e jQuery.',
        'Testes unitários no front e no back e testes de integração com Moq, AutoFixture e FluentAssertions; leitura e interpretação de código legado em SQL Design.',
      ],
    },
    {
      company: 'iA Financial Group (Industrielle Alliance)',
      place: 'Cidade de Québec',
      via: 'Cofomo',
      period: 'jul. 2019 – fev. 2021',
      roles: [
        {
          title: 'Desenvolvedor Full Stack (consultor)',
          period: 'mar. 2020 – fev. 2021',
          bullets: [
            'Páginas e uma API REST “backend for frontend” para o Modernia, um sistema distribuído, em .NET Core 3.1, Entity Framework e React.',
            'Testes unitários, ponta a ponta e BDD com Moq, FluentAssertions, Playwright e SpecFlow.',
          ],
        },
        {
          title: 'Desenvolvedor de Software (consultor)',
          period: 'jul. 2019 – fev. 2020',
          bullets: [
            'iA-Evo, calculadora e simulador de apólices de seguro em WPF com MVVM, mantendo também a versão anterior.',
            'Testes unitários, casos de teste de QA e cerimônias Scrum e SAFe (PI Planning, PI Review).',
          ],
        },
      ],
    },
    {
      company: 'DB1 Global Software',
      place: 'Brasil',
      period: 'set. 2018 – mar. 2019',
      title: 'Desenvolvedor Full Stack',
      bullets: [
        'Sistema integrado de gestão para o SENAC: APIs em .NET Core e front-end em Angular.',
        'Testes unitários no front e no back com Moq, AutoFixture e FluentAssertions; escrita e execução de casos de teste de QA.',
      ],
    },
    {
      company: 'Grupo Paschoalotto',
      place: 'Brasil',
      period: 'set. 2016 – ago. 2018',
      title: 'Desenvolvedor .NET',
      bullets: [
        '“Pagou Fácil”, plataforma de recuperação amigável de dívidas: APIs internas em .NET Framework sobre PostgreSQL, casos de teste de QA e código legado em VB6.',
      ],
    },
    {
      company: 'Lecom',
      place: 'Brasil',
      period: 'fev. 2015 – ago. 2016',
      title: 'Desenvolvedor PHP',
      bullets: ['Sites para pequenas e médias empresas, do levantamento de requisitos à entrega, em PHP e WordPress.'],
    },
    {
      company: 'Cognitive Class (antiga Big Data University, IBM)',
      place: 'Toronto',
      period: 'mai. 2014 – ago. 2014',
      title: 'Estagiário em Engenharia de Software',
      bullets: [
        'Estágio do Ciência sem Fronteiras na Universidade de Toronto. Aprendi as ferramentas de nuvem da IBM e escrevi artigos sobre o Bluemix, incluindo um sobre Node.js e Cloudant que a IBM publicou e traduziu.',
      ],
    },
  ],
  projects: [
    {
      ...SHARED.apps.cataloc,
      platforms: 'iPhone · iPad · Android',
      text: 'Inventário da casa que roda inteiramente no celular: aninhe lugares e recipientes quantos níveis precisar, e a busca mostra o caminho completo de qualquer objeto.',
    },
    {
      ...SHARED.apps.oval,
      platforms: 'iOS · Android (beta) · web',
      text: 'Palpites de placar exato para cada jogo do futebol americano profissional, sozinho ou em grupos privados, com rankings ao vivo e estatísticas da temporada.',
    },
    {
      ...SHARED.apps.mapadoboi,
      platforms: 'Android · iPhone em breve',
      text: 'Enciclopédia dos cortes de carne bovina com os mapas brasileiro, argentino, americano e português, leitura de etiquetas no aparelho e receitas passo a passo. Em português, inglês e francês.',
    },
  ],
  education: [
    {
      title: 'Bacharelado em Ciência da Computação',
      school: 'UNISAGRADO, Brasil',
      period: '2018',
      text: 'Curso de quatro anos, avaliado pelo Ministère de l’Immigration, de la Francisation et de l’Intégration do Québec.',
    },
  ],
  languages: ['Português (nativo)', 'Inglês', 'Francês'],
}

module.exports = { SHARED, LANGUAGES: { en, fr, pt } }
