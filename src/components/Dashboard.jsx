// src/components/Dashboard.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = ({ healthLogs }) => {
  // Prepare data for charts - last 30 days
  const chartData = healthLogs.slice(0, 30).map(log => ({
    date: log.date ? log.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A',
    heartRate: log.heartRate,
    sleepHours: log.sleepHours,
    activityMinutes: log.activityMinutes
  })).reverse(); // Reverse to show chronological order

  const latestLog = healthLogs[0] || {};

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Health Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Latest Heart Rate</p>
          <p className="text-3xl font-bold text-blue-700">{latestLog.heartRate || 'N/A'} <span className="text-xl">bpm</span></p>
          <p className="text-xs text-gray-500">on {latestLog.date ? latestLog.date.toLocaleDateString() : 'N/A'}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Latest Sleep</p>
          <p className="text-3xl font-bold text-green-700">{latestLog.sleepHours || 'N/A'} <span className="text-xl">hrs</span></p>
          <p className="text-xs text-gray-500">on {latestLog.date ? latestLog.date.toLocaleDateString() : 'N/A'}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Latest Activity</p>
          <p className="text-3xl font-bold text-purple-700">{latestLog.activityMinutes || 'N/A'} <span className="text-xl">min</span></p>
          <p className="text-xs text-gray-500">on {latestLog.date ? latestLog.date.toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-medium text-gray-700 mb-3">Heart Rate Trend (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="heartRate" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-medium text-gray-700 mb-3">Sleep Hours Trend (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="sleepHours" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;