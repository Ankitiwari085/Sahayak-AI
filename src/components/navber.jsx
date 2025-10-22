import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from 'react-icons/fa';
import ProfileMenu from './ProfileMenu';
import { FiSun, FiMoon } from 'react-icons/fi';
import logo from '../assets/helmet.png';

export default function Navbar({ onAuthClick, user, onApplyClick, onPostJobClick, onProfileAction }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuOpenProfile, setMenuOpenProfile] = useState(false);
  const profileRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
      return 'light';
    } catch (e) {
      return 'light';
    }
  });

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setMenuOpen(false);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setMenuOpenProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    try { localStorage.setItem('theme', theme) } catch (e) {}
  }, [theme]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 shadow-md border-b border-gray-200 backdrop-blur-sm">
      <div className="flex justify-between items-center h-16 px-4 md:px-8">
        {/* Left side - Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-16 h-16 rounded-md overflow-hidden flex items-center justify-center">
               <img src={logo} alt="logo" className="w-full h-full object-cover" />
          </div>

          <Link to="/" className="text-xl font-semibold text-gray-800">SahayakAI</Link>
        </div>

        {/* Right side - Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 text-gray-700 font-medium">
          <button onClick={() => scrollToSection('services')} className="hover:text-blue-600 cursor-pointer">Services</button>
          <button onClick={() => scrollToSection('about')} className="hover:text-blue-600 cursor-pointer">About</button>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          <div className="flex items-center space-x-2">
            {/* theme toggle */}
            <div>
              <button
                onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
                title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
                className={`p-2 rounded hover:bg-gray-100`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FiSun className="text-yellow-500 w-5 h-5" /> : <FiMoon className="text-gray-600 w-5 h-5" />}
              </button>
            </div>

            {!user ? (
              <button onClick={() => onAuthClick && onAuthClick()} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Login</button>
            ) : (
              <>
                {user.userType === 'employee' ? (
                  <button onClick={() => onApplyClick && onApplyClick()} className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700">Apply Job</button>
                ) : (
                  <button onClick={() => onPostJobClick && onPostJobClick()} className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700">Post Job</button>
                )}
                <div className="relative" ref={profileRef}>
                  <button onClick={() => setMenuOpenProfile(!menuOpenProfile)} className="text-2xl text-gray-700"><FaUserCircle /></button>
                  {menuOpenProfile && (
                    <div className="absolute right-0 mt-2">
                      <ProfileMenu
                        onProfile={() => { onProfileAction('profile'); setMenuOpenProfile(false); }}
                        onApplications={() => { onProfileAction('applications'); setMenuOpenProfile(false); }}
                        onNotifications={() => { onProfileAction('notifications'); setMenuOpenProfile(false); }}
                        onSettings={() => { onProfileAction('settings'); setMenuOpenProfile(false); }}
                        onSignOut={() => { onProfileAction('signout'); setMenuOpenProfile(false); }}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
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
            <li><Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium hover:text-blue-600">Home</Link></li>
            <li><button onClick={() => scrollToSection('services')} className="text-gray-700 font-medium hover:text-blue-600 w-full text-left">Services</button></li>
            <li><button onClick={() => scrollToSection('about')} className="text-gray-700 font-medium hover:text-blue-600 w-full text-left">About</button></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium hover:text-blue-600">Contact</Link></li>
            <li>
              <div className="flex items-center space-x-2">
                <div>
                  <button
                    onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
                    title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
                    className={`p-2 rounded hover:bg-gray-100`}
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? <FiSun className="text-yellow-500 w-5 h-5" /> : <FiMoon className="text-gray-600 w-5 h-5" />}
                  </button>
                </div>
                {!user ? (
                  <button onClick={() => onAuthClick && onAuthClick()} className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Login</button>
                ) : (
                  <>
                    {user.userType === 'employee' ? (
                      <button onClick={() => onApplyClick && onApplyClick()} className="w-full px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700">Apply Job</button>
                    ) : (
                      <button onClick={() => onPostJobClick && onPostJobClick()} className="w-full px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700">Post Job</button>
                    )}
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
