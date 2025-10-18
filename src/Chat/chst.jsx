import React, { useState, useRef, useEffect } from "react";
import { FiMic, FiSend } from "react-icons/fi";

// Button component
const Button = ({ children, size, variant, className, onClick }) => {
  const baseClass = "rounded-full font-medium transition flex items-center justify-center ";
  const sizeClass =
    size === "lg" ? "w-12 h-12" : size === "sm" ? "w-8 h-8 text-sm" : "w-10 h-10";
  const variantClass =
    variant === "outline"
      ? "border border-gray-400 text-gray-700 hover:bg-gray-100"
      : variant === "default"
      ? "bg-blue-500 text-white hover:bg-blue-600"
      : "bg-gray-200 text-black";

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
      className={`border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    />
  );
};

// ResumePreview component
const ResumePreview = ({ data }) => {
  const generateHtml = () => {
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Resume</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="font-family: Arial; padding:20px; color:#111"><h1>${data.name || 'Your Name'}</h1><p><strong>${data.title || ''}</strong></p><p>${data.email || ''} • ${data.phone || ''} • ${data.location || ''}</p><h3>Skills</h3><p>${(data.skills||[]).filter(Boolean).join(', ')}</p><h3>Experience</h3>${(data.experience||[]).map(exp=>`<div><strong>${exp.title}</strong> - ${exp.company} <div>${exp.points.map(p=>`<div>- ${p}</div>`).join('')}</div></div>`).join('')}<h3>Education</h3>${(data.education||[]).map(e=>`<div>${e.degree} - ${e.institution} (${e.year})</div>`).join('')}<h3>Certifications</h3>${(data.certifications||[]).map(c=>`<div>${c.name} - ${c.org}</div>`).join('')}</body></html>`;
    return html;
  };

  const downloadResume = () => {
    const blob = new Blob([generateHtml()], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(data.name||'resume').replace(/\s+/g,'_')}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-5 border rounded-md bg-white shadow-md h-full overflow-y-auto text-black">
      <h1 className="text-2xl font-bold">{data.name || 'Your Name'}</h1>
      <p>{data.title || 'Professional Title'}</p>
      <div className="text-sm flex gap-2 mt-1">
        <span>{data.email || 'email@example.com'}</span> • <span>{data.phone || '+91 XXXXX XXXXX'}</span> • <span>{data.location || 'City, State'}</span>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold border-l-4 border-blue-500 pl-2 mb-2">Skills</h3>
        <div className="flex gap-2 flex-wrap">
          {(data.skills||[]).length > 0
            ? data.skills.map((skill, i) => (
                <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">{skill || `Skill ${i + 1}`}</span>
              ))
            : 'No skills added'}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold border-l-4 border-blue-500 pl-2 mb-2">Work Experience</h3>
        {(data.experience||[]).length > 0
          ? data.experience.map((exp, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold">{exp.title || 'Job Title'}</p>
                <p className="text-sm">{exp.company || 'Company Name'} • {exp.year || '2020 - Present'}</p>
                <ul className="list-disc list-inside">
                  {(exp.points||[]).map((point, j) => (<li key={j}>{point || 'Key responsibility or achievement'}</li>))}
                </ul>
              </div>
            ))
          : 'No work experience added'}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold border-l-4 border-blue-500 pl-2 mb-2">Education</h3>
        {(data.education||[]).length > 0
          ? data.education.map((edu, i) => (<p key={i}>{edu.degree || 'Degree / Certification'} • {edu.institution || 'Institution Name'} • {edu.year || 'Year'}</p>))
          : 'No education added'}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold border-l-4 border-blue-500 pl-2 mb-2">Certifications</h3>
        {(data.certifications||[]).length > 0
          ? data.certifications.map((cert, i) => (<p key={i}>{cert.name || 'Certification Name'} - {cert.org || 'Issuing Organization'}</p>))
          : 'No certifications added'}
      </div>

      <button onClick={downloadResume} className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Download Resume</button>
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Resume Builder Chat</h2>
              <p className="text-sm text-gray-500">Answer a few questions and we'll build your resume</p>
            </div>
            <div className="text-sm text-gray-600">{progress}% Complete</div>
          </div>
        </div>

        <div className="p-6">
          <div className="h-72 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'ai' ? 'bg-blue-100 text-gray-800 border border-blue-200' : 'bg-gray-700 text-white shadow-sm'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Button size="lg" variant={isRecording ? 'default' : 'outline'} className={isRecording ? 'bg-green-500 text-white animate-pulse' : ''} onClick={() => setIsRecording(!isRecording)}>
              <FiMic className="w-6 h-6" />
            </Button>

            <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Type your answer..." className="flex-1" />

            <Button size="lg" variant="default" onClick={handleSend}>
              <FiSend className="w-6 h-6" />
            </Button>
          </div>

          {resumeReady && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Your generated resume</h3>
              <ResumePreview data={resumeData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default App;
