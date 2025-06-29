// src/components/HealthAlertsDisplay.js
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const HealthAlertsDisplay = ({ alerts, isLoading }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Potential Health Alerts</h2>
      {isLoading && <LoadingSpinner />}
      {!isLoading && alerts && alerts !== "None identified." && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm" role="alert">
          <p className="font-bold">Important:</p>
          <p className="text-sm">{alerts}</p>
          <p className="text-xs mt-2">
            <strong className="font-semibold">Disclaimer:</strong> This is an AI-generated alert based on your provided data and should not replace professional medical advice. Please consult with a healthcare professional for diagnosis and treatment.
          </p>
        </div>
      )}
      {!isLoading && alerts === "None identified." && (
        <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-sm">
          <p className="font-bold">No immediate alerts identified.</p>
          <p className="text-sm">Keep up the good work! Remember to regularly log your data for continuous insights.</p>
        </div>
      )}
      {!isLoading && !alerts && (
        <p className="text-gray-600 text-center">Alerts will appear here after recommendations are generated.</p>
      )}
    </div>
  );
};

export default HealthAlertsDisplay;