import React, { useState } from "react";

export default function AuthModal({ open, onClose, onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [signupType, setSignupType] = useState("individual");

  if (!open) return null;

  const stopProp = (e) => e.stopPropagation();

  return (
    <div
      className="auth-backdrop fixed inset-0 z-50 flex items-center justify-center min-h-screen px-4"
      onClick={onClose}
    >
      <div
        className={`auth-card relative w-full max-w-md mx-auto max-h-[90vh] overflow-auto perspective flex items-center justify-center`}
        onClick={stopProp}
        style={{ minHeight: 440 }}
      >
        <div className={`auth-inner relative w-full h-full transition-transform duration-700 ${isSignup ? "flipped" : ""}`} style={{ minHeight: 420 }}>
          {/* Front - Login */}
          <div className="auth-face auth-front absolute inset-0 bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome Back</h2>
            <p className="text-sm text-gray-500 mb-6">Log in to continue</p>

            <div className="overflow-y-auto" style={{ maxHeight: 300 }}>
              {signupType === 'organisation' ? (
                <>
                  <label className="block text-sm text-gray-700">Email</label>
                  <input type="email" className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 mb-4 mt-1 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="you@company.com" />

                  <label className="block text-sm text-gray-700">Password</label>
                  <input type="password" className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 mb-6 mt-1 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Your password" />
                </>
              ) : (
                <>
                  <label className="block text-sm text-gray-700">Phone number</label>
                  <input type="tel" className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 mb-4 mt-1 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="+91 98765 43210" />

                  <label className="block text-sm text-gray-700">OTP / Password</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 mb-6 mt-1 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Enter OTP or password" />
                </>
              )}
            </div>

            <button onClick={() => { onLogin && onLogin({ name: 'User', phone: '+919876543210' }); onClose(); }} className="w-full bg-blue-600 text-white py-2 rounded-md font-medium mb-3">Log In</button>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button onClick={() => setIsSignup(true)} className="text-blue-600 font-medium underline ml-1">Sign up</button>
            </div>
          </div>

          {/* Back - Signup */}
          <div className="auth-face auth-back absolute inset-0 bg-white rounded-xl shadow-xl p-8 flex flex-col">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Account</h2>
              <p className="text-sm text-gray-500 mb-6">Sign up to get started</p>

              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-2">Sign up as</label>
                <div className="flex space-x-2">
                  <button onClick={() => setSignupType('individual')} className={`px-3 py-2 rounded-md border ${signupType==='individual'? 'bg-blue-600 text-white' : ''}`}>Individual</button>
                  <button onClick={() => setSignupType('organisation')} className={`px-3 py-2 rounded-md border ${signupType==='organisation'? 'bg-blue-600 text-white' : ''}`}>Organisation</button>
                  <button onClick={() => setSignupType('employee')} className={`px-3 py-2 rounded-md border ${signupType==='employee'? 'bg-blue-600 text-white' : ''}`}>Employee</button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              {signupType === 'organisation' ? (
                <>
                  <label className="block text-sm text-gray-700">Organization name</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 mb-4 mt-1 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" placeholder="Organization name" />

                  <label className="block text-sm text-gray-700">Email</label>
                  <input type="email" className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 mb-4 mt-1 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" placeholder="contact@company.com" />

                  <label className="block text-sm text-gray-700">Password</label>
                  <input type="password" className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 mb-6 mt-1 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" placeholder="Create password" />
                </>
              ) : (
                <>
                  <label className="block text-sm text-gray-700">Full name</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 mb-4 mt-1 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" placeholder="Your name" />

                  <label className="block text-sm text-gray-700">Phone number</label>
                  <input type="tel" className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 mb-4 mt-1 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" placeholder="+91 98765 43210" />

                  <label className="block text-sm text-gray-700">Organization (optional)</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 mb-4 mt-1 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" placeholder="Organization name" />

                  <label className="block text-sm text-gray-700">OTP / Password</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 mb-6 mt-1 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" placeholder="Enter OTP or create a password" />
                </>
              )}
            </div>

            <div>
              <button className="w-full bg-green-600 text-white py-2 rounded-md font-medium mb-3">Sign Up</button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button onClick={() => setIsSignup(false)} className="text-blue-600 font-medium underline ml-1">Log in</button>
              </div>
            </div>
          </div>
        </div>

        <button onClick={onClose} className="absolute -top-3 -right-3 bg-white rounded-full p-3 shadow-md border border-gray-200 text-gray-800 text-lg">✕</button>
      </div>
    </div>
  );
}
