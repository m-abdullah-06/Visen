<div align="center">

# ⚡ VISEN

### AI-Powered Resume Analysis for Your Dream Job

*Transform your resume with intelligent, actionable feedback powered by advanced AI*

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

• [Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack)

---

![Visen Dashboard](https://via.placeholder.com/1200x600/0f172a/667eea?text=Visen+Dashboard+Screenshot)

</div>

---

## 🌟 Features

### 🎯 **AI-Powered Analysis**
- Advanced AI algorithms analyze your resume against industry standards
- Real-time ATS (Applicant Tracking System) compatibility scoring
- Personalized feedback based on job description and company requirements

### 📊 **Comprehensive Scoring**
- **Overall Score**: Get an instant assessment of your resume quality
- **Category Breakdown**: Detailed scores for Tone & Style, Content, Structure, and Skills
- **Visual Analytics**: Beautiful score gauges and progress indicators

### 💡 **Actionable Insights**
- **Tone & Style**: Professional language and formatting recommendations
- **Content Quality**: Suggestions for impactful achievements and descriptions
- **Structure**: Optimal layout and organization guidance
- **Skills Alignment**: Keyword optimization for target positions

### 🎨 **Modern UI/UX**
- Sleek dark theme with purple-indigo gradients
- Glass morphism effects and smooth animations
- Fully responsive design for all devices
- Intuitive navigation and user experience

### 🔐 **Secure & Private**
- User authentication with Puter.js
- Encrypted data storage
- Resume history and tracking
- No data sharing - complete confidentiality

---


## 🚀 Tech Stack

### **Frontend**
- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first styling
- **Vite** - Lightning-fast build tool

### **Backend & Services**
- **Puter.js** - Cloud backend & authentication
- **AI Integration** - Resume analysis engine
- **PDF Processing** - Document parsing & image conversion

### **UI Components**
- Custom-built accordion components
- Animated score gauges
- Glass morphism cards
- Responsive navigation

---

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/visen.git
cd visen
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
# Create .env file
cp .env.example .env

# Add your API keys
VITE_PUTER_APP_NAME=your_app_name
VITE_AI_API_KEY=your_ai_api_key
```

4. **Start development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
```
Navigate to http://localhost:5173
```

---

## 🎯 Usage

### **1. Sign In**
- Click "Continue" to authenticate with Puter
- Access your personalized dashboard

### **2. Upload Resume**
- Navigate to the upload page
- Enter company name, job title, and job description
- Upload your resume (PDF format)

### **3. Get Instant Feedback**
- AI analyzes your resume in seconds
- View overall score and category breakdowns
- Explore detailed improvement suggestions

### **4. Improve & Iterate**
- Apply recommended changes
- Re-upload and track improvements
- Compare multiple versions

---

## 🏗️ Project Structure

```
visen/
├── app/                    # React Router app
│   ├── routes/            # Page routes
│   │   ├── home.tsx       # Dashboard
│   │   ├── upload.tsx     # Resume upload
│   │   ├── auth.tsx       # Authentication
│   │   └── resume.$id.tsx # Analysis view
│   └── component/         # Reusable components
│       ├── Navbar.tsx
│       ├── ScoreGauge.tsx
│       ├── Summary.tsx
│       ├── Details.tsx
│       └── ATS.tsx
├── public/                # Static assets
│   ├── icons/
│   └── images/
├── lib/                   # Utilities & helpers
│   ├── puter.ts          # Puter integration
│   ├── pdf2img.ts        # PDF conversion
│   └── utils.ts          # Helper functions
└── app.css               # Global styles
```

---

## 🎨 Design Philosophy

Visen's UI is built with a focus on:

- **Modern Aesthetics**: Dark gradient backgrounds with purple-indigo accents
- **Glass Morphism**: Subtle transparency and blur effects
- **Smooth Animations**: Floating orbs and fade-in transitions
- **Accessibility**: High contrast and readable typography
- **Responsiveness**: Seamless experience across all devices

---

## 🔧 Configuration

### **Customizing AI Prompts**
Edit `constants/index.ts` to modify the AI analysis instructions:

```typescript
export const prepareInstructions = ({ jobTitle, jobDescription }) => {
  return `Analyze this resume for a ${jobTitle} position...`;
};
```

### **Styling**
Modify `app.css` for theme customization:

```css
:root {
  --color-primary: #667eea;
  --color-secondary: #764ba2;
}
```

---

## 📈 Roadmap

- [ ] **Payment Integration** - Stripe subscription tiers
- [ ] **Resume History** - Track and compare multiple versions
- [ ] **Email Notifications** - Analysis completion alerts
- [ ] **Export Features** - Download PDF reports
- [ ] **Team Collaboration** - Share and review resumes
- [ ] **Mobile App** - iOS and Android applications
- [ ] **API Access** - Developer API for integrations

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


---

## 👨‍💻 Author

**Your Name**
- GitHub: [@m-abdullah06](https://github.com/m-abdullah-06)
- Email: abdullah.muhammad.xyz@gmail.com

---

## 🙏 Acknowledgments

- [Puter.js](https://puter.com) - Cloud backend platform
- [React Router](https://reactrouter.com) - Routing library
- [TailwindCSS](https://tailwindcss.com) - CSS framework
- [Lucide Icons](https://lucide.dev) - Beautiful icons
- Special thanks to all contributors and testers

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ and ☕ by Muhammad Abdullah

[Report Bug](https://github.com/m-abdullah-06/visen/issues) • [Request Feature](https://github.com/m-abdullah-06/visen/issues)

</div>
