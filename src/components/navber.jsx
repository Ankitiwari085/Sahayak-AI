import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from 'react-icons/fa';
import ProfileMenu from './ProfileMenu';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Navbar({ onAuthClick, user, onApplyClick, onProfileAction }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuOpenProfile, setMenuOpenProfile] = useState(false);
  const profileRef = useRef();
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'light' } catch(e){ return 'light' }
  });

  useEffect(()=>{
    if(theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    try{ localStorage.setItem('theme', theme) }catch(e){}
  },[theme]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b">
      <div className="flex justify-between items-center h-16 px-4 md:px-8">
        {/* Left side - Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold">
            📄
          </div>
          <Link to="/" className="text-xl font-semibold text-gray-800">ResumeAI</Link>
        </div>

        {/* Right side - Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
          {!user ? (
            <div className="flex items-center space-x-3">
              <button onClick={() => setTheme(theme==='light'?'dark':'light')} className="p-2 rounded hover:bg-gray-100">
                {theme === 'light' ? <FiMoon /> : <FiSun />}
              </button>
              <button onClick={() => onAuthClick && onAuthClick()} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Login</button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button onClick={() => onApplyClick && onApplyClick()} className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700">Apply</button>
              <div className="relative" ref={profileRef}>
                <button onClick={() => setMenuOpenProfile(!menuOpenProfile)} className="text-2xl text-gray-700"><FaUserCircle /></button>
                {menuOpenProfile && (
                  <div className="absolute right-0 mt-2">
                    <ProfileMenu onProfile={()=>onProfileAction('profile')} onApplications={()=>onProfileAction('applications')} onNotifications={()=>onProfileAction('notifications')} onSettings={()=>onProfileAction('settings')} onSignOut={()=>onProfileAction('signout')} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {menuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          <ul className="flex flex-col space-y-4 px-4 py-4">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                Contact
              </Link>
            </li>
            <li>
              <button onClick={() => onAuthClick && onAuthClick()} className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">
                Login
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
