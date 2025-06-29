// src/components/ProfileSettings.js
import React, { useState, useEffect } from 'react';

const ProfileSettings = ({ userId, userProfile, updateUserProfile }) => {
  const [goals, setGoals] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [exercisePreferences, setExercisePreferences] = useState('');
  const [geneticPredispositions, setGeneticPredispositions] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (userProfile) {
      setGoals(userProfile.goals || '');
      setDietaryRestrictions(userProfile.dietaryRestrictions || '');
      setExercisePreferences(userProfile.exercisePreferences || '');
      setGeneticPredispositions(userProfile.geneticPredispositions || '');
      setMedicalConditions(userProfile.medicalConditions || '');
    }
  }, [userProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!userId) {
      setMessage('User not authenticated. Please wait.');
      return;
    }

    const profileData = {
      goals,
      dietaryRestrictions,
      exercisePreferences,
      geneticPredispositions,
      medicalConditions
    };

    try {
      await updateUserProfile(userId, profileData);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage(`Error updating profile: ${error.message}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Health Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="goals" className="block text-sm font-medium text-gray-700">Health Goals (e.g., Lose weight, Improve sleep, Reduce stress)</label>
          <textarea
            id="goals"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            rows="2"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            placeholder="What are your main health objectives?"
          ></textarea>
        </div>
        <div>
          <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700">Dietary Restrictions (e.g., Vegetarian, Gluten-free, Allergies)</label>
          <textarea
            id="dietaryRestrictions"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
            rows="2"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            placeholder="Any foods to avoid or specific dietary needs?"
          ></textarea>
        </div>
        <div>
          <label htmlFor="exercisePreferences" className="block text-sm font-medium text-gray-700">Exercise Preferences (e.g., Cardio, Strength training, Yoga)</label>
          <textarea
            id="exercisePreferences"
            value={exercisePreferences}
            onChange={(e) => setExercisePreferences(e.target.value)}
            rows="2"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            placeholder="What kind of exercises do you enjoy or prefer?"
          ></textarea>
        </div>
        <div>
          <label htmlFor="geneticPredispositions" className="block text-sm font-medium text-gray-700">Simulated Genetic Predispositions (e.g., Prone to high blood pressure)</label>
          <textarea
            id="geneticPredispositions"
            value={geneticPredispositions}
            onChange={(e) => setGeneticPredispositions(e.target.value)}
            rows="2"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            placeholder="Simulated: e.g., Family history of diabetes"
          ></textarea>
        </div>
        <div>
          <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-700">Simulated Medical Conditions (e.g., Type 2 Diabetes, Asthma)</label>
          <textarea
            id="medicalConditions"
            value={medicalConditions}
            onChange={(e) => setMedicalConditions(e.target.value)}
            rows="2"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            placeholder="Simulated: e.g., Mild asthma"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Save Profile
        </button>
        {message && <p className="mt-2 text-sm text-center text-gray-600">{message}</p>}
      </form>
    </div>
  );
};

export default ProfileSettings;