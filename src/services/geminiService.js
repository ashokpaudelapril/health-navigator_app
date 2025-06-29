// src/services/geminiService.js
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './firebaseConfig'; // Import the initialized Firebase app instance

// Get the functions instance from the initialized app
const functions = getFunctions(app);

// Create a callable function reference for your Cloud Function
// The string 'generateHealthRecommendations' must match the name of your deployed Cloud Function
const generateHealthRecommendationsCallable = httpsCallable(functions, 'generateHealthRecommendations');

const geminiService = {
  /**
   * Generates health recommendations and alerts by calling a Firebase Cloud Function.
   * The Cloud Function then securely calls the Gemini API.
   * @param {object} userData - Contains user profile and health logs.
   * @returns {Promise<object>} A promise that resolves to an object with recommendations and alerts.
   */
  generateHealthRecommendations: async (userData) => {
    // Construct the prompt and generation config on the client side
    // This allows the client to control the AI's behavior without exposing the API key
    const prompt = `
      As a Proactive Health & Wellness Navigator AI, analyze the following user data and provide hyper-personalized recommendations for diet, exercise, and stress management. Also, flag any potential health issues that warrant discussion with a doctor.

      User Profile:
      - Goals: ${userData.profile.goals || 'Not specified'}
      - Dietary Restrictions: ${userData.profile.dietaryRestrictions || 'None'}
      - Exercise Preferences: ${userData.profile.exercisePreferences || 'None'}
      - Genetic Predispositions (simulated): ${userData.profile.geneticPredispositions || 'None known'}
      - Medical Conditions (simulated): ${userData.profile.medicalConditions || 'None'}

      Recent Health Logs (last 7 entries, most recent first):
      ${userData.healthLogs.slice(0, 7).map(log => `
        - Date: ${log.date ? log.date.toLocaleDateString() : 'N/A'}
        - Heart Rate: ${log.heartRate || 'N/A'} bpm
        - Sleep Hours: ${log.sleepHours || 'N/A'} hours
        - Activity Minutes: ${log.activityMinutes || 'N/A'} minutes
        - Mood: ${log.mood || 'N/A'}
        - Symptoms: ${log.symptoms || 'None'}
      `).join('')}

      Based on this data, provide:
      1.  **Dietary Recommendations:** Specific food suggestions, meal ideas, or general dietary advice.
      2.  **Exercise Recommendations:** Specific workout types, duration, or activity goals.
      3.  **Stress Management Techniques:** Practical tips or exercises.
      4.  **Potential Health Alerts:** Any patterns or anomalies that suggest a potential health issue needing professional medical consultation. If none, state "None identified."

      Format your response as a JSON object with the following structure:
      {
        "dietaryRecommendations": "string",
        "exerciseRecommendations": "string",
        "stressManagementTechniques": "string",
        "healthAlerts": "string"
      }
    `;

    const generationConfig = {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          "dietaryRecommendations": { "type": "STRING" },
          "exerciseRecommendations": { "type": "STRING" },
          "stressManagementTechniques": { "type": "STRING" },
          "healthAlerts": { "type": "STRING" }
        },
        "propertyOrdering": [
          "dietaryRecommendations",
          "exerciseRecommendations",
          "stressManagementTechniques",
          "healthAlerts"
        ]
      }
    };

    try {
      // Call the Firebase Cloud Function with the prompt and generation config
      const result = await generateHealthRecommendationsCallable({ prompt, generationConfig });
      // The Cloud Function will return the parsed JSON in result.data
      return result.data;
    } catch (error) {
      console.error("Error calling Firebase Cloud Function for recommendations:", error);
      // Provide user-friendly error messages
      return {
        dietaryRecommendations: "Error generating recommendations. Please try again later.",
        exerciseRecommendations: "",
        stressManagementTechniques: "",
        healthAlerts: `Error checking for alerts: ${error.message}`
      };
    }
  }
};

export default geminiService;