# Avinash - Professional Portfolio

A luxury, modern portfolio website built with React.js showcasing certifications and professional achievements.

## 🎨 Features

- **Luxury Design**: Gold and brown color scheme with smooth animations
- **Responsive Layout**: Mobile, tablet, and desktop optimized
- **Smart Filtering**: Filter certifications by type, search by keyword, and sort options
- **6 Category Pages**: Data Analysis, App Development, Web Development, Others
- **Professional UI**: Clean, modern interface with hover effects and transitions
- **Fast Performance**: Single-page application (SPA)

## 📋 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── CategoryCard.jsx
│   ├── CertCard.jsx
│   └── FilterBar.jsx
├── pages/              # Page components
│   ├── HomePage.jsx
│   └── CertificationsPage.jsx
├── data/               # Data files
│   └── certifications.js
├── styles/             # CSS files
│   └── index.css
├── App.jsx             # Main app component
└── index.js            # Entry point
```

## 🛠️ Tech Stack

- **Frontend**: React 18.2
- **Styling**: Tailwind CSS 3.3
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build**: Create React App (React Scripts 5.0.1)

## 🚀 Getting Started

### Prerequisites
- Node.js 14+
- npm or yarn

### Installation

1. **Clone or navigate to project**
```bash
cd Portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm build
```

Creates an optimized build in the `build/` folder.

## 📝 Customization

### Update Personal Information
Edit `src/data/certifications.js`:
```javascript
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  bio: "Your bio",
  // ... other details
};
```

### Add/Update Certifications
Update the `certificationsData` array in `src/data/certifications.js`:
```javascript
{
  id: 15,
  category: "Web Development",
  title: "Certificate Title",
  organization: "Organization Name",
  date: "Month Year",
  type: "Course Completion", // or "Internship" or "Other"
  description: "Brief description",
  credentialUrl: "https://...",
  badge: "🎓",
  image: "https://image-url.jpg",
}
```

### Change Colors
Edit `tailwind.config.js` color theme:
```javascript
colors: {
  gold: { /* Gold shades */ },
  brown: { /* Brown shades */ },
  // ... add more colors
}
```

## 🎯 Pages & Routes

- **Home**: `/` - Hero section and category overview
- **Data Analysis**: `/certifications/data-analysis`
- **App Development**: `/certifications/app-development`
- **Web Development**: `/certifications/web-development`
- **Others**: `/certifications/others`

## 💻 Available Scripts

In the project directory, you can run:

- `npm start` - Run development server
- `npm build` - Build for production
- `npm eject` - Eject from CRA (one-way operation)

## 🎨 Design Features

- **Luxury Color Scheme**: Gold (#D4AF37) and Brown tones
- **Smooth Animations**: Fade-in, slide-up, and scale effects
- **Shadow Effects**: Custom luxury shadows for depth
- **Responsive Grid**: Mobile-first design approach
- **Professional Typography**: Merriweather (serif) + Inter (sans-serif)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

© 2026 Avinash. All rights reserved.

## 🤝 Contact

- Email: avinash@example.com
- LinkedIn: [Your LinkedIn URL]
- GitHub: [Your GitHub URL]

---

**Built with ♦ for excellence**
