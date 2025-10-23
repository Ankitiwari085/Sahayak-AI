import React, { useState, useRef, useEffect } from "react";

import { FiMic, FiSend, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from 'jspdf';

// Button component
const Button = ({ children, size, variant, className, onClick }) => {
  const baseClass = "rounded-full font-medium transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 ";
  const sizeClass =
    size === "lg" ? "w-10 h-10 sm:w-12 sm:h-12" : size === "sm" ? "w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm" : "w-9 h-9 sm:w-10 sm:h-10";
  const variantClass =
    variant === "outline"
      ? "border-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-white dark:bg-slate-800"
      : variant === "default"
      ? "bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700"
      : "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-slate-600";

  return (
    <button
      className={`${baseClass} ${sizeClass} ${variantClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Input component
const Input = ({ value, onChange, placeholder, onKeyDown, className }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={`border-2 border-gray-300 dark:border-slate-600 rounded-full px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 w-full ${className}`}
    />
  );
};

// ResumePreview component
const ResumePreview = ({ data }) => {
  const downloadResume = () => {
    const doc = new jsPDF();
    
    // Set font sizes and colors
    const primaryColor = [37, 99, 235]; // Blue
    const textColor = [17, 24, 39]; // Dark gray
    const lightGray = [107, 114, 128];
    
    let yPosition = 20;
    const lineHeight = 7;
    const pageWidth = doc.internal.pageSize.getWidth();
    const marginLeft = 20;
    const marginRight = 20;
    const contentWidth = pageWidth - marginLeft - marginRight;
    
    // Helper function to add text with word wrap
    const addWrappedText = (text, x, y, maxWidth, fontSize = 10) => {
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return lines.length * lineHeight;
    };
    
    // Name (Header)
    doc.setFontSize(24);
    doc.setTextColor(...primaryColor);
    doc.setFont(undefined, 'bold');
    doc.text(data.name || 'Your Name', marginLeft, yPosition);
    yPosition += 8;
    
    // Draw line under name
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(marginLeft, yPosition, pageWidth - marginRight, yPosition);
    yPosition += 8;
    
    // Title
    if (data.title) {
      doc.setFontSize(14);
      doc.setTextColor(...textColor);
      doc.setFont(undefined, 'bold');
      doc.text(data.title, marginLeft, yPosition);
      yPosition += 8;
    }
    
    // Contact Info
    doc.setFontSize(10);
    doc.setTextColor(...lightGray);
    doc.setFont(undefined, 'normal');
    const contactInfo = `${data.email || 'email@example.com'} | ${data.phone || '+91 XXXXX XXXXX'} | ${data.location || 'City, State'}`;
    doc.text(contactInfo, marginLeft, yPosition);
    yPosition += 12;
    
    // Skills Section
    if ((data.skills || []).filter(s => s).length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(...primaryColor);
      doc.setFont(undefined, 'bold');
      doc.text('SKILLS', marginLeft, yPosition);
      yPosition += 2;
      
      // Blue line
      doc.setDrawColor(...primaryColor);
      doc.setLineWidth(0.3);
      doc.line(marginLeft, yPosition, marginLeft + 30, yPosition);
      yPosition += 6;
      
      doc.setFontSize(10);
      doc.setTextColor(...textColor);
      doc.setFont(undefined, 'normal');
      const skillsText = (data.skills || []).filter(s => s).join(' • ');
      yPosition += addWrappedText(skillsText, marginLeft, yPosition, contentWidth);
      yPosition += 8;
    }
    
    // Work Experience Section
    if ((data.experience || []).length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(...primaryColor);
      doc.setFont(undefined, 'bold');
      doc.text('WORK EXPERIENCE', marginLeft, yPosition);
      yPosition += 2;
      
      doc.setDrawColor(...primaryColor);
      doc.setLineWidth(0.3);
      doc.line(marginLeft, yPosition, marginLeft + 50, yPosition);
      yPosition += 6;
      
      (data.experience || []).forEach((exp, index) => {
        // Job Title
        doc.setFontSize(11);
        doc.setTextColor(...textColor);
        doc.setFont(undefined, 'bold');
        doc.text(exp.title || 'Job Title', marginLeft, yPosition);
        yPosition += 6;
        
        // Company and Year
        doc.setFontSize(10);
        doc.setTextColor(...lightGray);
        doc.setFont(undefined, 'normal');
        doc.text(`${exp.company || 'Company Name'} | ${exp.year || '2020 - Present'}`, marginLeft, yPosition);
        yPosition += 6;
        
        // Responsibilities
        if ((exp.points || []).length > 0) {
          doc.setTextColor(...textColor);
          (exp.points || []).forEach(point => {
            if (point) {
              const bulletPoint = '• ' + point;
              yPosition += addWrappedText(bulletPoint, marginLeft + 5, yPosition, contentWidth - 5, 10);
            }
          });
        }
        yPosition += 6;
        
        // Check if we need a new page
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
      });
    }
    
    // Education Section
    if ((data.education || []).length > 0) {
      if (yPosition > 230) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(...primaryColor);
      doc.setFont(undefined, 'bold');
      doc.text('EDUCATION', marginLeft, yPosition);
      yPosition += 2;
      
      doc.setDrawColor(...primaryColor);
      doc.setLineWidth(0.3);
      doc.line(marginLeft, yPosition, marginLeft + 40, yPosition);
      yPosition += 6;
      
      (data.education || []).forEach(edu => {
        doc.setFontSize(11);
        doc.setTextColor(...textColor);
        doc.setFont(undefined, 'bold');
        doc.text(edu.degree || 'Degree / Certification', marginLeft, yPosition);
        yPosition += 6;
        
        doc.setFontSize(10);
        doc.setTextColor(...lightGray);
        doc.setFont(undefined, 'normal');
        doc.text(`${edu.institution || 'Institution Name'} | ${edu.year || 'Year'}`, marginLeft, yPosition);
        yPosition += 8;
      });
    }
    
    // Certifications Section
    if ((data.certifications || []).length > 0) {
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(...primaryColor);
      doc.setFont(undefined, 'bold');
      doc.text('CERTIFICATIONS', marginLeft, yPosition);
      yPosition += 2;
      
      doc.setDrawColor(...primaryColor);
      doc.setLineWidth(0.3);
      doc.line(marginLeft, yPosition, marginLeft + 50, yPosition);
      yPosition += 6;
      
      (data.certifications || []).forEach(cert => {
        doc.setFontSize(10);
        doc.setTextColor(...textColor);
        doc.setFont(undefined, 'normal');
        const certText = `• ${cert.name || 'Certification Name'} - ${cert.org || 'Issuing Organization'}`;
        yPosition += addWrappedText(certText, marginLeft, yPosition, contentWidth);
      });
    }
    
    // Save the PDF
    const fileName = `${(data.name || 'resume').replace(/\s+/g, '_')}_Resume.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="p-3 sm:p-4 md:p-5 border-2 border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 shadow-lg h-full overflow-y-auto text-gray-900 dark:text-gray-100 transition-colors ">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">{data.name || 'Your Name'}</h1>
      </div>
      <p className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">{data.title || 'Professional Title'}</p>
      <div className="text-xs sm:text-sm flex flex-wrap gap-1 sm:gap-2 mt-2 text-gray-600 dark:text-gray-400">
        <span>{data.email || 'email@example.com'}</span> • <span>{data.phone || '+91 XXXXX XXXXX'}</span> • <span>{data.location || 'City, State'}</span>
      </div>

      <div className="mt-4 sm:mt-5">
        <h3 className="text-sm sm:text-base font-bold border-l-4 border-blue-500 dark:border-blue-400 pl-2 mb-3 text-gray-900 dark:text-white">Skills</h3>
        <div className="flex gap-1.5 sm:gap-2 flex-wrap">
          {(data.skills||[]).length > 0
            ? data.skills.map((skill, i) => (
                <span key={i} className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 text-blue-800 dark:text-blue-300 px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-blue-300 dark:border-blue-700 shadow-sm">{skill || `Skill ${i + 1}`}</span>
              ))
            : <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 italic">No skills added</span>}
        </div>
      </div>

      <div className="mt-4 sm:mt-5">
        <h3 className="text-sm sm:text-base font-bold border-l-4 border-blue-500 dark:border-blue-400 pl-2 mb-3 text-gray-900 dark:text-white">Work Experience</h3>
        {(data.experience||[]).length > 0
          ? data.experience.map((exp, i) => (
              <div key={i} className="mb-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600">
                <p className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">{exp.title || 'Job Title'}</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{exp.company || 'Company Name'} • {exp.year || '2020 - Present'}</p>
                <ul className="list-disc list-inside text-xs sm:text-sm mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                  {(exp.points||[]).map((point, j) => (<li key={j}>{point || 'Key responsibility or achievement'}</li>))}
                </ul>
              </div>
            ))
          : <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 italic">No work experience added</span>}
      </div>

      <div className="mt-4 sm:mt-5">
        <h3 className="text-sm sm:text-base font-bold border-l-4 border-blue-500 dark:border-blue-400 pl-2 mb-3 text-gray-900 dark:text-white">Education</h3>
        {(data.education||[]).length > 0
          ? data.education.map((edu, i) => (<p key={i} className="text-xs sm:text-sm mb-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-700/50 p-2 rounded border border-gray-200 dark:border-slate-600">{edu.degree || 'Degree / Certification'} • {edu.institution || 'Institution Name'} • {edu.year || 'Year'}</p>))
          : <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 italic">No education added</span>}
      </div>

      <div className="mt-4 sm:mt-5">
        <h3 className="text-sm sm:text-base font-bold border-l-4 border-blue-500 dark:border-blue-400 pl-2 mb-3 text-gray-900 dark:text-white">Certifications</h3>
        {(data.certifications||[]).length > 0
          ? data.certifications.map((cert, i) => (<p key={i} className="text-xs sm:text-sm mb-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-700/50 p-2 rounded border border-gray-200 dark:border-slate-600">{cert.name || 'Certification Name'} - {cert.org || 'Issuing Organization'}</p>))
          : <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 italic">No certifications added</span>}
      </div>

      <button onClick={downloadResume} className="mt-4 sm:mt-5 w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download Resume
      </button>
    </div>
  );
};

// Questions flow
const questions = [
  { key: "name", question: "What's your full name?" },
  { key: "title", question: "What's your professional title?" },
  { key: "email", question: "Your email address?" },
  { key: "phone", question: "Your phone number?" },
  { key: "location", question: "City and state of residence?" },
  { key: "skills", index: 0, question: "Skill 1?" },
  { key: "skills", index: 1, question: "Skill 2?" },
  { key: "skills", index: 2, question: "Skill 3?" },
];

const App = () => {
  const [messages, setMessages] = useState([{ role: 'ai', content: questions[0].question }]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [resumeData, setResumeData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    skills: ["", "", ""],
    experience: [{ title: "", company: "", year: "", points: ["", ""] }],
    education: [{ degree: "", institution: "", year: "" }],
    certifications: [{ name: "", org: "" }],
  });
  const [progress, setProgress] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [resumeReady, setResumeReady] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    // Alternative method: scroll the container
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const answer = input;
    setMessages((prev) => [...prev, { role: "user", content: answer }]);
    setInput("");

    // Update resumeData dynamically
    let newData = { ...resumeData };
    const question = questions[currentQuestionIndex];
    if (question.index !== undefined) {
      newData[question.key][question.index] = answer;
    } else {
      newData[question.key] = answer;
    }
    setResumeData(newData);

    // Update progress
    const filledFields = [
      newData.name,
      newData.title,
      newData.email,
      newData.phone,
      newData.location,
      ...newData.skills,
    ];
    const filledCount = filledFields.filter((f) => f && f.trim() !== "").length;
    const totalFields = filledFields.length;
    setProgress(Math.round((filledCount / totalFields) * 100));

    // Next question
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setMessages((prev) => [...prev, { role: "ai", content: questions[nextIndex].question }]);
    } else {
      setMessages((prev) => [...prev, { role: 'ai', content: 'Awesome! Resume basics are done.' }]);
      setResumeReady(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-3 sm:p-4 md:p-6 pt-20 sm:pt-22 md:pt-24 transition-colors duration-200">
      <div className={`w-full ${resumeReady ? 'max-w-7xl' : 'max-w-3xl'} transition-all duration-500`}>
        <div className={`grid ${resumeReady ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-4 sm:gap-5 md:gap-6`}>
          {/* Chat Section - Left Side */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-700 transition-colors duration-200"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 p-4 sm:p-5 md:p-6 border-b border-blue-700 dark:border-blue-400">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <div>
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-white flex items-center gap-2">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Resume Builder Chat
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-100">Answer a few questions and we'll build your resume</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs sm:text-sm font-bold text-white bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/30 shadow-lg">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    {progress}% Complete
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 md:p-6 bg-gray-50 dark:bg-slate-900/50">
              <div 
                ref={chatContainerRef}
                className="h-60 sm:h-72 md:h-80 lg:h-96 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-white dark:bg-slate-800 rounded-xl scroll-smooth shadow-inner border border-gray-200 dark:border-slate-700"
              >
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base shadow-md transition-all duration-200 ${msg.role === 'ai' ? 'bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/60 dark:to-blue-800/60 text-gray-900 dark:text-gray-100 border-2 border-blue-300 dark:border-blue-600' : 'bg-gradient-to-r from-gray-700 to-gray-800 dark:from-slate-700 dark:to-slate-600 text-white shadow-lg'}`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3 bg-white dark:bg-slate-800 p-2 sm:p-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 shadow-md transition-colors duration-200">
                <Button size="lg" variant={isRecording ? 'default' : 'outline'} className={`${isRecording ? 'bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white animate-pulse border-none' : ''} hidden sm:flex`} onClick={() => setIsRecording(!isRecording)}>
                  <FiMic className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>

                <Input 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }} 
                  placeholder="Type your answer..." 
                  className="flex-1 text-sm sm:text-base px-3 sm:px-4 py-2" 
                />

                <Button size="lg" variant="default" onClick={handleSend} className="flex-shrink-0">
                  <FiSend className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Resume Preview Section - Right Side (Only shown when resumeReady is true) */}
          <AnimatePresence>
            {resumeReady && (
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden mt-4 lg:mt-0 border border-gray-200 dark:border-slate-700 transition-colors duration-200"
              >
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 p-4 sm:p-5 md:p-6 border-b border-purple-700 dark:border-purple-400">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white flex items-center gap-2">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Your Resume Preview
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-100">Review and download your professional resume</p>
                </div>
                <div className="p-4 sm:p-5 md:p-6 h-[400px] sm:h-[500px] lg:h-[calc(100vh-200px)] overflow-hidden bg-gray-50 dark:bg-slate-900/50">
                  <ResumePreview data={resumeData} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
export default App;
