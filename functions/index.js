// functions/index.js
const functions = require('firebase-functions');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini API client using the API key stored in Firebase Functions config.
// The key is set via `firebase functions:config:set gemini.key="YOUR_GEMINI_API_KEY"`
const GEMINI_API_KEY = functions.config().gemini.key;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * Firebase Cloud Function to generate health recommendations using the Gemini API.
 * This function acts as a secure proxy, keeping the Gemini API key hidden from the client.
 * It's an HTTPS Callable Function, allowing easy invocation from client-side Firebase SDK.
 */
exports.generateHealthRecommendations = functions.https.onCall(async (data, context) => {
  // Optional: Enforce authentication if only logged-in users should use this function.
  // For this app, anonymous auth is used, so context.auth will be present.
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'The function must be called while authenticated.'
    );
  }

  // Extract prompt and generationConfig from the data sent by the client
  const { prompt, generationConfig } = data;

  if (!prompt || !generationConfig) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with a "prompt" and "generationConfig".'
    );
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Make the actual call to the Gemini API
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: generationConfig,
    });

    // Extract the text content from the Gemini response
    const responseText = result.response.candidates[0].content.parts[0].text;

    // Parse the response text as JSON (as we instructed the LLM to return JSON)
    const parsedJson = JSON.parse(responseText);

    // Return the structured JSON back to the client
    return parsedJson;
  } catch (error) {
    console.error("Error calling Gemini API from Cloud Function:", error);

    // Return a user-friendly error message to the client
    throw new functions.https.HttpsError(
      'internal',
      'Failed to generate recommendations due to an internal server error. Please try again.',
      error.message // Include original error message for debugging
    );
  }
});