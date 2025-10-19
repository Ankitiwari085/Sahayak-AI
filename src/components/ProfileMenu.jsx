import React from 'react';
import { FaUser, FaClipboardList, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function ProfileMenu({ onProfile, onApplications, onNotifications, onSettings, onSignOut }) {
  return (
    <div className="w-56 bg-white dark:bg-slate-800 rounded-md shadow-lg p-2 border border-gray-200 dark:border-slate-700">
      <button onClick={onProfile} className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-900 dark:text-gray-200">
        <FaUser /> Profile
      </button>
      <button onClick={onApplications} className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-900 dark:text-gray-200">
        <FaClipboardList /> Application Status
      </button>
      <button onClick={onNotifications} className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-900 dark:text-gray-200">
        <FaBell /> Notifications
      </button>
      <button onClick={onSettings} className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-900 dark:text-gray-200">
        <FaCog /> Settings
      </button>
      <hr className="my-2 border-gray-200 dark:border-slate-700" />
      <button onClick={onSignOut} className="flex items-center gap-2 w-full px-3 py-2 rounded text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
        <FaSignOutAlt /> Sign out
      </button>
    </div>
  )
}
