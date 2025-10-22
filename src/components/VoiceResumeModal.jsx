import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMicrophone, FaPause, FaPlay, FaDownload, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { MdVolumeUp } from 'react-icons/md';

export default function VoiceResumeModal({ open, onClose, user }) {
  // State Management
  const [isListening, setIsListening] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResume, setShowResume] = useState(false);
  const [animateMic, setAnimateMic] = useState(false);

  // Resume Data State
  const [resumeData, setResumeData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    skills: [],
    experience: [],
    education: [],
    certifications: [],
    languages: [],
  });

  // Conversation History
  const [conversation, setConversation] = useState([]);

  // Refs
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  // Questions for Voice Interview
  const questions = [
    { key: 'name', question: 'Hello! Welcome to the AI Voice Resume Builder. What is your full name?', type: 'text' },
    { key: 'title', question: 'Great! What is your current job title or the position you are seeking?', type: 'text' },
    { key: 'email', question: 'What is your email address?', type: 'email' },
    { key: 'phone', question: 'Please provide your phone number.', type: 'phone' },
    { key: 'location', question: 'Which city and state do you currently live in?', type: 'text' },
    { key: 'skills', question: 'What are your main skills? Please list them one by one, separated by commas.', type: 'array' },
    { key: 'experience', question: 'Tell me about your work experience. What was your job title, company name, and key responsibilities?', type: 'experience' },
    { key: 'education', question: 'What is your educational background? Please mention your degree and institution.', type: 'education' },
    { key: 'certifications', question: 'Do you have any certifications? If yes, please name them.', type: 'array' },
    { key: 'languages', question: 'What languages do you speak?', type: 'array' },
  ];

  // Initialize Speech Recognition and Synthesis
  useEffect(() => {
    if (open && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
    }

    if (open && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        setTranscript(speechResult);
        handleAnswer(speechResult);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setAnimateMic(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setAnimateMic(false);
      };
    }

    // Start with first question when modal opens
    if (open) {
      setTimeout(() => {
        speakQuestion(questions[0].question);
      }, 500);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [open]);

  // Speak Question Function
  const speakQuestion = (text) => {
    if (synthRef.current) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsAISpeaking(true);
      utterance.onend = () => {
        setIsAISpeaking(false);
        // Auto-start listening after AI finishes speaking
        setTimeout(() => startListening(), 500);
      };

      synthRef.current.speak(utterance);
      
      // Add to conversation
      setConversation(prev => [...prev, { role: 'ai', text }]);
    }
  };

  // Start Listening Function
  const startListening = () => {
    if (recognitionRef.current && !isListening && !isAISpeaking) {
      setTranscript('');
      setIsListening(true);
      setAnimateMic(true);
      recognitionRef.current.start();
    }
  };

  // Stop Listening Function
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setAnimateMic(false);
    }
  };

  // Handle Answer Processing
  const handleAnswer = (answer) => {
    if (!answer.trim()) return;

    setIsProcessing(true);
    const currentQuestion = questions[currentQuestionIndex];

    // Add user answer to conversation
    setConversation(prev => [...prev, { role: 'user', text: answer }]);

    // Update resume data based on question type
    let updatedData = { ...resumeData };

    switch (currentQuestion.type) {
      case 'text':
      case 'email':
      case 'phone':
        updatedData[currentQuestion.key] = answer;
        break;
      
      case 'array':
        const items = answer.split(',').map(item => item.trim()).filter(Boolean);
        updatedData[currentQuestion.key] = items;
        break;
      
      case 'experience':
        // Parse experience (simple parsing, can be enhanced)
        const expMatch = answer.match(/(.+?)\s+at\s+(.+?)(?:\s+doing\s+(.+))?/i);
        if (expMatch) {
          updatedData.experience.push({
            title: expMatch[1]?.trim() || answer,
            company: expMatch[2]?.trim() || '',
            responsibilities: expMatch[3]?.trim() || answer,
          });
        } else {
          updatedData.experience.push({
            title: answer,
            company: '',
            responsibilities: '',
          });
        }
        break;
      
      case 'education':
        updatedData.education.push({
          degree: answer,
          institution: '',
          year: '',
        });
        break;
    }

    setResumeData(updatedData);

    // Calculate progress
    const filledFields = Object.keys(updatedData).filter(key => {
      const value = updatedData[key];
      if (Array.isArray(value)) return value.length > 0;
      return value && value.toString().trim() !== '';
    }).length;
    const newProgress = Math.round((filledFields / Object.keys(updatedData).length) * 100);
    setProgress(newProgress);

    setTimeout(() => {
      setIsProcessing(false);
      
      // Move to next question or finish
      if (currentQuestionIndex < questions.length - 1) {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        setTimeout(() => {
          speakQuestion(questions[nextIndex].question);
        }, 300);
      } else {
        // Interview complete
        const finalMessage = 'Excellent! Your resume is ready. You can now preview and download it.';
        speakQuestion(finalMessage);
        setShowResume(true);
        setProgress(100);
      }
    }, 1000);
  };

  // Download Resume as PDF/HTML
  const downloadResume = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resumeData.name} - Resume</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; padding: 40px; background: #f9f9f9; }
    .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px; margin-bottom: 10px; }
    h2 { color: #1e40af; margin-top: 25px; margin-bottom: 10px; border-left: 4px solid #2563eb; padding-left: 10px; }
    .contact { color: #666; margin-bottom: 20px; }
    .section { margin-bottom: 20px; }
    .skills { display: flex; flex-wrap: wrap; gap: 10px; }
    .skill { background: #dbeafe; color: #1e40af; padding: 5px 15px; border-radius: 20px; font-size: 14px; }
    ul { margin-left: 20px; }
    li { margin-bottom: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${resumeData.name || 'Your Name'}</h1>
    <div class="contact">
      <p><strong>${resumeData.title || 'Professional Title'}</strong></p>
      <p>${resumeData.email || 'email@example.com'} | ${resumeData.phone || 'Phone'} | ${resumeData.location || 'Location'}</p>
    </div>

    ${resumeData.skills.length > 0 ? `
    <div class="section">
      <h2>Skills</h2>
      <div class="skills">
        ${resumeData.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
      </div>
    </div>
    ` : ''}

    ${resumeData.experience.length > 0 ? `
    <div class="section">
      <h2>Work Experience</h2>
      ${resumeData.experience.map(exp => `
        <div style="margin-bottom: 15px;">
          <p><strong>${exp.title}</strong> ${exp.company ? `at ${exp.company}` : ''}</p>
          ${exp.responsibilities ? `<p>${exp.responsibilities}</p>` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${resumeData.education.length > 0 ? `
    <div class="section">
      <h2>Education</h2>
      ${resumeData.education.map(edu => `
        <p>${edu.degree} ${edu.institution ? `- ${edu.institution}` : ''} ${edu.year ? `(${edu.year})` : ''}</p>
      `).join('')}
    </div>
    ` : ''}

    ${resumeData.certifications.length > 0 ? `
    <div class="section">
      <h2>Certifications</h2>
      <ul>
        ${resumeData.certifications.map(cert => `<li>${cert}</li>`).join('')}
      </ul>
    </div>
    ` : ''}

    ${resumeData.languages.length > 0 ? `
    <div class="section">
      <h2>Languages</h2>
      <p>${resumeData.languages.join(', ')}</p>
    </div>
    ` : ''}
  </div>
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.name.replace(/\s+/g, '_') || 'resume'}_Resume.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Close modal and cleanup
  const handleClose = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    if (synthRef.current) synthRef.current.cancel();
    setIsListening(false);
    setIsAISpeaking(false);
    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-3xl shadow-2xl w-full ${
            showResume ? 'max-w-7xl' : 'max-w-4xl'
          } max-h-[90vh] overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 p-6">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-all z-10"
            >
              <FaTimes className="text-2xl" />
            </button>

            <div className="text-center text-white">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-2"
              >
                <FaMicrophone className="text-5xl" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-2">Voice Resume Builder</h2>
              <p className="text-blue-100">Answer questions with your voice to build your professional resume</p>
              
              {/* Progress Bar */}
              <div className="mt-4 bg-white/20 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-green-400 to-teal-400 rounded-full"
                />
              </div>
              <p className="mt-2 text-sm text-white/90">{progress}% Complete</p>
            </div>
          </div>

          {/* Main Content */}
          <div className={`grid ${showResume ? 'md:grid-cols-2' : 'grid-cols-1'} gap-6 p-6 max-h-[calc(90vh-200px)] overflow-y-auto`}>
            {/* Voice Interview Section */}
            <div className="space-y-6">
              {/* Microphone Visualization */}
              <div className="relative flex items-center justify-center py-12">
                <motion.div
                  animate={animateMic ? {
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(59, 130, 246, 0.7)',
                      '0 0 0 30px rgba(59, 130, 246, 0)',
                      '0 0 0 0 rgba(59, 130, 246, 0)'
                    ]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`w-32 h-32 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                    isListening
                      ? 'bg-gradient-to-br from-red-500 to-pink-500'
                      : 'bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                  } shadow-2xl`}
                  onClick={isListening ? stopListening : startListening}
                >
                  {isListening ? (
                    <FaPause className="text-6xl text-white" />
                  ) : isAISpeaking ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      <MdVolumeUp className="text-6xl text-white" />
                    </motion.div>
                  ) : (
                    <FaMicrophone className="text-6xl text-white" />
                  )}
                </motion.div>

                {/* Status Text */}
                <motion.p
                  className="absolute -bottom-2 text-white font-semibold text-lg"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {isListening ? '🎤 Listening...' : isAISpeaking ? '🔊 AI Speaking...' : isProcessing ? '⚙️ Processing...' : '✋ Click to Start'}
                </motion.p>
              </div>

              {/* Current Transcript */}
              {transcript && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                >
                  <p className="text-white text-center italic">"{transcript}"</p>
                </motion.div>
              )}

              {/* Conversation History */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 max-h-96 overflow-y-auto space-y-3 border border-white/20">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <FaCheckCircle className="text-green-400" />
                  Conversation
                </h3>
                {conversation.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: msg.role === 'ai' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === 'ai'
                          ? 'bg-blue-500/30 border border-blue-400/50 text-white'
                          : 'bg-green-500/30 border border-green-400/50 text-white'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Resume Preview Section */}
            {showResume && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-2xl max-h-[600px] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900">Resume Preview</h3>
                  <button
                    onClick={downloadResume}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    <FaDownload />
                    Download
                  </button>
                </div>

                {/* Resume Content */}
                <div className="text-gray-800">
                  <h1 className="text-3xl font-bold text-blue-600 mb-2">{resumeData.name || 'Your Name'}</h1>
                  <p className="text-lg font-semibold text-gray-700 mb-1">{resumeData.title || 'Professional Title'}</p>
                  <p className="text-sm text-gray-600 mb-4">
                    {resumeData.email} | {resumeData.phone} | {resumeData.location}
                  </p>

                  {resumeData.skills.length > 0 && (
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 border-l-4 border-blue-600 pl-3">Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill, i) => (
                          <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {resumeData.experience.length > 0 && (
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 border-l-4 border-blue-600 pl-3">Experience</h2>
                      {resumeData.experience.map((exp, i) => (
                        <div key={i} className="mb-3">
                          <p className="font-semibold text-gray-900">{exp.title}</p>
                          {exp.company && <p className="text-sm text-gray-600">{exp.company}</p>}
                          {exp.responsibilities && <p className="text-sm text-gray-700 mt-1">{exp.responsibilities}</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  {resumeData.education.length > 0 && (
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 border-l-4 border-blue-600 pl-3">Education</h2>
                      {resumeData.education.map((edu, i) => (
                        <p key={i} className="text-sm text-gray-700">{edu.degree}</p>
                      ))}
                    </div>
                  )}

                  {resumeData.certifications.length > 0 && (
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 border-l-4 border-blue-600 pl-3">Certifications</h2>
                      <ul className="list-disc list-inside">
                        {resumeData.certifications.map((cert, i) => (
                          <li key={i} className="text-sm text-gray-700">{cert}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resumeData.languages.length > 0 && (
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 border-l-4 border-blue-600 pl-3">Languages</h2>
                      <p className="text-sm text-gray-700">{resumeData.languages.join(', ')}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
