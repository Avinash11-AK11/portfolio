import iosResumePdf from "../assets/other/resume/ios_app_developer_resume.pdf";

export const resumesData = [
  {
    id: 1,
    title: "Full Stack Web Developer",
    category: "Web Development",
    company: "Avinash Chavda",
    period: "2024 - Present",
    location: "Ahmedabad, India",
    description: "Full-stack web developer specializing in building scalable and performant applications using React, Node.js, and RESTful APIs. Experienced in designing secure authentication systems, optimizing backend performance, and developing responsive user interfaces. Proven ability to deliver production-ready solutions with clean architecture, efficient data handling, and strong attention to user experience.",
    fullDescription: "Full-stack web developer specializing in building scalable and performant applications using React, Node.js, and RESTful APIs. Experienced in designing secure authentication systems, optimizing backend performance, and developing responsive user interfaces. Proven ability to deliver production-ready solutions with clean architecture, efficient data handling, and strong attention to user experience.",
    icon: "💻",
    badge: "Featured",
    resumeUrl: require("../assets/other/resume/web_development_resume.pdf"),
    education: {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "Institute of Infrastructure, Technology, Research and Management (IITRAM), Ahmedabad",
      period: "2024 – current",
      cgpa: "7.32 / 10",
      focus: "Web Development, Data Structures & Algorithms, Object-Oriented Programming",
      activities: "Hackathon Competitions, Software Development Projects, Data Analysis, App Development"
    },
    technicalSkills: {
      programming: ["JavaScript (ES6+)", "Python", "C++"],
      frontend: ["React", "Material-UI", "HTML5", "CSS3", "Responsive Design", "State Management"],
      backend: ["Node.js", "Express.js", "REST APIs", "Authentication (JWT)", "Spring Boot"],
      databases: ["MongoDB", "MySQL", "Firebase", "Supabase"],
      tools: ["Git", "GitHub", "CI/CD", "Vercel", "Netlify", "API Integration", "Debugging", "Deployment"]
    },
    projects: [
      {
        name: "RevenueCat Paywall Championship Landing Page",
        stack: ["React", "Vite", "CSS"],
        github: true,
        bullets: [
          "Built responsive landing page with interactive paywall demo and real-time countdown timer",
          "Developed modal-based paywall, pricing selection, and scroll progress indicator",
          "Enhanced UX using smooth scrolling, animations, and responsive design",
          "Designed modular component architecture for scalability and maintainability"
        ]
      },
      {
        name: "Furniture Business Management System",
        stack: ["React", "Node.js"],
        github: true,
        bullets: [
          "Built full-stack system with JWT authentication and role-based access control",
          "Improved backend performance by 35% through optimized queries and API design",
          "Designed RESTful APIs for product, order, and user workflows",
          "Deployed using CI/CD pipeline ensuring reliable delivery"
        ]
      },
      {
        name: "Cosmic Explorer (Hackathon Winner)",
        stack: ["react", "WebGL", "NASA API"],
        github: true,
        bullets: [
          "Developed astronomy visualization platform using react with real-time API integration",
          "Implemented geolocation-based rendering and interactive exploration UI",
          "Optimized rendering performance using efficient scene and animation handling",
          "Secured 1st place by delivering complete working prototype within 48 hours"
        ]
      }
    ],
    experience: [
      { company: "Vaishnav Technologies", role: "Frontend Developer Intern", link: "#" },
      { company: "CODEXINTERN", role: "Web Development Intern", link: "#" },
      { company: "Technosix Solutions", role: "Web Development Intern", link: "#" },
      { company: "Wayspire", role: "Web Development Intern", link: "#" }
    ],
    achievements: [
      { title: "1st Place — Cosmic Explorer Hackathon", link: "#" },
      { title: "NASA Space Apps Challenge — Global Participant", link: "#" },
      { title: "Suprathon 2025 — National Hackathon", link: "#" },
      { title: "Frontend Battle — Vibe Coding Competition", link: "#" }
    ]
  },
  {
    id: 2,
    title: "Frontend Engineer",
    category: "Web Development",
    company: "Digital Solutions Ltd.",
    period: "Jun 2023 - Dec 2023",
    location: "Hybrid",
    description: "Built and optimized user interfaces for web applications with focus on user experience and performance.",
    fullDescription: "Specialized in creating intuitive, accessible, and performant user interfaces. Collaborated with UX designers and backend developers to deliver seamless user experiences across multiple platforms.",
    responsibilities: [
      "Created reusable React components increasing development velocity by 35%",
      "Implemented responsive designs that work across all devices",
      "Reduced CSS bundle size by 45% through optimization",
      "Implemented accessibility standards (WCAG 2.1) across all projects",
      "Conducted code reviews and mentored 2 junior developers"
    ],
    skills: ["React", "TypeScript", "TailwindCSS", "Figma", "Git", "Jest", "Webpack", "HTML/CSS"]
  },
  {
    id: 3,
    title: "iOS App Developer",
    category: "App Development",
    company: "Personal Projects",
    period: "2025 - Present",
    location: "Ahmedabad, India",
    description: "iOS & Flutter Developer with hands-on experience building production-grade mobile apps using Flutter, Dart, SwiftUI, UIKit, and Firebase.",
    fullDescription: "iOS & Flutter Developer with hands-on experience building production-grade mobile apps using SwiftUI, UIKit, and Firebase. Developed cross-platform e-commerce solutions with real-time sync, authentication, and push notifications. Hackathon winner with proven ability to deliver scalable, clean-architecture applications under tight deadlines.",
    responsibilities: [
      "Built Geeta Furniture - Flutter e-commerce app (also compatible with iOS) with Firebase Auth, Firestore, Storage, and FCM notifications for real-time order updates",
      "Developing native iOS application using SwiftUI & UIKit with MVVM architecture and Apple HIG guidelines, preparing for App Store deployment",
      "Implemented real-time data synchronization using Firebase with offline-first architecture",
      "Designed scalable feature-based architecture following clean architecture principles",
      "Integrated Core Location and push notifications for enhanced user engagement"
    ],
    skills: ["Swift", "SwiftUI", "UIKit", "Flutter", "Dart", "Firebase", "Firestore", "Core Data", "REST APIs", "MVVM Architecture", "Clean Architecture"],
    resumeUrl: iosResumePdf,
    icon: "📱",
    education: {
      degree: "B.Tech. in Computer Science & Engineering",
      institution: "Institute of Infrastructure, Technology, Research & Management (IITRAM)",
      location: "Ahmedabad",
      period: "2023 - 2027",
      cgpa: "7.32 / 10",
      focus: "Mobile Application Development, Data Structures & Algorithms, Object-Oriented Programming",
      activities: "Hackathon Competitions, Software Development Projects, Data Analysis"
    },
    technicalSkills: {
      mobile: ["iOS (Swift, SwiftUI, UIKit, Xcode)", "Flutter (Dart)"],
      languages: ["Dart", "Swift", "Python", "JavaScript", "C++"],
      backend: ["Firebase (Firestore, Auth, Storage, FCM)", "Supabase", "MySQL"],
      architecture: ["MVVM", "MVC", "Clean Architecture", "REST APIs", "State Management"],
      tools: ["Git", "GitHub", "Xcode", "Android Studio", "VS Code"]
    },
    projects: [
      {
        name: "Geeta Furniture",
        type: "Flutter & iOS E-Commerce App",
        description: "Built a cross-platform e-commerce app supporting product browsing, cart, wishlist, and order workflows",
        details: [
          "Implemented Firebase Auth, Firestore, Storage enabling secure authentication and real-time data synchronization",
          "Integrated FCM notifications for live order updates and user engagement",
          "Designed scalable feature-based architecture (assets / orders / admin / wishlists) following clean architecture principles",
          "Compatible with both Flutter (Android/Web) and iOS platforms"
        ]
      },
      {
        name: "iOS Native Application",
        type: "Native iOS App",
        description: "Developing a native iOS application with modern Swift technologies",
        details: [
          "Implementing SwiftUI & UIKit with MVVM architecture and Apple HIG guidelines",
          "Integrating Core Location for location-based features",
          "Preparing the app for App Store deployment with comprehensive testing"
        ],
        status: "In Progress"
      }
    ],
    achievements: [
      {
        title: "StellarNet Hackathon Winner",
        description: "Built Cosmic Explorer using astronomical APIs, secured 1st place"
      },
      {
        title: "NASA Space Apps Challenge",
        description: "Global Participant - Developed a complete solution in a 48-hour global hackathon"
      },
      {
        title: "SuPython 2025 National Hackathon",
        description: "Delivered a functional prototype for user-centric solutions"
      }
    ],
    certifications: [
      {
        name: "Meta iOS UI Development Specialization",
        provider: "Meta (Coursera)",
        skills: "UIKit, SwiftUI, iOS UI Design"
      },
      {
        name: "Flutter Development Bootcamp",
        provider: "Udemy",
        skills: "Flutter, Dart, Firebase"
      },
      {
        name: "Meta iOS Developer Professional Certificate",
        provider: "Meta (Coursera)",
        skills: "Swift, SwiftUI, UIKit, App Deployment"
      }
    ]
  },
  {
    id: 4,
    title: "Android App Developer",
    category: "App Development",
    company: "AppCraft Technologies",
    period: "Sep 2023 - Feb 2024",
    location: "On-site",
    description: "Built robust Android applications using Kotlin with focus on modern architecture and user engagement.",
    fullDescription: "Specialized in developing feature-rich Android applications using modern development practices. Implemented MVVM architecture, dependency injection, and reactive programming paradigms for scalable applications.",
    responsibilities: [
      "Developed Android app with 100k+ daily active users",
      "Implemented MVVM architecture reducing bugs by 50%",
      "Integrated real-time notifications using Firebase Cloud Messaging",
      "Optimized app performance reducing memory usage by 35%",
      "Led migration from Java to Kotlin codebase"
    ],
    skills: ["Kotlin", "Java", "Android Studio", "Jetpack Compose", "Room Database", "Retrofit", "RxJava", "Firebase"]
  },
  {
    id: 5,
    title: "Data Analytics Engineer",
    category: "Data Analysis",
    company: "Analytics Pro Corp",
    period: "Dec 2023 - Present",
    location: "Remote",
    description: "Building data pipelines and creating interactive dashboards for business intelligence and decision making.",
    fullDescription: "Designing and implementing end-to-end data solutions that transform raw data into actionable business insights. Expertise in ETL processes, data warehousing, and advanced analytics using modern tools and technologies.",
    responsibilities: [
      "Built ETL pipelines processing 500GB+ data daily",
      "Created 20+ interactive dashboards using Power BI serving C-level executives",
      "Optimized SQL queries reducing query time by 50%",
      "Implemented data validation frameworks catching 95% of anomalies",
      "Trained 5+ team members on analytics best practices and tools"
    ],
    skills: ["Python", "SQL", "Power BI", "Tableau", "Apache Spark", "Pandas", "Excel", "Data Visualization"]
  },
  {
    id: 6,
    title: "BI Developer",
    category: "Data Analysis",
    company: "InsightData Solutions",
    period: "May 2023 - Nov 2023",
    location: "Hybrid",
    description: "Developed business intelligence solutions and automated reporting systems for enterprise clients.",
    fullDescription: "Specialized in translating business requirements into technical solutions. Created sophisticated data models and interactive reports enabling data-driven decision making across organizations.",
    responsibilities: [
      "Designed data warehouse supporting 50+ concurrent users",
      "Developed automated reports eliminating 100+ hours of manual work monthly",
      "Created self-service BI portal increasing data accessibility by 80%",
      "Collaborated with stakeholders to define KPIs and metrics",
      "Maintained 99.9% uptime for critical dashboard infrastructure"
    ],
    skills: ["Power BI", "SQL Server", "Tableau", "DAX", "M Language", "Data Modeling", "Excel", "Python"]
  }
];

export const resumeCategories = [
  {
    id: "web-development",
    name: "Web Development",
    icon: "💻",
    color: "from-[#9B5F3F] to-[#8B5736]",
    count: 2,
  },
  {
    id: "app-development",
    name: "App Development",
    icon: "📱",
    color: "from-[#8B5736] to-[#7A4F2F]",
    count: 2,
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    icon: "📊",
    color: "from-[#7A4F2F] to-[#6F4A2D]",
    count: 2,
  }
];
