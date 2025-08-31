import React from 'react';
import { NavLink } from 'react-router-dom';

const Slidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-6 h-screen shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-purple-300">Excel Dashboard</h2>

      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-4 py-2 rounded hover:bg-gray-700 transition ${
              isActive ? 'bg-purple-600' : ''
            }`
          }
        >
          🏠 Home
        </NavLink>

        <NavLink
          to="/dashboard/upload"
          className={({ isActive }) =>
            `px-4 py-2 rounded hover:bg-gray-700 transition ${
              isActive ? 'bg-purple-600' : ''
            }`
          }
        >
          📁 Upload
        </NavLink>

        <NavLink
          to="/dashboard/charts"
          className={({ isActive }) =>
            `px-4 py-2 rounded hover:bg-gray-700 transition ${
              isActive ? 'bg-purple-600' : ''
            }`
          }
        >
          📈 Charts
        </NavLink>

        <NavLink
          to="/dashboard/history"
          className={({ isActive }) =>
            `px-4 py-2 rounded hover:bg-gray-700 transition ${
              isActive ? 'bg-purple-600' : ''
            }`
          }
        >
          🕒 History
        </NavLink>

        <NavLink
          to="/dashboard/admin"
          className={({ isActive }) =>
            `px-4 py-2 rounded hover:bg-gray-700 transition ${
              isActive ? 'bg-purple-600' : ''
            }`
          }
        >
          👤 Admin
        </NavLink>
      </nav>
    </div>
  );
};

export default Slidebar;