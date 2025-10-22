import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, CheckCircle, TrendingUp, Clock, Award, Briefcase, UserCheck } from "lucide-react";
import { FaHandshake, FaUserTie, FaBriefcase, FaChartLine, FaStar, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../router";

export default function IndividualHome() {
  const navigate = useNavigate();
  const { user, openAuth } = useContext(AuthContext);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const htmlTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setTheme(htmlTheme);
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: Users,
      title: "Access Skilled Workers",
      description: "Connect with verified blue-collar professionals ready to work",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Post jobs and receive applications within hours, not days",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      title: "Quality Candidates",
      description: "AI-matched candidates with the right skills for your needs",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const features = [
    {
      icon: FaBriefcase,
      title: "Easy Job Posting",
      description: "Create detailed job listings in minutes with our simple form",
    },
    {
      icon: Search,
      title: "Smart Filtering",
      description: "Filter candidates by skills, experience, and location",
    },
    {
      icon: UserCheck,
      title: "Direct Contact",
      description: "Connect directly with applicants through our platform",
    },
    {
      icon: FaChartLine,
      title: "Track Applications",
      description: "Monitor all applications and hiring progress in one dashboard",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description: "Sign up as an individual employer in seconds",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    },
    {
      number: "02",
      title: "Post Your Job",
      description: "Describe the role, skills needed, and compensation details",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    },
    {
      number: "03",
      title: "Review Applicants",
      description: "Browse qualified candidates and their profiles",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop",
    },
    {
      number: "04",
      title: "Hire the Best",
      description: "Contact your chosen candidate and complete the hire",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop",
    },
  ];

  return (
    <div className={`flex flex-col min-h-screen transition-colors ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32 mt-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`inline-block px-4 py-2 rounded-full mb-4 ${theme === 'dark' ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-100'}`}>
              <span className={`font-semibold text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>For Individual Employers</span>
            </div>
            
            <h1 className={`text-5xl lg:text-6xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6 leading-tight`}>
              Hire Skilled Workers{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Effortlessly
              </span>
            </h1>
            
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-8 leading-relaxed`}>
              Connect with qualified blue-collar professionals for your home projects, repairs, or small business needs. 
              Simple, fast, and reliable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (!user) {
                    openAuth();
                  } else {
                    navigate("/employer-dashboard");
                  }
                }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center"
              >
                <Briefcase className="w-5 h-5 mr-2" />
                Post a Job Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all flex items-center justify-center"
              >
                Learn More
              </motion.button>
            </div>

            {/* Trust Indicators */}
            <div className={`flex items-center gap-8 pt-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'}`}>
                  <CheckCircle className={`w-6 h-6 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <div>
                  <p className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Verified Workers</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>All profiles checked</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                  <FaShieldAlt className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <p className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Secure Platform</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Your data protected</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop"
                alt="Professional hiring"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className={`absolute bottom-6 left-6 right-6 ${theme === 'dark' ? 'bg-slate-800/95' : 'bg-white/95'} backdrop-blur-sm rounded-2xl p-6 shadow-xl`}
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>5K+</p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Workers</p>
                  </div>
                  <div>
                    <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>98%</p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Success Rate</p>
                  </div>
                  <div>
                    <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>24h</p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Avg. Response</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`container mx-auto px-4 py-20 rounded-3xl shadow-xl my-12 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
            Why Hire Through{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SahayakAI?
            </span>
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            We make hiring simple, fast, and effective for individual employers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className={`relative rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border ${theme === 'dark' ? 'bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600' : 'bg-gradient-to-br from-gray-50 to-white border-gray-100'}`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3`}>{benefit.title}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
            How It <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Four simple steps to finding and hiring the perfect worker
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
              <div className="relative h-56 overflow-hidden">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-3xl font-bold text-white">{step.number}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3`}>{step.title}</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl shadow-2xl my-12 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Platform Features</h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Everything you need to manage your hiring process effectively
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`backdrop-blur-sm rounded-xl p-6 transition-all border ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-white/10 hover:bg-white/20 border-white/20'}`}
              >
                <Icon className="w-10 h-10 text-white mb-4" />
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-blue-100 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Ready to Find Your Perfect Worker?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied employers who found skilled professionals through our platform
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!user) {
                  openAuth();
                } else {
                  navigate("/employer-dashboard");
                }
              }}
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transition-all inline-flex items-center"
            >
              Get Started Now
              <Briefcase className="ml-3 w-6 h-6" />
            </motion.button>
            
            <p className="mt-6 text-gray-400 text-sm">No credit card required • Free to post jobs</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
