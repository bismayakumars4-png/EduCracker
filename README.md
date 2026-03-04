# 🚀 EduCracker - Smart Exam Preparation Platform

<p align="center">
  <img src="https://img.shields.io/badge/Version-2.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/Stack-Node.js%20%7C%20Express%20%7C%20MySQL-green" alt="Tech Stack">
  <img src="https://img.shields.io/badge/License-MIT-orange" alt="License">
</p>

## 🎯 One-Line Pitch

**"Your AI-powered exam preparation companion that transforms practice into mastery through smart analytics and personalized learning paths."**

---

## 📚 What is EduCracker?

EduCracker is a modern, beginner-friendly exam preparation platform built for students who want to crack competitive exams, college tests, and certifications. It combines intelligent practice tools with performance insights to help students identify weak areas and improve systematically.

> **Vision**: Democratizing quality exam preparation for every student, anywhere.

---

## ✨ Why EduCracker?

| Traditional Prep | EduCracker Approach |
|-----------------|---------------------|
| Random question practice | Structured learning paths |
| Guess-based preparation | Data-driven insights |
| One-size-fits-all | Personalized recommendations |
| Isolated studying | Community-driven competition |
| No progress tracking | Comprehensive analytics |

---

## 🎯 Core Features (Refined)

### 1. Smart Test Engine
- **Adaptive Tests** - Difficulty adjusts based on performance
- **Subject-wise Mock Tests** - Physics, Chemistry, Math, English, etc.
- **Timed Practice** - Real exam simulation with countdown timers
- **Instant Results** - Get scores immediately after submission

### 2. Performance Analytics
- **Score Dashboard** - Visual charts showing progress over time
- **Weak Area Detection** - Automatically identifies topics needing attention
- **Comparative Rankings** - See how you stack against peers
- **Detailed Reports** - Question-by-question analysis

### 3. Study Hub
- **Curated Notes** - Subject-wise learning materials
- **Bookmarks** - Save important questions for revision
- **Quick Revise** - Spaced repetition for better retention

### 4. Gamification
- **Daily Streaks** - Build consistent study habits
- **Achievements** - Earn badges for milestones
- **Leaderboards** - Healthy competition with peers
- **XP System** - Gamified learning experience

### 5. User-Centric Design
- **Mobile-First** - Study anywhere, anytime
- **Clean Interface** - Distraction-free learning environment
- **Fast Performance** - Quick loading, smooth interactions
- **Accessible** - Works on all devices

---

## 🔥 "Wow Features" (Buildable)

### 1. Smart Recommendation Engine
*AI-powered question suggestions based on:*
- Previous incorrect answers
- Time spent on topics
- Difficulty progression
- User's target exam pattern

### 2. Test Pattern Analysis
*Helps students understand exam trends:*
- Topic frequency analysis
- Question type distribution
- Difficulty weightage mapping
- Year-over-year pattern detection

### 3. Instant Doubt Clarification
*Built-in explanation system:*
- Step-by-step solution for every question
- Related concepts linking
- Video/image explanations (future scope)
- Community discussion threads

---

## 📱 User Flow

```
Landing Page → Register → Dashboard → Take Test → View Results → Analyze → Improve → Repeat
```

### Detailed Journey:

1. **Discovery** - Land on homepage, explore features
2. **Onboarding** - Quick signup, select target exam/subjects
3. **Assessment** - Take diagnostic test to gauge current level
4. **Learning** - Access study materials, practice questions
5. **Testing** - Take mock tests under timed conditions
6. **Analysis** - Review detailed performance reports
7. **Improvement** - Focus on weak areas with recommendations
8. **Mastery** - Track progress, maintain streaks, climb leaderboards

---

## 💻 Dashboard Sections

| Section | Purpose |
|---------|---------|
| **Welcome Hero** | Quick stats, daily goal, continue learning |
| **Performance Widget** | Score trends, accuracy charts |
| **Upcoming Tests** | Scheduled exams, deadlines |
| **Quick Actions** | Start test, practice, view materials |
| **Recent Activity** | Last attempted tests, notes |
| **Weak Areas** | Topics needing attention |
| **Leaderboard** | Rank among peers |
| **Streak Calendar** | Daily study consistency |

---

## 🎨 Design System

### Color Palette
```
Primary Blue:     #3B82F6 (Trust, Education)
Deep Blue:        #1E40AF (Authority)
Light Blue:       #60A5FA (Freshness)
Success Green:    #10B981 (Achievement)
Warning Orange:   #F59E0B (Attention)
Error Red:        #EF4444 (Incorrect)
Neutral Grays:    #6B7280 to #F9FAFB
White:            #FFFFFF (Clean background)
```

### Typography
- **Font Family**: Inter (Modern, readable)
- **Headings**: Bold, clear hierarchy
- **Body**: Comfortable reading size (16px base)

### UI Principles
- Clean white backgrounds with blue accents
- Generous whitespace for readability
- Consistent border-radius (8px-12px)
- Subtle shadows for depth
- Smooth transitions (200ms)

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL (via XAMPP) |
| **ORM** | Prisma |
| **Authentication** | JWT (planned) |
| **Deployment** | Local/Vercel ready |

---

## 📁 Project Structure

```
EduCracker/
├── frontend/              # Frontend Application
│   ├── pages/            # HTML pages
│   │   ├── index.html    # Landing page
│   │   ├── dashboard.html # Student dashboard
│   │   ├── login.html    # Authentication
│   │   ├── register.html # User registration
│   │   ├── test.html    # Test taking interface
│   │   ├── result.html  # Test results
│   │   ├── questions.html # Question bank
│   │   └── notes.html   # Study materials
│   ├── css/             # Stylesheets
│   │   └── style.css    # Main styles
│   ├── js/              # Client-side JavaScript
│   │   ├── app.js       # Main app logic
│   │   ├── main.js      # Utilities
│   │   └── config.js    # Configuration
│   └── config.js        # Frontend config
│
├── backend/              # Backend API
│   ├── prisma/          # Database schema
│   │   └── schema.prisma
│   ├── routes/          # API routes
│   │   └── index.js
│   ├── models/          # Data models
│   │   └── Note.js
│   ├── db.js           # Prisma client
│   ├── server.js       # Express server
│   ├── package.json    # Dependencies
│   └── .env            # Environment variables
│
└── README.md            # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **XAMPP** (MySQL server on localhost:3306)
- **npm** (comes with Node.js)

### Installation

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push

# Start server
npm run dev
```

Server runs at: **http://localhost:5000**

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api` | API info |

*More endpoints coming in Phase 2!*

---

## 🎓 Target Exams

EduCracker is designed for:

- 🏥 **Medical** - NEET, AIIMS
- 📐 **Engineering** - JEE, BITSAT
- 📚 **Government Jobs** - SSC, Railways, Banking
- 🎓 **College Entrance** - CUET, IPU CET
- 📖 **School** - CBSE, ICSE, State Boards

---

## 🔮 Future Roadmap

- [ ] User Authentication (JWT)
- [ ] Question Bank with 10,000+ questions
- [ ] AI-powered recommendations
- [ ] Video lecture integration
- [ ] Mobile app (React Native)
- [ ] Payment gateway for premium features
- [ ] Admin dashboard
- [ ] Real-time chat support

---

## 👨‍💻 For Developers

This project is perfect for:
- Learning full-stack development
- Building portfolio projects
- Understanding database design
- Practicing modern CSS techniques

### Contributing

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - Feel free to use for learning and personal projects.

---

<div align="center">

**Built with ❤️ for students everywhere**

*Start your journey to exam success today!* 🎯

</div>
