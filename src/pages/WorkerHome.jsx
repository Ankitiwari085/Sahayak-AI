import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, MessageCircle, ArrowRight, CheckCircle, Users, Briefcase, FileText } from "lucide-react";
import { FaUserCog, FaFileAlt, FaRocket, FaClipboardList, FaCheckCircle, FaDownload, FaPaperPlane } from "react-icons/fa";
import resumeImg from "../assets/resume.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../router";
import VoiceResumeModal from "../components/VoiceResumeModal";

export default function WorkerHome() {
  const navigate = useNavigate();
  const { user, openAuth } = useContext(AuthContext);
  const [activeStep, setActiveStep] = useState(null);
  const [theme, setTheme] = useState('light');
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  useEffect(() => {
    const htmlTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setTheme(htmlTheme);
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const journeySteps = [
    {
      id: 1,
      title: "Sign Up / Login",
      description: "Create your account in seconds",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      hoverShadow: "hover:shadow-blue-200",
    },
    {
      id: 2,
      title: "Share Your Story",
      description: "Use voice or chat to tell us about your experience",
      icon: Mic,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      hoverShadow: "hover:shadow-purple-200",
    },
    {
      id: 3,
      title: "AI Creates Resume",
      description: "Our AI builds a professional resume for you",
      icon: FileText,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      hoverShadow: "hover:shadow-green-200",
    },
    {
      id: 4,
      title: "Download Resume",
      description: "Get your polished resume as PDF",
      icon: FaDownload,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      hoverShadow: "hover:shadow-orange-200",
    },
    {
      id: 5,
      title: "Apply for Jobs",
      description: "Submit applications to employers directly",
      icon: Briefcase,
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      hoverShadow: "hover:shadow-indigo-200",
    },
    {
      id: 6,
      title: "Get Hired!",
      description: "Track applications and land your dream job",
      icon: FaCheckCircle,
      color: "from-teal-500 to-green-500",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      hoverShadow: "hover:shadow-teal-200",
    },
  ];

  const features = [
    {
      icon: FaUserCog,
      title: "Tailored for You",
      description: "AI builds resumes designed for blue-collar professionals, highlighting real-world experience.",
    },
    {
      icon: FaFileAlt,
      title: "Professional Templates",
      description: "Choose from beautifully designed templates that make your resume stand out.",
    },
    {
      icon: FaRocket,
      title: "Fast & Easy",
      description: "Create your professional resume in minutes with AI guidance.",
    },
  ];

  return (
    <div className={`flex flex-col min-h-screen transition-colors ${theme === 'dark' ? 'bg-gradient-to-b from-slate-900 to-slate-800' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      {/* Hero Section */}
      <main className="flex-grow flex flex-col lg:flex-row justify-between items-center px-8 lg:px-24 py-24 mt-8">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-5xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4 leading-tight`}>
              Build Your Resume <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                with AI
              </span>
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4 font-semibold`}>Simple, Fast, and Free</p>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-10`}>
              Empowering skilled workers to create professional resumes using voice or chat.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (!user) {
                    openAuth();
                  } else {
                    setShowVoiceModal(true);
                  }
                }}
                className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all shadow-lg"
              >
                <Mic className="w-5 h-5 mr-2" />
                Start with Voice
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (!user) {
                    openAuth();
                  } else {
                    navigate("/chat");
                  }
                }}
                className="flex items-center justify-center px-6 py-4 border-2 border-blue-500 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start with Chat
              </motion.button>
            </div>

            {/* Voice Resume Modal */}
            <VoiceResumeModal 
              open={showVoiceModal} 
              onClose={() => setShowVoiceModal(false)} 
              user={user}
            />

            <p className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} italic`}>"Your voice, your skills, your future."</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center"
        >
          <img
            src={resumeImg}
            alt="AI Resume Builder"
            className="rounded-2xl shadow-2xl w-full max-w-[650px]"
          />
        </motion.div>
      </main>

      {/* Interactive Journey Flow */}
      <section className={`container mx-auto px-4 py-20 transition-colors ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
            Your Journey to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Success</span>
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Follow this simple path from creating your resume to landing your dream job
          </p>
        </motion.div>

        {/* Train-like Flow - Horizontal on Desktop */}
        <div className="hidden lg:block max-w-7xl mx-auto mb-12">
          <div className="relative">
            {/* Railway Track */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-300 via-purple-300 to-teal-300 transform -translate-y-1/2"></div>
            
            {/* Journey Steps */}
            <div className="grid grid-cols-6 gap-4 relative">
              {journeySteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onHoverStart={() => setActiveStep(step.id)}
                    onHoverEnd={() => setActiveStep(null)}
                    className="flex flex-col items-center cursor-pointer"
                  >
                    {/* Station/Node */}
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl ${step.hoverShadow} transition-all duration-300 mb-4`}
                    >
                      <Icon className="text-white w-10 h-10" />
                      
                      {/* Pulse Animation */}
                      {activeStep === step.id && (
                        <motion.div
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-50`}
                        />
                      )}
                    </motion.div>

                    {/* Info Card */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeStep === step.id ? 1 : 1 }}
                      className={`text-center p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50 border-2 border-slate-600' : `${step.bgColor} border-2 ${step.borderColor}`} transition-all ${
                        activeStep === step.id ? 'shadow-xl scale-105' : 'shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-sm`}>
                          {step.id}
                        </span>
                      </div>
                      <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-sm mb-1`}>{step.title}</h3>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{step.description}</p>
                    </motion.div>

                    {/* Arrow */}
                    {index < journeySteps.length - 1 && (
                      <div className="absolute -right-4 top-12 hidden xl:block">
                        <ArrowRight className="w-6 h-6 text-purple-400" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Vertical Flow */}
        <div className="lg:hidden max-w-md mx-auto">
          <div className="relative">
            {/* Vertical Track */}
            <div className="absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-300 via-purple-300 to-teal-300"></div>
            
            <div className="space-y-8">
              {journeySteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4"
                  >
                    {/* Station */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg flex-shrink-0 z-10`}
                    >
                      <Icon className="text-white w-7 h-7" />
                    </motion.div>

                    {/* Info */}
                    <div className={`flex-1 p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50 border-2 border-slate-600' : `${step.bgColor} border-2 ${step.borderColor}`} shadow-md`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xs`}>
                          {step.id}
                        </span>
                        <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => {
              if (!user) {
                openAuth();
              } else {
                navigate("/chat");
              }
            }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all shadow-xl"
          >
            Start Your Journey Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className={`container mx-auto px-4 py-20 border-t-2 ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} transition-colors`}>
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
            Why Choose Our AI Resume Builder?
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Designed specifically for blue-collar professionals who deserve a great resume
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-2xl p-6 shadow-md border hover:shadow-xl transition-all`}
            >
              <div className={`${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className={`h-6 w-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{feature.title}</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
