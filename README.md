# 🚀 Samolyet — Dating Without Swipes

> A mindful dating app that shows you 3 relevant profiles per day instead of an endless feed. No swipes. No matches required. Just direct, intentional connections.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![License](https://img.shields.io/badge/License-Private-red)]()
[![Status](https://img.shields.io/badge/Status-MVP%20in%20progress-yellow)]()

---

## 💡 The Problem

Modern dating apps are designed for **engagement, not connection**:

- ❌ Endless swiping leads to **decision fatigue**
- ❌ "Match-first" mechanics create anxiety and waiting
- ❌ Superficial profiles encourage 0.5-second judgments
- ❌ Algorithms optimize for **time-in-app**, not real relationships
- ❌ Users spend 2+ hours daily and feel burnt out

**Result:** People delete apps frustrated, not fulfilled.

---

## ✨ The Solution: Samolyet

Samolyet is a **conscious alternative** built on three principles:

### 1. **Less is More**
You receive exactly **3 curated profiles per day** based on your stated goal. No infinite scroll. No FOMO.

### 2. **Direct Communication**
No match required. If someone catches your eye, you can message them directly. No games, no waiting.

### 3. **Goal-First Matching**
Users declare their intent upfront:
- 💍 Serious relationship
- 🤝 Friendship  
- ☕ Casual connections

Profiles shown align with your goal — and theirs.

---

## 🎯 Key Features

- **🎲 Daily Curated Feed** — 3 high-signal profiles tailored to your preferences
- **💬 Direct Messaging** — Write to anyone, no mutual match gatekeeping
- **🎯 Goal-Based Filtering** — Serious, friendship, or casual — you decide
- **🏷️ Rich Interest Tags** — Detailed profiles with weighted interests (important vs nice-to-have)
- **⚡ Quick Sessions** — Designed to be used in under 10 minutes/day
- **💎 Transparent Algorithm** — Know why you're seeing each profile

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Mobile App** | React Native + TypeScript |
| **Backend API** | Node.js + Express |
| **Database** | MongoDB |
| **Authentication** | (TBD — likely Firebase Auth or JWT) |
| **Hosting** | (Frontend: app stores / Backend: Railway or Render) |
| **Payments** | (TBD — Stripe for subscriptions) |

---

## 🧭 Ethical Principles

Samolyet is built on a different philosophy than traditional dating apps:

1. **We don't sell hope** — We sell a tool for conscious choice
2. **User success = our success** — Even if it means they delete the app
3. **No manipulative mechanics** — No FOMO, no fake likes, no artificial scarcity without value
4. **Time is precious** — We optimize for meaningful outcomes, not time-in-app
5. **Transparency over growth** — We'd rather have 1,000 happy users than 1,000,000 burnt-out ones

---

## 🚦 Current Status

✅ Problem validation (7+ user interviews)
✅ Product requirements document (PRD v1.0)
✅ UI/UX wireframes
🔄 Frontend development (in progress)
⏳ Backend API
⏳ Beta launch
⏳ Public release


---

## 🚀 Getting Started (Development)

> ⚠️ This is a private project. Access is limited to the maintainer.

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Environment Variables

Create a .env.local file:
```bash
API_URL=http://localhost:3000/api
FIREBASE_API_KEY=your_key_here
```

## 📚 Project Structure

```bash
samolyet-frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # App screens (Home, Profile, Chat, etc.)
│   ├── navigation/      # React Navigation setup
│   ├── services/        # API calls
│   ├── hooks/           # Custom React hooks
│   ├── store/           # State management (Zustand/Redux)
│   ├── utils/           # Helper functions
│   ├── types/           # TypeScript interfaces
│   └── assets/          # Images, fonts, etc.
├── App.tsx              # Entry point
└── package.json
```
