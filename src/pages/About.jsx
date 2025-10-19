import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaLightbulb, FaHandshake, FaRocket, FaCheckCircle, FaGlobe } from "react-icons/fa";
import { MdWorkOutline, MdSpeed, MdSecurity } from "react-icons/md";

export default function About() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const features = [
    {
      icon: FaUsers,
      title: "For Everyone",
      description: "Designed specifically for blue-collar professionals, tradespeople, and skilled workers.",
      color: "blue"
    },
    {
      icon: MdSpeed,
      title: "Quick & Easy",
      description: "Create professional resumes in minutes, not hours, with AI-powered assistance.",
      color: "green"
    },
    {
      icon: MdWorkOutline,
      title: "Job-Ready",
      description: "Templates optimized for skilled trades and labor roles that employers prefer.",
      color: "purple"
    },
    {
      icon: FaGlobe,
      title: "Accessible",
      description: "Voice and chat input options make resume building accessible to everyone.",
      color: "orange"
    },
    {
      icon: MdSecurity,
      title: "Secure & Private",
      description: "Your personal information is protected and never shared without permission.",
      color: "red"
    },
    {
      icon: FaRocket,
      title: "Career Growth",
      description: "Get interview prep, application tracking, and career guidance all in one place.",
      color: "teal"
    }
  ];

  const values = [
    { icon: FaLightbulb, title: "Innovation", text: "Using AI to simplify resume building" },
    { icon: FaHandshake, title: "Empowerment", text: "Helping workers showcase their true value" },
    { icon: FaCheckCircle, title: "Quality", text: "Professional results every time" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 transition-colors pt-16">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="container mx-auto px-4 py-16 md:py-24"
      >
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto shadow-xl">
              📄
            </div>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6"
          >
            Empowering Blue-Collar <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Professionals</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
          >
            At SahayakAI, we believe that every skilled worker deserves a professional resume 
            that truly represents their experience, expertise, and dedication. Our mission is to 
            break down barriers and provide accessible, AI-powered tools that help you land your 
            dream job.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-4 justify-center"
          >
            <div className="px-6 py-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <p className="text-blue-900 dark:text-blue-200 font-semibold">10,000+ Resumes Created</p>
            </div>
            <div className="px-6 py-3 bg-green-100 dark:bg-green-900 rounded-full">
              <p className="text-green-900 dark:text-green-200 font-semibold">95% Success Rate</p>
            </div>
            <div className="px-6 py-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <p className="text-purple-900 dark:text-purple-200 font-semibold">Free Forever</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Vision & Mission Section */}
      <section className="bg-white dark:bg-slate-800 py-16 md:py-20 transition-colors">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 md:gap-12"
          >
            <motion.div 
              variants={fadeInUp}
              className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                To become the world's most trusted platform for blue-collar professionals, 
                where every skilled worker can effortlessly create resumes that reflect their 
                true capabilities and experience. We envision a future where technology bridges 
                the gap between talent and opportunity.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-slate-700 dark:to-slate-600 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
                <FaRocket className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                To empower skilled workers worldwide by providing simple, fast, and intelligent 
                resume-building tools. We eliminate barriers like language, technology, and format 
                complexity, ensuring that everyone can present their skills professionally and 
                compete confidently in the job market.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose SahayakAI?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              We've built features specifically designed for the needs of blue-collar professionals
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => {
              const colorClasses = {
                blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
                green: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
                purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
                orange: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
                red: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
                teal: "from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
              };

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${colorClasses[feature.color]} rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300`}>
                    <feature.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
            >
              Our Core Values
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-center hover:bg-white/20 transition-all duration-300"
                >
                  <value.icon className="text-white text-5xl mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-white/90">{value.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-800 transition-colors">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Three simple steps to your professional resume
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              { step: "1", title: "Input Your Info", desc: "Use voice or chat to tell us about your work experience, skills, and achievements" },
              { step: "2", title: "Choose Template", desc: "Pick from professional templates designed for your industry and role" },
              { step: "3", title: "Download & Apply", desc: "Get your polished resume instantly and start applying to jobs with confidence" }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-slate-700 dark:to-slate-600 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-4">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-16 md:py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 p-12 rounded-3xl shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Your Resume?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join thousands of professionals who've already created their perfect resume
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started for Free
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
