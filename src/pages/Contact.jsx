import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock } from 'react-icons/fi';
import { FaLinkedin, FaGithub, FaTwitter, FaFacebook } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdEmail, MdPhone, MdAccessTime } from 'react-icons/md';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [emailError, setEmailError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const formRef = useRef();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData({ ...formData, email });
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const contactCards = [
    {
      icon: MdEmail,
      title: "Email Us",
      info: "support@sahayakai.com",
      subInfo: "We'll respond within 24 hours",
      color: "blue",
      link: "mailto:support@sahayakai.com"
    },
    {
      icon: MdPhone,
      title: "Call Us",
      info: "+91 98765 43210",
      subInfo: "Mon-Fri, 9 AM - 6 PM IST",
      color: "green",
      link: "tel:+919876543210"
    },
    {
      icon: HiOutlineLocationMarker,
      title: "Visit Office",
      info: "123 Innovation Hub, Tech Park",
      subInfo: "Bengaluru, Karnataka, India",
      color: "purple",
      link: "#"
    },
    {
      icon: MdAccessTime,
      title: "Business Hours",
      info: "Monday - Friday",
      subInfo: "9:00 AM - 6:00 PM IST",
      color: "orange",
      link: "#"
    }
  ];

  const socialLinks = [
    { icon: FaLinkedin, name: "LinkedIn", url: "#", color: "from-blue-600 to-blue-700" },
    { icon: FaGithub, name: "GitHub", url: "#", color: "from-gray-700 to-gray-900" },
    { icon: FaTwitter, name: "Twitter", url: "#", color: "from-sky-500 to-sky-600" },
    { icon: FaFacebook, name: "Facebook", url: "#", color: "from-blue-500 to-blue-600" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email before submission
    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    // EmailJS configuration
    // Replace these with your actual EmailJS credentials
    const serviceID = 'YOUR_SERVICE_ID';  // Get from EmailJS dashboard
    const templateID = 'YOUR_TEMPLATE_ID'; // Get from EmailJS dashboard
    const publicKey = 'YOUR_PUBLIC_KEY';   // Get from EmailJS dashboard

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'your-email@example.com', // Replace with YOUR email address
    };

    // Send email using EmailJS
    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then(
        (response) => {
          console.log('Email sent successfully!', response.status, response.text);
          setSubmitSuccess(true);
          setIsSubmitting(false);
          
          // Reset form after 3 seconds
          setTimeout(() => {
            setFormData({ name: '', email: '', message: '' });
            setSubmitSuccess(false);
          }, 3000);
        },
        (error) => {
          console.error('Failed to send email:', error);
          setSubmitError('Failed to send message. Please try again or contact us directly.');
          setIsSubmitting(false);
        }
      );
  };

  const faqData = [
    {
      question: "How do I create a resume using SahayakAI?",
      answer: "Simply sign up, choose between voice or chat input, share your work experience and skills, select a template, and download your professional resume instantly."
    },
    {
      question: "Is SahayakAI really free to use?",
      answer: "Yes! Our core resume building service is completely free. You can create and download professional resumes without any hidden charges."
    },
    {
      question: "Can I use voice input in my regional language?",
      answer: "Yes, our AI supports multiple languages. You can use voice input in your preferred language, and we'll help you create a professional resume."
    },
    {
      question: "How long does it take to create a resume?",
      answer: "Most users complete their resume in 5-10 minutes. Our AI-powered system makes the process quick and easy."
    },
    {
      question: "Can I edit my resume after creating it?",
      answer: "Absolutely! You can log in anytime to edit, update, or create new versions of your resume."
    },
    {
      question: "What format will my resume be in?",
      answer: "Your resume will be available as a professional PDF file, ready to send to employers or upload to job portals."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="container mx-auto px-4 py-16 md:py-20"
      >
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto shadow-xl">
              💬
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-blue-500 mb-6"
          >
            Get In <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-800 dark:text-black-300 leading-relaxed font-medium"
          >
            Have questions, feedback, or need support? We're here to help! 
            Reach out to us through any of the channels below and our team will get back to you as soon as possible.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Cards Grid */}
      <section className="container mx-auto px-4 pb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {contactCards.map((card, index) => {
            const colorClasses = {
              blue: "from-blue-500 to-blue-600",
              green: "from-green-500 to-green-600",
              purple: "from-purple-500 to-purple-600",
              orange: "from-orange-500 to-orange-600"
            };

            return (
              <motion.a
                key={index}
                href={card.link}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer overflow-hidden"
              >
                <div 
                  className="absolute inset-0 border-2 rounded-2xl pointer-events-none dark:border-slate-700"
                  style={{
                    borderColor: card.color === 'blue' ? '#bfdbfe' : 
                                card.color === 'green' ? '#bbf7d0' : 
                                card.color === 'purple' ? '#e9d5ff' : '#fed7aa'
                  }}
                ></div>
                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                  card.color === 'blue' ? 'from-blue-50 to-cyan-50' :
                  card.color === 'green' ? 'from-green-50 to-emerald-50' :
                  card.color === 'purple' ? 'from-purple-50 to-pink-50' :
                  'from-orange-50 to-amber-50'
                } dark:from-transparent dark:to-transparent`}></div>
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[card.color]} rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <card.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-900 dark:text-gray-200 font-semibold mb-1">
                    {card.info}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {card.subInfo}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </section>

      {/* Main Contact Section */}
      <section className="flex flex-col bg-gray-50 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            {/* Contact Form - Centered */}
            <motion.div variants={fadeInUp} className="mb-10">
              <div className="relative bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-700 dark:to-slate-600 dark:bg-gradient-to-br p-10 md:p-12 rounded-3xl shadow-2xl border-2 border-blue-200 dark:border-slate-600 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-transparent dark:to-transparent rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-100 to-pink-100 dark:from-transparent dark:to-transparent rounded-full blur-3xl opacity-60"></div>
                
                <div className="relative">
                  {/* Form Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="inline-block mb-4"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                        <FiMail />
                      </div>
                    </motion.div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                      Send Us a Message
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                      Fill out the form below and we'll get back to you within 24 hours
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6 relative max-w-3xl mx-auto">
                    {/* Name and Email Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative group"
                      >
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-5 py-4 rounded-xl border-2 border-blue-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/30 outline-none transition-all duration-300 font-medium shadow-sm group-hover:border-blue-300"
                            required
                          />
                        </div>
                      </motion.div>

                      <div className="relative group">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleEmailChange}
                            className={`w-full px-5 py-4 rounded-xl border-2 ${emailError ? 'border-red-500' : 'border-blue-200'} dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/30 outline-none transition-all duration-300 font-medium shadow-sm group-hover:border-blue-300`}
                            required
                          />
                          {emailError && (
                            <p className="text-red-500 text-xs mt-1 font-semibold">{emailError}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Message Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative group"
                    >
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Your Message *
                      </label>
                      <div className="relative">
                        <textarea
                          placeholder="Tell us how we can help you..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={7}
                          className="w-full px-5 py-4 rounded-xl border-2 border-blue-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/30 outline-none transition-all duration-300 font-medium resize-none shadow-sm group-hover:border-blue-300"
                          required
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-gray-500 font-medium">
                          {formData.message.length} characters
                        </div>
                      </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {submitSuccess && (
                        <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 border-2 border-green-500 rounded-xl text-green-800 dark:text-green-200 font-semibold text-center">
                          ✓ Message sent successfully! We'll get back to you soon.
                        </div>
                      )}
                      {submitError && (
                        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 border-2 border-red-500 rounded-xl text-red-800 dark:text-red-200 font-semibold text-center">
                          ✕ {submitError}
                        </div>
                      )}
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!!emailError || submitSuccess || isSubmitting}
                        className={`w-full px-8 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group ${(emailError || submitSuccess || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <FiSend className="text-2xl relative z-10 group-hover:rotate-45 transition-transform duration-300" />
                        <span className="relative z-10">
                          {isSubmitting ? 'Sending...' : submitSuccess ? 'Message Sent!' : 'Send Message'}
                        </span>
                      </motion.button>
                    </motion.div>

                    {/* Response Time Info */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 justify-center font-medium bg-blue-50 dark:bg-slate-800 py-3 px-4 rounded-xl"
                    >
                      <FiClock className="text-blue-600 dark:text-blue-400" />
                      <span>We typically respond within 24 hours</span>
                    </motion.div>
                  </form>
                </div>
              </div>
            </motion.div>

            {/* Social Links and FAQ - Side by Side */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Social Media Links */}
              <motion.div variants={fadeInUp}>
                <div className="relative bg-gradient-to-br from-white to-purple-50/50 dark:from-slate-700 dark:to-slate-600 dark:bg-gradient-to-br p-8 rounded-3xl shadow-xl border-2 border-purple-200 dark:border-slate-600 overflow-hidden h-full">
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-100 to-pink-100 dark:from-transparent dark:to-transparent rounded-full blur-3xl opacity-60"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                        🌐
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Connect With Us
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 font-medium">
                      Follow us on social media for updates, tips, and success stories
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 relative">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.08, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`bg-gradient-to-br ${social.color} p-4 rounded-xl flex items-center gap-3 text-white shadow-lg hover:shadow-2xl transition-all duration-300`}
                      >
                        <social.icon className="text-2xl" />
                        <span className="font-semibold">{social.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* FAQ Quick Link */}
              <motion.div variants={fadeInUp}>
                <div className="relative bg-gradient-to-br from-white to-amber-50/50 dark:bg-slate-800 p-8 rounded-3xl shadow-xl border-2 border-orange-200 dark:border-slate-600 overflow-hidden h-full flex flex-col justify-center">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 dark:bg-transparent rounded-full blur-2xl opacity-50"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                        ❓
                      </div>
                      <h4 className="text-2xl font-bold !text-black dark:!text-black">
                        Need Quick Answers?
                      </h4>
                    </div>
                    <p className="text-black-700 dark:text-black-300 mb-6 font-medium text-lg">
                      Check out our FAQ section for instant solutions to common questions and get immediate help.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowFaq(!showFaq)}
                      className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {showFaq ? 'Hide FAQ ✕' : 'View FAQ →'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Why Contact Us Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mt-8"
            >
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="inline-block mb-4"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                    ⭐
                  </div>
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-blue-500 mb-4">
                  Why <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Contact Us?</span>
                </h2>
                <p className="text-gray-700 dark:text-black-300 text-lg max-w-2xl mx-auto font-medium">
                  We're committed to providing exceptional support and assistance to help you succeed
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: "⚡",
                    title: "Fast Response",
                    description: "Get replies within 24 hours on all your queries",
                    gradient: "from-yellow-500 to-orange-500",
                    borderColor: "border-yellow-200",
                    bgGradient: "from-yellow-50 to-orange-50"
                  },
                  {
                    icon: "🎯",
                    title: "Expert Support",
                    description: "Our team of professionals is here to assist you",
                    gradient: "from-blue-500 to-cyan-500",
                    borderColor: "border-blue-200",
                    bgGradient: "from-blue-50 to-cyan-50"
                  },
                  {
                    icon: "🔒",
                    title: "Secure & Private",
                    description: "Your information is completely safe with us",
                    gradient: "from-green-500 to-emerald-500",
                    borderColor: "border-green-200",
                    bgGradient: "from-green-50 to-emerald-50"
                  },
                  {
                    icon: "💬",
                    title: "24/7 Available",
                    description: "Reach out anytime through multiple channels",
                    gradient: "from-purple-500 to-pink-500",
                    borderColor: "border-purple-200",
                    bgGradient: "from-purple-50 to-pink-50"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    className={`relative bg-gradient-to-br from-white to-gray-50 dark:from-slate-700 dark:to-slate-600 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${feature.borderColor} dark:border-slate-600 group cursor-pointer overflow-hidden`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} dark:from-transparent dark:to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    <div className="relative">
                      <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 font-medium">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      {showFaq && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-block mb-4"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                    ❓
                  </div>
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  Find answers to common questions about our services
                </p>
              </div>

              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200 dark:border-slate-600"
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <span className="font-bold text-gray-900 dark:text-white text-lg pr-4">
                        {faq.question}
                      </span>
                      <motion.span
                        animate={{ rotate: activeFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-2xl text-blue-600 dark:text-blue-400 flex-shrink-0"
                      >
                        ▼
                      </motion.span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: activeFaq === index ? 'auto' : 0,
                        opacity: activeFaq === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFaq(false)}
                  className="px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Close FAQ ✕
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Map Section (Optional) */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-3xl overflow-hidden shadow-2xl border-2 border-blue-200 dark:border-slate-600"
          >
            <div className="text-center py-8 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="flex items-center justify-center gap-3 mb-2">
                <HiOutlineLocationMarker className="text-4xl text-white" />
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Visit Our Office
                </h3>
              </div>
              <p className="text-white/90 font-medium text-lg">
                123 Innovation Hub, Tech Park, Bhubaneswar, Odisha
              </p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119680.67267793466!2d85.73882474218752!3d20.29570379999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33fa8!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              title="Bhubaneswar Office Location"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
