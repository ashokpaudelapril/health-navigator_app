// src/services/firestoreService.js
import { doc, setDoc, collection, query, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Import initialized db
import { APP_ID, COLLECTIONS } from '../utils/constants'; // Import constants

const firestoreService = {
  /**
   * Fetches user profile data in real-time using onSnapshot.
   * @param {string} userId - The ID of the current user.
   * @param {function} callback - Callback function to update state with profile data.
   * @returns {function} An unsubscribe function to stop listening to updates.
   */
  getUserProfile: (userId, callback) => {
    if (!db || !userId) {
      console.warn("Firestore DB or User ID not available for getUserProfile.");
      return () => {}; // Return a no-op unsubscribe function
    }
    // Path: /artifacts/{APP_ID}/users/{userId}/userProfile/current
    const userProfileRef = doc(db, `artifacts/${APP_ID}/users/${userId}/${COLLECTIONS.USER_PROFILES}`, 'current');
    return onSnapshot(userProfileRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data());
      } else {
        callback({}); // No profile yet, return empty object
      }
    }, (error) => {
      console.error("Error fetching user profile:", error);
      callback({}); // Return empty on error
    });
  },

  /**
   * Updates user profile data in Firestore.
   * @param {string} userId - The ID of the current user.
   * @param {object} profileData - The data to update in the user profile.
   */
  updateUserProfile: async (userId, profileData) => {
    if (!db || !userId) {
      console.error("Firestore DB or User ID not available for updateUserProfile.");
      throw new Error("Firestore not ready.");
    }
    const userProfileRef = doc(db, `artifacts/${APP_ID}/users/${userId}/${COLLECTIONS.USER_PROFILES}`, 'current');
    try {
      await setDoc(userProfileRef, profileData, { merge: true });
      console.log("User profile updated successfully!");
    } catch (e) {
      console.error("Error updating user profile: ", e);
      throw e;
    }
  },

  /**
   * Adds a new health log entry to Firestore.
   * @param {string} userId - The ID of the current user.
   * @param {object} logData - The health log data to add.
   */
  addHealthLog: async (userId, logData) => {
    if (!db || !userId) {
      console.error("Firestore DB or User ID not available for addHealthLog.");
      throw new Error("Firestore not ready.");
    }
    // Path: /artifacts/{APP_ID}/users/{userId}/healthLogs
    const healthLogsCollectionRef = collection(db, `artifacts/${APP_ID}/users/${userId}/${COLLECTIONS.HEALTH_LOGS}`);
    try {
      // Ensure the date is stored as a proper Firestore Timestamp
      const dataToSave = {
        ...logData,
        date: new Date(logData.date) // Convert string date to Date object
      };
      await addDoc(healthLogsCollectionRef, dataToSave);
      console.log("Health log added successfully!");
    } catch (e) {
      console.error("Error adding health log: ", e);
      throw e;
    }
  },

  /**
   * Fetches health log data in real-time using onSnapshot.
   * @param {string} userId - The ID of the current user.
   * @param {function} callback - Callback function to update state with health logs.
   * @returns {function} An unsubscribe function to stop listening to updates.
   */
  getHealthLogs: (userId, callback) => {
    if (!db || !userId) {
      console.warn("Firestore DB or User ID not available for getHealthLogs.");
      return () => {}; // Return a no-op unsubscribe function
    }
    const healthLogsCollectionRef = collection(db, `artifacts/${APP_ID}/users/${userId}/${COLLECTIONS.HEALTH_LOGS}`);
    // Query without orderBy to avoid index issues, sorting will be done client-side
    const q = query(healthLogsCollectionRef);
    return onSnapshot(q, (snapshot) => {
      const logs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date ? doc.data().date.toDate() : null // Convert Firestore Timestamp to Date object
      }));
      // Sort logs by date in descending order (latest first) for display
      logs.sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0));
      callback(logs);
    }, (error) => {
      console.error("Error fetching health logs:", error);
      callback([]); // Return empty on error
    });
  }
};

export default firestoreService;