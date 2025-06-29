// src/services/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Load Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Function to handle initial authentication (anonymous)
const initializeAuth = async () => {
  try {
    await signInAnonymously(auth);
    console.log("Signed in anonymously to Firebase.");
  } catch (error) {
    console.error("Error signing in anonymously:", error);
  }
};

// Export app instance along with db, auth, and onAuthStateChanged
export { app, db, auth, onAuthStateChanged, initializeAuth };