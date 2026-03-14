export const projectsData = [
  {
    id: 1,
    title: "Sales Data Analysis Dashboard",
    category: "Data Analysis",
    date: "Jan 2025",
    description: "Built an interactive sales analytics dashboard using Python, Pandas, and Power BI to visualize business insights.",
    fullDescription: "An interactive sales analytics dashboard that helps visualize key business metrics and trends. This project demonstrates proficiency in data cleaning, transformation, and visualization using modern data analysis tools.",
    technologies: ["Python", "Pandas", "Power BI", "SQL"],
    image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=300&fit=crop",
    badge: "📈",
    link: "https://github.com/",
    highlights: [
      "Interactive dashboards with real-time updates",
      "Advanced data visualization and reporting",
      "Business intelligence insights"
    ]
  },
  {
    id: 4,
    title: "Little Lemon Food Ordering App",
    category: "App Development",
    date: "Feb 2026",
    description: "A native iOS food ordering app for Little Lemon restaurant, featuring onboarding, a dynamic menu, and persistent user profile management.",
    fullDescription: "A native iOS food ordering application built for the Little Lemon restaurant brand. The app features a smooth onboarding flow that captures user details, a home screen with a rich menu breakdown and food list, and a profile screen where users can update and persist their personal information across sessions. Designed with Figma wireframes and built entirely in Swift using Xcode.",
    technologies: ["Swift", "SwiftUI", "Xcode", "Core Data", "Figma"],
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    badge: "🍋",
    link: "https://github.com/Avinash11-AK11/Little-Lemon-Food-Ordering-App",
    highlights: [
      "Native iOS app built with Swift & SwiftUI",
      "Stack navigation with onboarding flow",
      "Persistent profile data with Core Data",
      "Designed from custom Figma wireframes"
    ]
  },
  {
    id: 5,
    title: "Geeta Furniture — E-Commerce App",
    category: "App Development",
    date: "Feb 2026",
    description: "A full-featured Flutter e-commerce app for a furniture store, with dual admin & user modes, product management, category-based browsing, and Firebase backend.",
    fullDescription: "Geeta Furniture is a cross-platform Flutter e-commerce application built for a real furniture business. The app features two distinct modes — a customer-facing storefront and an admin panel — allowing store owners to add, edit, and manage products while customers browse by category and place orders. Firebase powers the real-time database and authentication layer, enabling live product updates and secure user sessions. The dual NavBar architecture cleanly separates the admin and user experiences within a single codebase, and the shop-by-category system makes product discovery intuitive and fast.",
    technologies: ["Flutter", "Dart", "Firebase", "Firestore"],
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    badge: "🛋️",
    link: "https://github.com/Avinash11-AK11/geeta_furniture",
    highlights: [
      "Dual admin & user modes in a single app",
      "Category-based product browsing",
      "Add, edit & manage products (admin panel)",
      "Firebase Firestore real-time backend"
    ]
  },
  {
    id: 6,
    title: "Cattle Breed Recognition",
    category: "Web Development",
    date: "Sep 2025",
    description: "A full-stack AI web app that identifies cattle breeds from images, powered by a FastAPI ML backend and a React frontend with Supabase authentication.",
    fullDescription: "Cattle Breed Recognition is a full-stack AI-powered web application that allows users to upload or capture images of cattle and receive instant breed identification. The React frontend (built with Vite) communicates with a FastAPI Python backend that runs the ML breed classification model. Supabase handles user authentication — supporting email/password, Google OAuth, and phone OTP — as well as database storage for recognition history. The project follows a clean separation of concerns with a dedicated backend directory, environment-based configuration, and a modular React component structure.",
    technologies: ["React", "FastAPI", "Python", "Supabase", "Vite"],
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop",
    badge: "🐄",
    link: "https://github.com/Avinash11-AK11/Cattle_Breed_Recognition",
    highlights: [
      "AI-powered cattle breed classification from images",
      "FastAPI Python backend with ML model integration",
      "React + Vite frontend with multi-screen routing",
      "Supabase auth: email, Google OAuth & phone OTP"
    ]
  },
  {
    id: 7,
    title: "Cosmic Explorer",
    category: "Web Development",
    date: "Jun 2025",
    description: "An interactive space exploration web app built with React and Vite, featuring rich cosmic visuals, smooth animations, and an immersive UI for exploring the universe.",
    fullDescription: "Cosmic Explorer is a React + Vite web application themed around space and astronomy. The project showcases advanced CSS animations, rich visual design, and a component-driven React architecture to deliver an immersive user experience. Built with fast HMR development via Vite and styled entirely with custom CSS, the app demonstrates strong frontend skills in building visually compelling, interactive interfaces.",
    technologies: ["React", "Vite", "JavaScript", "CSS3"],
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop",
    badge: "\uD83D\uDE80",
    link: "https://github.com/Avinash11-AK11/Cosmic-Explorer",
    highlights: [
      "Space-themed immersive UI with rich animations",
      "React component architecture with Vite build tooling",
      "Custom CSS3 animations and visual effects",
      "Fully responsive layout"
    ]
  }
];

export const projectCategories = [
  {
    id: "data-analysis",
    name: "Data Analysis",
    icon: "📊",
    color: "from-[#9B5F3F] to-[#8B5736]",
    count: 1,
  },
  {
    id: "app-development",
    name: "App Development",
    icon: "📱",
    color: "from-[#8B5736] to-[#7A4F2F]",
    count: 2,
  },
  {
    id: "web-development",
    name: "Web Development",
    icon: "🌐",
    color: "from-[#7A4F2F] to-[#6F4A2D]",
    count: 2,
  }
];
