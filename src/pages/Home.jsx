import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Mic, MessageCircle } from "lucide-react";
import { FaUserCog, FaFileAlt, FaRocket, FaClipboardList, FaComments, FaPaperPlane, FaLightbulb, FaHandshake, FaCheckCircle } from "react-icons/fa";
import { MdBuild, MdQuestionAnswer, MdWork } from "react-icons/md";
import resumeImg from "../assets/resume.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../router";

export default function HomePage() {
  const navigate = useNavigate();
  const { user, openAuth } = useContext(AuthContext);
  const features = [
    {
      icon: FaUserCog,
      title: "Tailored for You",
      description:
        "Our AI builds resumes designed specifically for blue-collar professionals, highlighting your real-world experience.",
    },
    {
      icon: FaFileAlt,
      title: "Professional Templates",
      description:
        "Choose from beautifully designed templates that make your resume stand out in just a few clicks.",
    },
    {
      icon: FaRocket,
      title: "Fast & Easy to Use",
      description:
        "Create your professional resume in minutes with smart AI suggestions and step-by-step guidance.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Home Section */}
      <main className="flex-grow flex flex-col lg:flex-row justify-between items-center px-8 lg:px-24 py-24 mt-8">
        {/* 👆 py-24 aur mt-8 se upar aur niche dono taraf extra gap aayega */}

        <div className="max-w-xl">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Build Your Resume <br /> with AI
          </h2>
          <p className="text-lg text-gray-600 mb-8">Simple, Fast, and Free</p>
          <p className="text-gray-500 mb-10">
            Empowering skilled workers to create professional resumes using
            voice or chat.
          </p>
       <div className="flex space-x-4 mb-6">
  <button onClick={()=>{ if(!user) { openAuth(); } else { navigate('/chat'); } }} className="flex items-center px-5 py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-lg font-semibold hover:opacity-90 transition">
      <Mic className="w-5 h-5 mr-2" />
      Start with Voice
    </button>

    <button onClick={()=>{ if(!user) { openAuth(); } else { navigate('/chat'); } }} className="flex items-center px-5 py-3 border-2 border-blue-500 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
      <MessageCircle className="w-5 h-5 mr-2" />
      Start with Chat
    </button>
</div>


          <p className="text-gray-400 italic">
            "Your voice, your skills, your future."
          </p>
        </div>

        <div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center">
          <img
            src={resumeImg}
            alt="Workers using AI"
            className="rounded-2xl shadow-lg w-[650px]"
          />
        </div>
      </main>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 border-t-2 border-gray-200 dark:border-slate-00">
        {/* 👆 py-20 for vertical breathing space */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our AI Resume Builder?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Designed specifically for blue-collar professionals who deserve a
            great resume
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}ī
            >
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section (placed before About per request) */}
      <section id="services" className="container mx-auto px-4 py-20 transition-colors border-t-2 border-gray-200 dark:border-slate-700">

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto shadow-lg">
                🛠️
              </div>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive tools designed to help you succeed at every step of your job search journey — from resume creation to interview preparation and application tracking.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Service Card 1 - Resume Builder */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-transparent dark:via-transparent dark:to-transparent rounded-3xl opacity-60"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-300 dark:bg-blue-900/30 rounded-full blur-2xl group-hover:bg-blue-400 dark:group-hover:bg-blue-800/50 transition-all duration-300"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <MdBuild className="text-white text-4xl" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">AI Resume Builder</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 font-medium">
                  Create professional, ATS-friendly resumes in minutes with our AI-powered builder. Tailored specifically for skilled trades and blue-collar professionals with industry-specific templates.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-300 bg-white/80 dark:bg-slate-700/50 p-2 rounded-lg">
                    <FaCheckCircle className="text-blue-600 text-lg" />
                    <span className="font-semibold">Voice & Chat Input</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-300 bg-white/80 dark:bg-slate-700/50 p-2 rounded-lg">
                    <FaCheckCircle className="text-blue-600 text-lg" />
                    <span className="font-semibold">Professional Templates</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-300 bg-white/80 dark:bg-slate-700/50 p-2 rounded-lg">
                    <FaCheckCircle className="text-blue-600 text-lg" />
                    <span className="font-semibold">Instant Download</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service Card 2 - Interview Prep */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-green-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-transparent dark:via-transparent dark:to-transparent rounded-3xl opacity-60"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-300 dark:bg-green-900/30 rounded-full blur-2xl group-hover:bg-green-400 dark:group-hover:bg-green-800/50 transition-all duration-300"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <MdQuestionAnswer className="text-white text-4xl" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Interview Preparation</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 font-medium">
                  Build confidence with AI-powered interview practice. Get common questions, suggested answers, and personalized tips to ace your next job interview.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-300 bg-white/80 dark:bg-slate-700/50 p-2 rounded-lg">
                    <FaCheckCircle className="text-green-600 text-lg" />
                    <span className="font-semibold">Mock Interviews</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-300 bg-white/80 dark:bg-slate-700/50 p-2 rounded-lg">
                    <FaCheckCircle className="text-green-600 text-lg" />
                    <span className="font-semibold">Answer Suggestions</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-300 bg-white/80 dark:bg-slate-700/50 p-2 rounded-lg">
                    <FaCheckCircle className="text-green-600 text-lg" />
                    <span className="font-semibold">Industry-Specific Tips</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service Card 3 - Application Assistance */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 dark:from-transparent dark:via-transparent dark:to-transparent rounded-3xl opacity-60"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-300 dark:bg-purple-900/30 rounded-full blur-2xl group-hover:bg-purple-400 dark:group-hover:bg-purple-800/50 transition-all duration-300"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <MdWork className="text-white text-4xl" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Application Tracking</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 font-medium">
                  Never lose track of your job applications. Organize, manage, and follow up on all your applications in one centralized dashboard with smart reminders.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-300 bg-white/80 dark:bg-slate-700/50 p-2 rounded-lg">
                    <FaCheckCircle className="text-purple-600 text-lg" />
                    <span className="font-semibold">Application Dashboard</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-300 bg-white/80 dark:bg-slate-700/50 p-2 rounded-lg">
                    <FaCheckCircle className="text-purple-600 text-lg" />
                    <span className="font-semibold">Status Tracking</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-300 bg-white/80 dark:bg-slate-700/50 p-2 rounded-lg">
                    <FaCheckCircle className="text-purple-600 text-lg" />
                    <span className="font-semibold">Follow-up Reminders</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Additional Service Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 grid md:grid-cols-2 gap-8"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaComments className="text-2xl" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-3">24/7 AI Assistant</h4>
                  <p className="text-white/90 leading-relaxed">
                    Get instant help anytime with our intelligent chatbot. Ask questions, get career advice, or troubleshoot issues — day or night.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaPaperPlane className="text-2xl" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-3">Direct Job Submissions</h4>
                  <p className="text-white/90 leading-relaxed">
                    Apply to jobs directly from our platform. We help you fill applications quickly and submit them to employers with one click.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-20 transition-colors border-t-2 border-gray-200 dark:border-slate-700">

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto shadow-lg">
                💼
              </div>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SahayakAI</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We're on a mission to revolutionize how blue-collar professionals create resumes and find jobs. 
              Our AI-powered platform breaks down barriers, making professional resume building accessible to everyone, 
              regardless of language skills or technical expertise.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
            className="grid lg:grid-cols-2 gap-12 items-center mb-16"
          >
            {/* Left side - Image */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 }
              }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop"
                  alt="Professional team working"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    ✓
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-2xl">10,000+</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Resumes Created</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side - Mission */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: { opacity: 1, x: 0 }
              }}
              className="space-y-8"
            >
              <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border-2 border-blue-100 dark:border-slate-700 overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-transparent dark:to-transparent opacity-50"></div>
                <div className="flex items-start gap-4 mb-4 relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FaLightbulb className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h3>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                      To empower skilled workers worldwide by providing simple, fast, and intelligent resume-building tools. 
                      We eliminate barriers like language complexity, technical hurdles, and format confusion — ensuring that 
                      everyone can present their skills professionally and compete confidently in the job market.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border-2 border-green-100 dark:border-slate-700 overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-transparent dark:to-transparent opacity-50"></div>
                <div className="flex items-start gap-4 mb-4 relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FaHandshake className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Promise</h3>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                      We believe every skilled professional deserves a resume that truly reflects their experience and capabilities. 
                      Our platform is built with you in mind — no hidden fees, no complicated processes, just straightforward 
                      tools that help you land the job you deserve.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* How it Works */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-gray-200 dark:border-slate-700 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-transparent dark:via-transparent dark:to-transparent opacity-40"></div>
            <div className="text-center mb-12 relative">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                How It Works
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                Three simple steps to your professional resume
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
              className="grid md:grid-cols-3 gap-8 relative"
            >
              {/* Step 1 */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="relative text-center"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  1
                </div>
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 pt-12 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-blue-100 dark:border-slate-700 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-transparent dark:to-transparent opacity-50"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 dark:bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Mic className="text-white dark:text-blue-300 w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Share Your Story</h4>
                    <p className="text-gray-800 dark:text-gray-300 font-medium">
                      Use voice or chat to tell us about your work experience, skills, and achievements. Our AI understands you.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="relative text-center"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  2
                </div>
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 pt-12 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-green-100 dark:border-slate-700 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-transparent dark:to-transparent opacity-50"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 dark:bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FaClipboardList className="text-white dark:text-green-300 w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Choose Template</h4>
                    <p className="text-gray-800 dark:text-gray-300 font-medium">
                      Pick from professional templates designed specifically for your industry and role. Preview in real-time.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="relative text-center"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  3
                </div>
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 pt-12 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-purple-100 dark:border-slate-700 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-transparent dark:to-transparent opacity-50"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 dark:bg-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FaRocket className="text-white dark:text-purple-300 w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Download & Apply</h4>
                    <p className="text-gray-800 dark:text-gray-300 font-medium">
                      Get your polished resume instantly. Download as PDF and start applying to jobs with confidence.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact moved to its own page (/contact) - section intentionally removed */}

    </div>
  );
}
