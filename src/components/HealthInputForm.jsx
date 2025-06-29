// src/components/HealthInputForm.js
import React, { useState } from 'react';

const HealthInputForm = ({ userId, addHealthLog }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [heartRate, setHeartRate] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [activityMinutes, setActivityMinutes] = useState('');
  const [mood, setMood] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!userId) {
      setMessage('User not authenticated. Please wait.');
      return;
    }

    const logData = {
      date,
      heartRate: heartRate ? parseInt(heartRate) : null,
      sleepHours: sleepHours ? parseFloat(sleepHours) : null,
      activityMinutes: activityMinutes ? parseInt(activityMinutes) : null,
      mood,
      symptoms,
      timestamp: new Date()
    };

    try {
      await addHealthLog(userId, logData);
      setMessage('Health log saved successfully!');
      // Clear form
      setHeartRate('');
      setSleepHours('');
      setActivityMinutes('');
      setMood('');
      setSymptoms('');
    } catch (error) {
      setMessage(`Error saving log: ${error.message}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Log Your Daily Health</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="logDate" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="logDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="heartRate" className="block text-sm font-medium text-gray-700">Heart Rate (bpm)</label>
          <input
            type="number"
            id="heartRate"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            placeholder="e.g., 70"
          />
        </div>
        <div>
          <label htmlFor="sleepHours" className="block text-sm font-medium text-gray-700">Sleep Hours</label>
          <input
            type="number"
            step="0.1"
            id="sleepHours"
            value={sleepHours}
            onChange={(e) => setSleepHours(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            placeholder="e.g., 7.5"
          />
        </div>
        <div>
          <label htmlFor="activityMinutes" className="block text-sm font-medium text-gray-700">Activity Minutes</label>
          <input
            type="number"
            id="activityMinutes"
            value={activityMinutes}
            onChange={(e) => setActivityMinutes(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            placeholder="e.g., 60"
          />
        </div>
        <div>
          <label htmlFor="mood" className="block text-sm font-medium text-gray-700">Mood (e.g., Happy, Stressed, Neutral)</label>
          <input
            type="text"
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            placeholder="e.g., Energetic"
          />
        </div>
        <div>
          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">Symptoms (e.g., Headache, Fatigue)</label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            placeholder="Any new or recurring symptoms?"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Save Health Log
        </button>
        {message && <p className="mt-2 text-sm text-center text-gray-600">{message}</p>}
      </form>
    </div>
  );
};

export default HealthInputForm;