// src/components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    <p className="ml-2 text-gray-600">Generating...</p>
  </div>
);

export default LoadingSpinner;