export const resumesData = [
  {
    id: 1,
    title: "Full Stack Web Developer",
    category: "Web Development",
    company: "Tech Innovations Inc.",
    period: "Jan 2024 - Present",
    location: "Remote",
    description: "Leading frontend development and architecting scalable web applications using React and modern JavaScript frameworks.",
    fullDescription: "As a Senior Full Stack Web Developer, I design and develop responsive, high-performance web applications. I work with React, Node.js, and cloud technologies to build solutions that serve millions of users. Key responsibilities include leading architectural decisions, mentoring junior developers, and implementing best practices in code quality and performance optimization.",
    responsibilities: [
      "Developed and maintained 5+ production React applications serving 100k+ monthly users",
      "Architected microservices-based backend using Node.js and Express",
      "Implemented CI/CD pipelines reducing deployment time by 70%",
      "Led team of 3 developers on scrum-based projects",
      "Optimized application performance resulting in 40% improvement in load times"
    ],
    skills: ["React", "Node.js", "JavaScript", "TailwindCSS", "PostgreSQL", "Docker", "AWS", "REST APIs"],
    icon: "💻",
    badge: "Featured"
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
    company: "Mobile First Studios",
    period: "Mar 2024 - Present",
    location: "Remote",
    description: "Developing native iOS applications with focus on performance, user experience, and code quality.",
    fullDescription: "Creating high-performance native iOS applications for the Apple ecosystem. Expertise in Swift, SwiftUI, and integrating with backend services. Implemented complex features including real-time synchronization, offline functionality, and push notifications.",
    responsibilities: [
      "Developed 3 iOS apps published on App Store with 50k+ downloads",
      "Implemented real-time data synchronization using Firebase",
      "Built offline-first architecture improving app reliability by 60%",
      "Integrated Apple Pay and multiple payment gateways",
      "Achieved 99.5% app stability rate with comprehensive testing"
    ],
    skills: ["Swift", "SwiftUI", "Objective-C", "Firebase", "Core Data", "URLSession", "Xcode", "TestFlight"]
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
