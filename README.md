# 🧠 Proactive Health & Wellness Navigator

A personalized AI-powered health and wellness companion. This application helps users proactively manage their well-being by integrating simulated health data, providing tailored lifestyle recommendations, and flagging potential health concerns in real time.

## ✨ Features

- **🔐 User Authentication**: Secure anonymous login via Firebase.
- **🧬 Personalized Profile**: Input health goals, dietary restrictions, exercise preferences, and simulated genetic/medical conditions.
- **📅 Daily Health Logging**: Log heart rate, sleep, activity, mood, and symptoms daily.
- **📊 Interactive Dashboard**: Visualize trends using charts (e.g., heart rate, sleep).
- **🧠 AI-Powered Recommendations**: Receive smart suggestions for diet, fitness, and stress management using the Gemini API.
- **🚨 Proactive Health Alerts**: AI flags potentially concerning trends based on your logs.
- **🔄 Real-time Sync**: All data synced instantly via Firebase Firestore.
- **🔐 Secure API Access**: Gemini API securely accessed via Firebase Cloud Functions.
- **📱 Responsive Design**: Built with Tailwind CSS for mobile and desktop.

## 🚀 Technologies Used

### Frontend

- **React** – UI Framework
- **Vite** – Fast build tool
- **Tailwind CSS** – Utility-first styling
- **Recharts** – React-based data visualization

### Backend (BaaS)

- **Firebase Authentication** – Anonymous sign-in
- **Firebase Firestore** – Real-time NoSQL database
- **Firebase Cloud Functions** – Secure Gemini API proxy

### Artificial Intelligence

- **Google Gemini API (gemini-2.0-flash)** – Smart recommendations and alert generation

## 📋 Prerequisites

Before getting started, make sure you have the following installed:

- Node.js (LTS recommended)
- npm or Yarn
- Firebase CLI  
  ```bash
  npm install -g firebase-tools
  ```
- Google Account (for Firebase and Google AI Studio access)

## ⚙️ Setup Instructions

### 1. Clone the Repo & Install Dependencies

```bash
npm create vite@latest health-navigator-app -- --template react
cd health-navigator-app
npm install
npm install firebase recharts
```

### 2. Configure Firebase

- Create a project in [Firebase Console](https://console.firebase.google.com/)
- Add a Web App and copy the `firebaseConfig` object
- Enable the following:
  - **Firestore** (production mode)
  - **Authentication** (Anonymous)
  - **Cloud Functions**
- Upgrade to **Blaze Plan** (needed for Cloud Functions)

### 3. Get Google Gemini API Key

- Visit [Google AI Studio](https://makersuite.google.com/)
- Generate and copy your API key

### 4. Environment Variables

Create `.env` and `.env.production` files in the root:

```env
VITE_FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY"
VITE_FIREBASE_AUTH_DOMAIN="YOUR_FIREBASE_AUTH_DOMAIN"
VITE_FIREBASE_PROJECT_ID="YOUR_FIREBASE_PROJECT_ID"
VITE_FIREBASE_STORAGE_BUCKET="YOUR_FIREBASE_STORAGE_BUCKET"
VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_FIREBASE_MESSAGING_SENDER_ID"
VITE_FIREBASE_APP_ID="YOUR_FIREBASE_APP_ID"
```

**Update `.gitignore`:**

```gitignore
.env
.env.local
.env.*.local
```

### 5. Rename Files & Update Imports

Ensure `.jsx` extensions for JSX files:

```bash
mv src/App.js src/App.jsx
mv src/index.js src/index.jsx
# ... repeat for other components ...
```

Update all import statements and script paths in `public/index.html`.

### 6. Setup & Deploy Cloud Functions

```bash
firebase init functions
# Use existing project, choose JavaScript, skip ESLint, install deps

cd functions
npm install @google/generative-ai
cd ..

firebase functions:config:set gemini.key="YOUR_GEMINI_API_KEY"
firebase deploy --only functions
```

### 7. Run Locally

```bash
npm run dev
# App opens at http://localhost:5173
```

## 🔎 Usage

1. **Log In**: Automatically logged in anonymously.
2. **Profile Setup**: Enter your preferences and simulated medical data.
3. **Daily Logging**: Record daily metrics (heart rate, mood, etc.).
4. **View Dashboard**: Track trends via graphs.
5. **AI Suggestions**: Get personalized advice using the Gemini API.
6. **Health Alerts**: View AI-detected concerns.

## ⚠️ Disclaimers

- **AI is not a doctor**: Recommendations are informational only. Consult a licensed professional for real medical concerns.
- **Blaze Plan Note**: Required for Cloud Functions, but includes a generous free tier.
- **Data Simulation**: For privacy, "genetic/medical data" is simulated and user-entered.

## 🌟 Future Enhancements

- Wearable integrations (Google Fit, Apple Health)
- Nutrient-level food logging
- Custom trend analysis over time
- Goal tracking progress bars
- Push notifications for alerts and tips
- Doctor report PDF export
- Multi-user support (with email/password login)

## 📄 License

This project is for educational and prototyping purposes. Always follow health data regulations (HIPAA/GDPR) if handling real data in production.

## 🙌 Acknowledgments

- [Firebase](https://firebase.google.com/)
- [Google AI Studio](https://makersuite.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/en-US/)
