<div align="center">

# ⚡ VISEN - AI Career Intelligence Platform

### Your AI-Powered Career Co-Pilot

*An AI-powered career intelligence platform that helps job seekers optimize their resumes and simulate real interview experiences with personalized feedback.*

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)

[🌐 Live Demo](#) • [📖 Documentation](#-features) • [🐛 Report Bug](../../issues) • [💡 Request Feature](../../issues)

---

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Security](#-security)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Visen** is a comprehensive AI-powered career intelligence platform designed to help job seekers at every stage of their application journey. From optimizing resumes to mastering interview skills, Visen provides personalized, actionable feedback powered by advanced AI technology.

### 🌟 Key Highlights
- **2-in-1 Platform**: Resume analysis + Interview preparation
- **AI-Powered**: Leverages cutting-edge AI for intelligent feedback
- **Enterprise Security**: File validation, malware scanning, rate limiting
- **Production-Ready**: Deployed on Netlify with HTTPS, SEO-optimized
- **Beautiful UI**: Dark-themed, glass morphism design

---

## ✨ Features

### 📄 **Resume Analyzer**

- **ATS Compatibility Score**: Applicant Tracking System performance analysis
- **Multi-Category Scoring**: Feedback across 4 key areas:
  - 🎨 **Tone & Style**: Professional language quality
  - 📝 **Content**: Achievement impact and relevance
  - 🏗️ **Structure**: Layout and organization
  - 💼 **Skills**: Keyword optimization

- Instant analysis in under 10 seconds
- Personalized improvement recommendations
- Resume history tracking

### 🎤 **Interview Coach**

- **Custom Question Generation**: AI creates role-specific questions
- **Real-Time Feedback**: Instant answer evaluation
- **Comprehensive Scoring**: Content, structure, delivery analysis
- **Question Types**:
  - 💬 Behavioral (STAR method)
  - 💻 Technical (role-specific)
  - 🤔 Situational (problem-solving)

- Timer for realistic practice
- Answer history tracking
- Unlimited practice sessions

### 🔐 **Security & Privacy**

- ✅ End-to-end encryption (HTTPS/TLS)
- ✅ File validation (5MB max, PDF only)
- ✅ Malware scanning
- ✅ Per-user rate limiting (10 uses/day)
- ✅ Secure authentication via Puter.js
- ✅ GDPR-compliant

### 🎨 **User Experience**

- 🌙 Modern dark theme with purple-indigo accents
- 💎 Glass morphism UI elements
- ✨ Smooth animations
- 📱 Fully responsive design
- 🚀 Optimized performance

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **React Router v7** - Client-side routing
- **Vite** - Lightning-fast build tool
- **TailwindCSS v4** - Utility-first styling
- **Lucide React** - Icon library

### **Backend & Services**
- **Puter.js** - Cloud backend (Auth, Storage, AI)
- **Netlify** - Hosting & deployment

### **Development Tools**
- ESLint - Code linting
- Git - Version control
- npm - Package management

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Puter.js Account ([puter.com](https://puter.com))

### Installation

```bash
# 1. Clone repository
git clone https://github.com/yourusername/visen.git
cd visen

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env
# Edit .env and add your VITE_PUTER_APP_NAME

# 4. Start dev server
npm run dev

# 5. Open browser
# http://localhost:5173
```

---

## 📁 Project Structure

```
visen/
├── app/
│   ├── routes/                # Page routes
│   │   ├── landing.tsx       # Landing page (SEO)
│   │   ├── home.tsx          # Dashboard
│   │   ├── auth.tsx          # Authentication
│   │   ├── upload.tsx        # Resume upload
│   │   ├── resume.$id.tsx    # Analysis view
│   │   └── privacy.tsx       # Privacy policy
│   │
│   ├── component/             # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Summary.tsx
│   │   ├── Details.tsx
│   │   ├── ATS.tsx
│   │   └── ScoreGauge.tsx
│   │
│   └── app.css               # Global styles
│
├── lib/
│   ├── puter.ts              # Puter integration
│   ├── pdf2img.ts            # PDF conversion
│   └── utils.ts              # Helpers
│
├── public/
│   ├── robots.txt            # SEO
│   ├── sitemap.xml           # SEO
│   └── favicon.ico
│
├── routes.ts                 # Route config
└── package.json
```

---

## 🌐 Deployment

### Deploy to Netlify

```bash
# 1. Build project
npm run build

# 2. Deploy via Git (Recommended)
# - Push to GitHub
# - Connect repo in Netlify Dashboard
# - Auto-deploys on every push

# 3. Set Environment Variables
# In Netlify: Site Settings → Environment Variables
# Add: VITE_PUTER_APP_NAME
```

---

## 🔒 Security

### Implemented Measures

- ✅ **File Upload Security**:
  - 5MB size limit
  - PDF-only validation
  - Malware scanning
  
- ✅ **API Security**:
  - Rate limiting (10/day per user)
  - No exposed API keys
  - Server-side processing
  
- ✅ **Data Security**:
  - HTTPS/TLS encryption
  - At-rest encryption
  - User data isolation

- ✅ **Privacy**:
  - GDPR compliance
  - User data deletion
  - No third-party sharing

---

## 🗺️ Roadmap

### ✅ v1.0 (Current)
- [x] Resume analysis
- [x] Interview prep
- [x] User auth
- [x] Dark theme UI
- [x] SEO optimization

### 🚧 v1.1 (Next)
- [ ] Email notifications
- [ ] Resume comparison
- [ ] PDF export
- [ ] Voice recording

### 📋 v2.0 (Future)
- [ ] Payment integration
- [ ] Subscription tiers
- [ ] Resume templates
- [ ] Cover letter generator
- [ ] Mobile app

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file

---

## 🙏 Acknowledgments

- [Puter.js](https://puter.com) - Cloud backend
- [Netlify](https://netlify.com) - Hosting
- [React](https://reactjs.org) - UI framework
- [TailwindCSS](https://tailwindcss.com) - Styling
- Open source community

---

## 📞 Contact

**Author**: [Muhammad Abdullah]

- Email: your.email@example.com

**Project**: [github.com/m-abdullah-06/Visen](https://github.com/m-abdullah-06/Visen)

**Live Demo**: [Visen](https://visen-ai.netlify.app)

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

Made with ❤️ and ☕

**[⬆ Back to Top](#-visen---ai-career-intelligence-platform)**

</div>
