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
  },{id: "nav-security",
          title: "security",
          description: "I audit blockchain systems, primarily Zero-Knowledge proving infrastructure (zkVMs, circuits, recursion layers) and DeFi protocols.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/security/";
          },
        },{id: "nav-github",
          title: "github",
          description: "GitHub activity and a full, filterable, record of open-source contributions (PRs).",
          section: "Navigation",
          handler: () => {
            window.location.href = "/github/";
          },
        },{id: "nav-research",
          title: "research",
          description: "Publications and academic-service work — peer review committees and poster juries.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-talks",
          title: "talks",
          description: "Invited talks and presentations.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/talks/";
          },
        },{id: "nav-side-projects",
          title: "(side)projects",
          description: "Research and engineering projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "You can download my CV on this page.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-news",
          title: "news",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/news/";
          },
        },{id: "audits-zisk-zkvm-binary-amp-amp-main-circuits-review",
          title: 'ZisK zkVM — Binary &amp;amp;amp; Main circuits review',
          description: "ZisK is a general-purpose zkVM — a virtual machine that produces a zero-knowledge proof of any RISC-V program&#39;s execution. This engagement reviewed the core PIL2 arithmetic circuits (binary opcode evaluation and the main execution-trace constraints that stitch execution segments together). Thirteen issues surfaced, including one critical — see the public report below.",
          section: "Audits",handler: () => {
              window.location.href = "/audits/openzeppelin-zisk-binary-and-main/";
            },},{id: "news-our-paper-analysing-and-benchmarking-zk-rollups-will-be-presented-at-zksummit-12-on-october-8th-at-lisbon-speaking-head",
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
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{id: "projects-pedal-for-ios",
          title: 'Pedal for iOS',
          description: "Native iOS app for checking real-time bike and e-bike availability at bike-sharing stations worldwide, with Apple Watch app, widgets, and map integration. Coming soon to the App Store.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/bicing_ios/";
            },},{id: "projects-data-visualisation-in-linguistics",
          title: 'Data Visualisation in Linguistics',
          description: "Visualisation of toxicity in Social Networks made with Django, Highcharts and D3.js.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/data_vis_linguistics/";
            },},{id: "projects-délégative",
          title: 'Délégative',
          description: "Hackathon project at EthGlobal Paris 2023. Implemented an off-chain DAO liquid democracy voting application with identity proofs and vote delegations. Won 1st place from ApeCoinDAO, Top 5 from Sismo and Pool Prize for The Graph.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/delegative/";
            },},{id: "projects-yet-another-fractal-explorer",
          title: 'Yet Another Fractal Explorer',
          description: "Final double BSc project about visualisation of fractals made with Unity3D.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/fractal_explorer/";
            },},{id: "projects-pedal-for-raycast",
          title: 'Pedal for Raycast',
          description: "Raycast extension to check real-time availability of bikes and e-bikes at bike-sharing stations across hundreds of cities worldwide. Coming soon to the Raycast Store.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/raycast_bicing/";
            },},{id: "projects-the-sand-walker",
          title: 'The Sand Walker',
          description: "Hackathon project at EthPrague 2023. Took inspiration from the Etherenauts project to learn Solidity, then adapted it to learn Cairo 1.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/sand_walker/";
            },},{id: "projects-twitter-2021-recsys-challenge",
          title: 'Twitter 2021 RecSys Challenge',
          description: "Implementation of a Recommender System that predicts interactions for Twitter users. Reached 14th place overall and 8th position in the Like leaderboard.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/twitter_recsys/";
            },},{id: "talks-scaling-at-a-security-cost-unveiling-the-security-assumptions-behind-today-39-s-blockchain-layer-2-scaling-solutions",
          title: 'Scaling at a (Security) Cost: Unveiling the Security Assumptions Behind Today&amp;#39;s Blockchain Layer...',
          description: "Reviewing baseline L1 security assumptions and analysing the trade-offs introduced by Layer 2 solutions.",
          section: "Talks",handler: () => {
              window.location.href = "/talks/chalmers_l2_security/";
            },},{id: "talks-a-comparison-of-layer-2-techniques-for-scaling-blockchains-preliminary-work",
          title: 'A Comparison of Layer 2 Techniques for Scaling Blockchains (Preliminary Work)',
          description: "Early presentation of ongoing research comparing Layer 2 blockchain scaling techniques.",
          section: "Talks",handler: () => {
              window.location.href = "/talks/comparison_l2_preliminary/";
            },},{id: "talks-a-comparison-of-layer-2-techniques-for-scaling-blockchains",
          title: 'A Comparison of Layer 2 Techniques for Scaling Blockchains',
          description: "Reviews and compares Layer 2 off-chain scaling techniques, analysing usability, security, and cost properties.",
          section: "Talks",handler: () => {
              window.location.href = "/talks/comparison_l2_recsi/";
            },},{id: "talks-hands-on-zero-knowledge-basics-kzg-commitments",
          title: 'Hands-on Zero-Knowledge Basics - KZG Commitments',
          description: "A hands-on workshop on the fundamentals of zero-knowledge proofs, focused on KZG polynomial commitments.",
          section: "Talks",handler: () => {
              window.location.href = "/talks/kzg_commitments/";
            },},{id: "talks-reality-and-adoption-of-blockchain-technology",
          title: 'Reality and Adoption of Blockchain Technology',
          description: "The real state of blockchain technology adoption — hype vs. reality, practical use cases, and maturity.",
          section: "Talks",handler: () => {
              window.location.href = "/talks/reality_adoption_blockchain/";
            },},{id: "talks-security-analysis-of-layer-1-and-layer-2-extensions",
          title: 'Security Analysis of Layer 1 and Layer 2 Extensions',
          description: "Security considerations when building on or extending Ethereum&#39;s Layer 1 and its Layer 2 ecosystem.",
          section: "Talks",handler: () => {
              window.location.href = "/talks/security_l1_l2/";
            },},{id: "talks-a-taxonomy-and-security-analysis-of-rollup-architectures-in-ethereum-blockchain",
          title: 'A Taxonomy and Security Analysis of Rollup Architectures in Ethereum Blockchain',
          description: "Presenting a systematic taxonomy of Ethereum rollup architectures and their associated security threats.",
          section: "Talks",handler: () => {
              window.location.href = "/talks/taxonomy_rollup_architectures/";
            },},{id: "talks-a-taxonomy-of-security-analysis-of-blockchain-layer-2-scalability-solutions-and-future-directions",
          title: 'A Taxonomy of Security Analysis of Blockchain Layer 2 Scalability Solutions and Future...',
          description: "A survey presenting a systematic taxonomy for analysing the security of Layer 2 scalability solutions.",
          section: "Talks",handler: () => {
              window.location.href = "/talks/taxonomy_security_l2/";
            },},{id: "talks-unmasking-the-illusion-the-shortcomings-of-39-zero-knowledge-39-rollups-in-achieving-privacy",
          title: 'Unmasking the Illusion: The Shortcomings of &amp;#39;Zero-Knowledge&amp;#39; Rollups in Achieving Privacy',
          description: "Exploring the privacy limitations of ZK-Rollups and why their name is misleading.",
          section: "Talks",handler: () => {
              window.location.href = "/talks/unmasking_zk_privacy/";
            },},{id: "talks-hands-on-kzg-commitments-and-eip-4844",
          title: 'Hands-on KZG Commitments and EIP-4844',
          description: "A hands-on workshop on KZG polynomial commitments with a focus on their role in EIP-4844 (Proto-Danksharding), given on the same day the Dencun upgrade went live.",
          section: "Talks",handler: () => {
              window.location.href = "/talks/yacademy_kzg_workshop/";
            },},{id: "talks-zero-knowledge-for-privacy-succinct-for-scalability",
          title: 'Zero-Knowledge for Privacy, Succinct for Scalability',
          description: "Exploring the dual role of zero-knowledge proofs in blockchain: ZK for privacy and succinct proofs for scalability.",
          section: "Talks",handler: () => {
              window.location.href = "/talks/zk_privacy_scalability/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%63%72%79%70%74%6F@%30%78%41%64%72%69%61%54%6F%72%72%61%6C%62%61.%6D%65", "_blank");
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
