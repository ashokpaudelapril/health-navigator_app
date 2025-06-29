// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import { auth, onAuthStateChanged, initializeAuth } from './services/firebaseConfig'; // Import initializeAuth
import firestoreService from './services/firestoreService';
import geminiService from './services/geminiService';

import Dashboard from './components/Dashboard.jsx';
import HealthInputForm from './components/HealthInputForm.jsx';
import ProfileSettings from './components/ProfileSettings.jsx';
import RecommendationsDisplay from './components/RecommendationsDisplay.jsx';
import HealthAlertsDisplay from './components/HealthAlertsDisplay.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [healthLogs, setHealthLogs] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [healthAlerts, setHealthAlerts] = useState(null);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [error, setError] = useState(null);

  // 1. Firebase Authentication and Initialization
  useEffect(() => {
    // Initialize Firebase Auth (e.g., anonymous sign-in)
    // This call ensures Firebase is ready and attempts to authenticate
    initializeAuth();

    // Listen for authentication state changes
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null); // User logged out or anonymous session ended
      }
      setIsAuthReady(true); // Authentication state has been determined
    });

    // Cleanup subscription on component unmount
    return () => unsubscribeAuth();
  }, []); // Empty dependency array means this effect runs once on mount

  // 2. Fetch User Profile and Health Logs once authenticated and Firebase is ready
  useEffect(() => {
    if (isAuthReady && userId) {
      // Subscribe to real-time updates for user profile
      const unsubscribeProfile = firestoreService.getUserProfile(userId, setUserProfile);
      // Subscribe to real-time updates for health logs
      const unsubscribeLogs = firestoreService.getHealthLogs(userId, setHealthLogs);

      // Cleanup subscriptions on component unmount or when userId changes
      return () => {
        unsubscribeProfile();
        unsubscribeLogs();
      };
    } else if (isAuthReady && !userId) {
      // If auth is ready but no user (e.g., anonymous sign-in failed or logged out)
      // Clear any previous data
      setUserProfile({});
      setHealthLogs([]);
      setRecommendations(null);
      setHealthAlerts(null);
    }
  }, [isAuthReady, userId]); // Re-run this effect when auth status or userId changes

  // Callback function to trigger recommendation generation
  const handleGenerateRecommendations = useCallback(async () => {
    if (!userId) {
      setError("User not authenticated to generate recommendations. Please wait for authentication.");
      return;
    }
    if (healthLogs.length === 0 && Object.keys(userProfile).length === 0) {
        setError("Please log some health data and fill out your profile before generating recommendations.");
        return;
    }

    setIsLoadingRecommendations(true);
    setError(null); // Clear previous errors
    setRecommendations(null); // Clear previous recommendations
    setHealthAlerts(null); // Clear previous alerts

    // Prepare user data for the LLM call
    const userDataForLLM = {
      profile: userProfile,
      healthLogs: healthLogs // Pass all logs, the LLM service will slice as needed
    };

    try {
      const result = await geminiService.generateHealthRecommendations(userDataForLLM);
      setRecommendations({
        dietaryRecommendations: result.dietaryRecommendations,
        exerciseRecommendations: result.exerciseRecommendations,
        stressManagementTechniques: result.stressManagementTechniques
      });
      setHealthAlerts(result.healthAlerts);
    } catch (err) {
      console.error("Failed to generate recommendations:", err);
      setError("Failed to generate recommendations. Please try again.");
      setRecommendations({
        dietaryRecommendations: "Failed to load recommendations.",
        exerciseRecommendations: "",
        stressManagementTechniques: ""
      });
      setHealthAlerts("Failed to load alerts.");
    } finally {
      setIsLoadingRecommendations(false);
    }
  }, [userId, userProfile, healthLogs]); // Dependencies for useCallback

  // Display loading state while authentication is in progress
  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <LoadingSpinner />
        <p className="ml-2 text-gray-700">Initializing app and authenticating...</p>
      </div>
    );
  }

  // Display error message if authentication or Firebase initialization failed
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-800 p-4 rounded-md mx-auto max-w-lg shadow-lg">
        <p className="text-center">Error: {error}</p>
      </div>
    );
  }

  // Main application layout once authenticated and data is ready
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2">Health & Wellness Navigator</h1>
          <p className="text-lg text-gray-600">Your AI-powered guide to proactive well-being.</p>
          {userId && (
            <p className="text-sm text-gray-500 mt-2">
              User ID: <span className="font-mono bg-gray-200 px-2 py-1 rounded-md text-xs select-all">{userId}</span>
            </p>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Input Forms */}
          <div>
            <HealthInputForm userId={userId} addHealthLog={firestoreService.addHealthLog} />
            <ProfileSettings userId={userId} userProfile={userProfile} updateUserProfile={firestoreService.updateUserProfile} />
          </div>

          {/* Right Column: Dashboard and Recommendations */}
          <div>
            <Dashboard healthLogs={healthLogs} />
            <RecommendationsDisplay
              recommendations={recommendations}
              isLoading={isLoadingRecommendations}
              onGenerate={handleGenerateRecommendations}
            />
            <HealthAlertsDisplay alerts={healthAlerts} isLoading={isLoadingRecommendations} />
          </div>
        </div>

        <footer className="text-center mt-10 text-gray-500 text-sm">
          <p>&copy; 2024 Health & Wellness Navigator. All rights reserved.</p>
          <p className="mt-1">Disclaimer: This AI provides general wellness suggestions and is not a substitute for professional medical advice, diagnosis, or treatment.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;