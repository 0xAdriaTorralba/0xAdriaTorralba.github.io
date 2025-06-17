// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "Publications in reversed chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-news",
          title: "news",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/news/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "You can download my CV on this page.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "news-our-paper-analysing-and-benchmarking-zk-rollups-will-be-presented-at-zksummit-12-on-october-8th-at-lisbon-speaking-head",
          title: 'Our paper “Analysing and Benchmarking ZK-Rollups” will be presented at zkSummit 12 on...',
          description: "",
          section: "News",},{id: "news-i-will-be-presenting-unmasking-the-illusion-the-shortcomings-of-zero-knowledge-rollups-in-achieving-privacy-at-recsi-2024-on-october-24th-at-león-speaking-head",
          title: 'I will be presenting “Unmasking the Illusion: The Shortcomings of ‘Zero-Knowledge’ Rollups in...',
          description: "",
          section: "News",},{id: "news-i-will-be-doing-a-research-stay-at-chalmers-university-of-technology-göteborg-sweden-at-securalab-research-group-under-the-supervision-of-dr-muoi-tran",
          title: 'I will be doing a Research Stay at Chalmers University of Technology (Göteborg,...',
          description: "",
          section: "News",},{id: "news-our-article-a-taxonomy-of-security-analysis-of-blockchain-layer-2-scalability-solutions-and-future-directions-just-got-pre-accepted-tada",
          title: 'Our article “A Taxonomy of Security Analysis of Blockchain Layer 2 Scalability Solutions...',
          description: "",
          section: "News",},{id: "news-i-will-be-giving-a-talk-based-on-the-work-from-a-taxonomy-of-security-analysis-of-blockchain-layer-2-scalability-solutions-and-future-directions-at-chalmers-university-of-technology-on-june-17th-2025-speaking-head",
          title: 'I will be giving a talk based on the work from “A Taxonomy...',
          description: "",
          section: "News",},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%61%74%6F%72%72%61%6C%62%61%61%67@%75%6F%63.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/0xAdriaTorralba", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=0E-7eG8AAAAJ", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0002-1889-3404", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/0xAdriaTorralba", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
