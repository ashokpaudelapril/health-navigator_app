// src/components/RecommendationsDisplay.js
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const RecommendationsDisplay = ({ recommendations, isLoading, onGenerate }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Personalized Recommendations</h2>
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      >
        {isLoading ? 'Generating...' : 'Generate New Recommendations'}
      </button>

      {isLoading && <LoadingSpinner />}

      {!isLoading && recommendations && (
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="text-xl font-medium text-gray-800">Dietary Recommendations:</h3>
            <p className="bg-gray-50 p-3 rounded-md text-sm">{recommendations.dietaryRecommendations}</p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-gray-800">Exercise Recommendations:</h3>
            <p className="bg-gray-50 p-3 rounded-md text-sm">{recommendations.exerciseRecommendations}</p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-gray-800">Stress Management Techniques:</h3>
            <p className="bg-gray-50 p-3 rounded-md text-sm">{recommendations.stressManagementTechniques}</p>
          </div>
        </div>
      )}
      {!isLoading && !recommendations && (
        <p className="text-gray-600 text-center">Click "Generate New Recommendations" to get started.</p>
      )}
    </div>
  );
};

export default RecommendationsDisplay;