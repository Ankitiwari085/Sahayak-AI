import React from 'react';
import { FaUser, FaClipboardList, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function ProfileMenu({ onProfile, onApplications, onNotifications, onSettings, onSignOut }) {
  return (
    <div className="w-56 bg-white rounded-md shadow-lg p-2">
      <button onClick={onProfile} className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-gray-100"><FaUser /> Profile</button>
      <button onClick={onApplications} className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-gray-100"><FaClipboardList /> Application Status</button>
      <button onClick={onNotifications} className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-gray-100"><FaBell /> Notifications</button>
      <button onClick={onSettings} className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-gray-100"><FaCog /> Settings</button>
      <hr className="my-2" />
      <button onClick={onSignOut} className="flex items-center gap-2 w-full px-3 py-2 rounded text-red-600 hover:bg-red-50"><FaSignOutAlt /> Sign out</button>
    </div>
  )
}
