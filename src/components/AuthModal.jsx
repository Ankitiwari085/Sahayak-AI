import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaBuilding, FaUserTie, FaUsers } from "react-icons/fa";

export default function AuthModal({ open, onClose, onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [signupType, setSignupType] = useState("employee");
  const [loginType, setLoginType] = useState("employee");
  const [loginData, setLoginData] = useState({ identifier: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', identifier: '', password: '', organization: '' });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);

  if (!open) return null;

  const stopProp = (e) => e.stopPropagation();

  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.identifier.trim()) {
      newErrors.identifier = loginType === 'organisation' || loginType === 'individual' ? 'Email is required' : 'Phone number is required';
    } else if (loginType === 'organisation' || loginType === 'individual') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(loginData.identifier)) {
        newErrors.identifier = 'Please enter a valid email';
      }
    } else {
      const phoneRegex = /^[+]?[0-9]{10,15}$/;
      if (!phoneRegex.test(loginData.identifier.replace(/\s/g, ''))) {
        newErrors.identifier = 'Please enter a valid phone number';
      }
    }
    if (!loginData.password.trim()) {
      newErrors.password = 'Password/OTP is required';
    }
    return newErrors;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!signupData.name.trim()) {
      newErrors.name = signupType === 'organisation' ? 'Organization name is required' : 'Full name is required';
    }
    if (!signupData.identifier.trim()) {
      newErrors.identifier = signupType === 'organisation' ? 'Email is required' : 'Phone number is required';
    } else if (signupType === 'organisation') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(signupData.identifier)) {
        newErrors.identifier = 'Please enter a valid email';
      }
    } else {
      const phoneRegex = /^[+]?[0-9]{10,15}$/;
      if (!phoneRegex.test(signupData.identifier.replace(/\s/g, ''))) {
        newErrors.identifier = 'Please enter a valid phone number';
      }
    }
    if (!signupData.password.trim()) {
      newErrors.password = 'Password/OTP is required';
    } else if (signupData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    return newErrors;
  };

  const handleSendOtp = () => {
    const newErrors = {};
    if (!loginData.identifier.trim()) {
      newErrors.identifier = 'Phone number is required';
    } else {
      const phoneRegex = /^[+]?[0-9]{10,15}$/;
      if (!phoneRegex.test(loginData.identifier.replace(/\s/g, ''))) {
        newErrors.identifier = 'Please enter a valid phone number';
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setOtpSent(true);
    // Here you would typically call your OTP sending API
    console.log('Sending OTP to:', loginData.identifier);
  };

  const handleLogin = () => {
    const validationErrors = validateLogin();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onLogin && onLogin({ 
      name: loginType === 'organisation' ? 'Sample Organization' : loginType === 'individual' ? 'Individual Employer' : 'Worker User', 
      phone: loginData.identifier,
      email: loginData.identifier,
      userType: loginType 
    }); 
    setLoginData({ identifier: '', password: '' });
    setOtpSent(false);
    onClose();
  };

  const handleSignup = () => {
    const validationErrors = validateSignup();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onLogin && onLogin({ 
      name: signupData.name, 
      phone: signupData.identifier,
      email: signupData.identifier,
      userType: signupType 
    }); 
    setSignupData({ name: '', identifier: '', password: '', organization: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center min-h-screen px-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className="relative w-full max-w-md"
            onClick={stopProp}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute -top-4 -right-4 z-10 bg-white rounded-full p-3 shadow-lg border-2 border-gray-200 text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Card Container */}
            <div className="relative bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-2xl overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
              </div>

              {/* Content */}
              <div className="relative p-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg"
                  >
                    {isSignup ? (
                      <FaUserTie className="text-white text-2xl" />
                    ) : (
                      <FaUser className="text-white text-2xl" />
                    )}
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
                  >
                    {isSignup ? "Create Account" : "Welcome Back"}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600"
                  >
                    {isSignup ? "Sign up to get started" : "Log in to continue"}
                  </motion.p>
                </div>

                {/* User Type Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6"
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {isSignup ? "Sign up as" : "Login as"}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'employee', label: 'Worker', icon: FaUsers },
                      { value: 'individual', label: 'Individual', icon: FaUserTie },
                      { value: 'organisation', label: 'Org', icon: FaBuilding }
                    ].map((type) => {
                      const isActive = isSignup ? signupType === type.value : loginType === type.value;
                      const Icon = type.icon;
                      return (
                        <motion.button
                          key={type.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => isSignup ? setSignupType(type.value) : setLoginType(type.value)}
                          className={`relative px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                              : 'bg-white/50 border border-gray-300 text-gray-700 hover:border-blue-400'
                          }`}
                        >
                          <Icon className={`inline-block mr-1 text-sm ${isActive ? 'text-white' : 'text-gray-600'}`} />
                          {type.label}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Form Fields */}
                <AnimatePresence mode="wait">
                  {!isSignup ? (
                    // Login Form
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {(loginType === 'organisation' || loginType === 'individual') ? (
                        <>
                          {/* Email Field */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                              <FaEnvelope className="text-blue-600" />
                              Email Address
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                value={loginData.identifier}
                                onChange={(e) => { setLoginData({...loginData, identifier: e.target.value}); setErrors({...errors, identifier: ''}); }}
                                className={`w-full px-4 py-3 bg-white/70 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                  errors.identifier ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                                }`}
                                placeholder="you@company.com"
                              />
                            </div>
                            {errors.identifier && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 text-xs mt-1 flex items-center gap-1"
                              >
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.identifier}
                              </motion.p>
                            )}
                          </div>

                          {/* Password Field */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                              <FaLock className="text-purple-600" />
                              Password
                            </label>
                            <div className="relative">
                              <input
                                type="password"
                                value={loginData.password}
                                onChange={(e) => { setLoginData({...loginData, password: e.target.value}); setErrors({...errors, password: ''}); }}
                                className={`w-full px-4 py-3 bg-white/70 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                                  errors.password ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
                                }`}
                                placeholder="••••••••"
                              />
                            </div>
                            {errors.password && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 text-xs mt-1 flex items-center gap-1"
                              >
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.password}
                              </motion.p>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Phone Field */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                              <FaPhone className="text-green-600" />
                              Phone Number
                            </label>
                            <div className="relative">
                              <input
                                type="tel"
                                value={loginData.identifier}
                                onChange={(e) => { setLoginData({...loginData, identifier: e.target.value}); setErrors({...errors, identifier: ''}); }}
                                className={`w-full px-4 py-3 bg-white/70 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                                  errors.identifier ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                                }`}
                                placeholder="+91 98765 43210"
                                disabled={otpSent}
                              />
                            </div>
                            {errors.identifier && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 text-xs mt-1 flex items-center gap-1"
                              >
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.identifier}
                              </motion.p>
                            )}
                          </div>

                          {/* Send OTP Button */}
                          {!otpSent && (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handleSendOtp}
                              className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                            >
                              Send OTP
                            </motion.button>
                          )}

                          {/* OTP/Password Field - Only show after OTP is sent */}
                          {otpSent && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <FaLock className="text-purple-600" />
                                OTP / Password
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  value={loginData.password}
                                  onChange={(e) => { setLoginData({...loginData, password: e.target.value}); setErrors({...errors, password: ''}); }}
                                  className={`w-full px-4 py-3 bg-white/70 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                                    errors.password ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
                                  }`}
                                  placeholder="Enter OTP or password"
                                />
                              </div>
                              {errors.password && (
                                <motion.p
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                                >
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                  {errors.password}
                                </motion.p>
                              )}
                              <button
                                onClick={() => { setOtpSent(false); setLoginData({...loginData, password: ''}); setErrors({...errors, password: ''}); }}
                                className="text-sm text-blue-600 hover:underline mt-2"
                              >
                                Change phone number?
                              </button>
                            </motion.div>
                          )}
                        </>
                      )}

                      {/* Login Button - Show for non-workers or workers with OTP sent */}
                      {(loginType !== 'employee' || otpSent) && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleLogin}
                          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all mt-6"
                        >
                          Log In
                        </motion.button>
                      )}

                      {/* Switch to Signup */}
                      <div className="text-center text-sm text-gray-600 mt-4">
                        Don't have an account?{' '}
                        <button
                          onClick={() => { setIsSignup(true); setErrors({}); setOtpSent(false); }}
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          Sign up
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    // Signup Form
                    <motion.div
                      key="signup"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 max-h-[400px] overflow-y-auto pr-2"
                    >
                      {signupType === 'organisation' ? (
                        <>
                          {/* Organization Name */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                              <FaBuilding className="text-blue-600" />
                              Organization Name
                            </label>
                            <input
                              type="text"
                              value={signupData.name}
                              onChange={(e) => { setSignupData({...signupData, name: e.target.value}); setErrors({...errors, name: ''}); }}
                              className={`w-full px-4 py-3 bg-white/70 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                              }`}
                              placeholder="Your organization name"
                            />
                            {errors.name && (
                              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                {errors.name}
                              </motion.p>
                            )}
                          </div>

                          {/* Email */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                              <FaEnvelope className="text-green-600" />
                              Email Address
                            </label>
                            <input
                              type="email"
                              value={signupData.identifier}
                              onChange={(e) => { setSignupData({...signupData, identifier: e.target.value}); setErrors({...errors, identifier: ''}); }}
                              className={`w-full px-4 py-3 bg-white/70 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                                errors.identifier ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                              }`}
                              placeholder="contact@company.com"
                            />
                            {errors.identifier && (
                              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                {errors.identifier}
                              </motion.p>
                            )}
                          </div>

                          {/* Password */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                              <FaLock className="text-purple-600" />
                              Password
                            </label>
                            <input
                              type="password"
                              value={signupData.password}
                              onChange={(e) => { setSignupData({...signupData, password: e.target.value}); setErrors({...errors, password: ''}); }}
                              className={`w-full px-4 py-3 bg-white/70 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                                errors.password ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
                              }`}
                              placeholder="Create a strong password"
                            />
                            {errors.password && (
                              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                {errors.password}
                              </motion.p>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Full Name */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                              <FaUser className="text-blue-600" />
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={signupData.name}
                              onChange={(e) => { setSignupData({...signupData, name: e.target.value}); setErrors({...errors, name: ''}); }}
                              className={`w-full px-4 py-3 bg-white/70 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                              }`}
                              placeholder="Your full name"
                            />
                            {errors.name && (
                              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                {errors.name}
                              </motion.p>
                            )}
                          </div>

                          {/* Phone Number */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                              <FaPhone className="text-green-600" />
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={signupData.identifier}
                              onChange={(e) => { setSignupData({...signupData, identifier: e.target.value}); setErrors({...errors, identifier: ''}); }}
                              className={`w-full px-4 py-3 bg-white/70 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                                errors.identifier ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                              }`}
                              placeholder="+91 98765 43210"
                            />
                            {errors.identifier && (
                              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                {errors.identifier}
                              </motion.p>
                            )}
                          </div>

                          {/* Organization (Optional) */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                              <FaBuilding className="text-gray-500" />
                              Organization <span className="text-xs text-gray-500">(Optional)</span>
                            </label>
                            <input
                              type="text"
                              value={signupData.organization}
                              onChange={(e) => setSignupData({...signupData, organization: e.target.value})}
                              className="w-full px-4 py-3 bg-white/70 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all"
                              placeholder="Company or organization name"
                            />
                          </div>

                          {/* OTP/Password */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                              <FaLock className="text-purple-600" />
                              OTP / Password
                            </label>
                            <input
                              type="text"
                              value={signupData.password}
                              onChange={(e) => { setSignupData({...signupData, password: e.target.value}); setErrors({...errors, password: ''}); }}
                              className={`w-full px-4 py-3 bg-white/70 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                                errors.password ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
                              }`}
                              placeholder="Enter OTP or create password"
                            />
                            {errors.password && (
                              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                {errors.password}
                              </motion.p>
                            )}
                          </div>
                        </>
                      )}

                      {/* Signup Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSignup}
                        className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all mt-6"
                      >
                        Sign Up
                      </motion.button>

                      {/* Switch to Login */}
                      <div className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{' '}
                        <button
                          onClick={() => { setIsSignup(false); setErrors({}); }}
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          Log in
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
