import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Users, TrendingUp, Clock, Shield, BarChart3, UserPlus, FileCheck, Target, Zap } from "lucide-react";
import { FaBuilding, FaChartLine, FaUsersCog, FaRocket, FaCheckCircle, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../router";

export default function OrganizationHome() {
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

  const solutions = [
    {
      icon: Users,
      title: "Bulk Hiring Solutions",
      description: "Hire multiple workers simultaneously for large projects or ongoing operations",
      color: "from-blue-600 to-cyan-600",
      features: ["Multiple job posts", "Bulk applicant review", "Team management"],
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track hiring metrics, application rates, and workforce planning data",
      color: "from-purple-600 to-pink-600",
      features: ["Real-time analytics", "Performance reports", "ROI tracking"],
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security for your company data and applicant information",
      color: "from-green-600 to-emerald-600",
      features: ["Data encryption", "Compliance ready", "Access controls"],
    },
  ];

  const advantages = [
    {
      icon: Clock,
      title: "Save 70% Time",
      description: "Reduce time-to-hire from weeks to days with AI-powered matching",
      stat: "70%",
      color: "text-blue-600",
    },
    {
      icon: TrendingUp,
      title: "Better Quality",
      description: "Access pre-screened, verified blue-collar professionals",
      stat: "95%",
      color: "text-green-600",
    },
    {
      icon: Target,
      title: "Cost Efficient",
      description: "Lower recruitment costs compared to traditional hiring methods",
      stat: "50%",
      color: "text-purple-600",
    },
    {
      icon: Zap,
      title: "Fast Response",
      description: "Get qualified applications within 24 hours of posting",
      stat: "24h",
      color: "text-orange-600",
    },
  ];

  const industries = [
    { name: "Construction", workers: "2,500+", icon: "🏗️" },
    { name: "Manufacturing", workers: "1,800+", icon: "🏭" },
    { name: "Logistics", workers: "1,200+", icon: "🚚" },
    { name: "Hospitality", workers: "900+", icon: "🏨" },
    { name: "Facilities", workers: "700+", icon: "🔧" },
    { name: "Others", workers: "500+", icon: "⚡" },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Register Organization",
      description: "Create your company profile with verification",
      icon: Building2,
    },
    {
      step: "02",
      title: "Post Multiple Jobs",
      description: "List all your open positions at once",
      icon: FileCheck,
    },
    {
      step: "03",
      title: "AI Matching",
      description: "Our AI finds the best candidates for each role",
      icon: UserPlus,
    },
    {
      step: "04",
      title: "Hire & Onboard",
      description: "Streamline hiring with integrated workflows",
      icon: FaCheckCircle,
    },
  ];

  return (
    <div className={`flex flex-col min-h-screen transition-colors ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100'}`}>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32 mt-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`inline-block px-4 py-2 backdrop-blur-sm border rounded-full mb-4 ${theme === 'dark' ? 'bg-blue-500/20 border-blue-400/30' : 'bg-blue-100 border-blue-300'}`}>
              <span className={`font-semibold text-sm flex items-center gap-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                <Building2 className="w-4 h-4" />
                Enterprise Hiring Solution
              </span>
            </div>
            
            <h1 className={`text-5xl lg:text-6xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6 leading-tight`}>
              Scale Your Workforce{" "}
              <span className={`bg-gradient-to-r ${theme === 'dark' ? 'from-blue-400 to-cyan-400' : 'from-blue-600 to-indigo-600'} bg-clip-text text-transparent`}>
                Intelligently
              </span>
            </h1>
            
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-8 leading-relaxed`}>
              The leading platform for organizations to hire skilled blue-collar workers at scale. 
              Powered by AI, trusted by enterprises.
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
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center"
              >
                <Building2 className="w-5 h-5 mr-2" />
                Start Hiring Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('solutions').scrollIntoView({ behavior: 'smooth' })}
                className={`px-8 py-4 border-2 rounded-xl font-bold text-lg transition-all flex items-center justify-center ${theme === 'dark' ? 'border-blue-400 text-blue-300 hover:bg-blue-500/10' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}`}
              >
                Explore Solutions
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className={`grid grid-cols-3 gap-4 pt-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
              <div className="text-center">
                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>500+</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Companies</p>
              </div>
              <div className="text-center">
                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>10K+</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Hires Made</p>
              </div>
              <div className="text-center">
                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>98%</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Satisfaction</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl h-64"
              >
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl h-64 mt-8"
              >
                <img
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop"
                  alt="Construction workers"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent"></div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl h-64 -mt-8"
              >
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
                  alt="Manufacturing"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent"></div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl h-64"
              >
                <img
                  src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=400&h=300&fit=crop"
                  alt="Warehouse operations"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 to-transparent"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className={`container mx-auto px-4 py-20 rounded-3xl my-12 ${theme === 'dark' ? 'bg-white/5' : 'bg-white'} backdrop-blur-lg`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
            Why Leading Organizations Choose Us
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Data-driven results that transform your hiring process
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative rounded-2xl p-6 border transition-all group ${theme === 'dark' ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-blue-50 border-blue-200 hover:bg-blue-100'} backdrop-blur-sm`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${theme === 'dark' ? 'bg-white/10' : 'bg-white'}`}>
                    <Icon className={`w-8 h-8 ${advantage.color}`} />
                  </div>
                  <div className={`text-5xl font-bold ${advantage.color} mb-2`}>{advantage.stat}</div>
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>{advantage.title}</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{advantage.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
            Enterprise-Grade Solutions
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Comprehensive tools designed for organizational hiring at scale
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className={`rounded-2xl p-8 border transition-all shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-white/40' : 'bg-gradient-to-br from-white to-blue-50 border-blue-200 hover:border-blue-300'} backdrop-blur-lg`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${solution.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3`}>{solution.title}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6`}>{solution.description}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <FaCheckCircle className={`w-4 h-4 mr-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Industries Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl my-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Trusted Across Industries
          </h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Serving diverse sectors with specialized talent pools
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center border border-white/30 hover:bg-white/30 transition-all"
            >
              <div className="text-4xl mb-3">{industry.icon}</div>
              <h3 className="text-white font-bold mb-1">{industry.name}</h3>
              <p className="text-blue-100 text-sm">{industry.workers} workers</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
            Streamlined Hiring Process
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            From posting to hiring in four simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((process, index) => {
            const Icon = process.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative"
              >
                <div className={`rounded-2xl p-6 border transition-all h-full ${theme === 'dark' ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-white border-blue-200 hover:border-blue-300'} backdrop-blur-sm`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-5xl font-bold ${theme === 'dark' ? 'text-blue-400/30' : 'text-blue-600/30'}`}>{process.step}</span>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                      <Icon className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>{process.title}</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{process.description}</p>
                </div>
                
                {/* Connector Arrow */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-blue-400/50 transform -translate-y-1/2"></div>
                )}
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
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Transform Your Hiring Today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join leading organizations using AI-powered recruitment to build exceptional blue-collar teams
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                className="px-10 py-5 bg-white text-blue-600 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transition-all inline-flex items-center justify-center"
              >
                Start Free Trial
                <FaRocket className="ml-3 w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 border-2 border-white text-white rounded-full font-bold text-xl hover:bg-white/10 transition-all inline-flex items-center justify-center"
              >
                Schedule Demo
              </motion.button>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="w-5 h-5" />
                <span>No credit card needed</span>
              </div>
              <div className="flex items-center gap-2">
                <FaLock className="w-5 h-5" />
                <span>Enterprise security</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
