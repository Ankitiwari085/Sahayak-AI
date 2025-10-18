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
  return (
    <div className="p-5 border rounded-md bg-white shadow-md h-full overflow-y-auto text-black">
      <h1 className="text-2xl font-bold">{data.name || "Your Name"}</h1>
      <p>{data.title || "Professional Title"}</p>
      <div className="text-sm flex gap-2 mt-1">
        <span>{data.email || "email@example.com"}</span> •{" "}
        <span>{data.phone || "+91 XXXXX XXXXX"}</span> •{" "}
        <span>{data.location || "City, State"}</span>
      </div>

      {/* Skills */}
      <div className="mt-4">
        <h3 className="font-semibold border-l-4 border-blue-500 pl-2 mb-2">Skills</h3>
        <div className="flex gap-2 flex-wrap">
          {data.skills.length > 0
            ? data.skills.map((skill, i) => (
                <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {skill || `Skill ${i + 1}`}
                </span>
              ))
            : "No skills added"}
        </div>
      </div>

      {/* Work Experience */}
      <div className="mt-4">
        <h3 className="font-semibold border-l-4 border-blue-500 pl-2 mb-2">Work Experience</h3>
        {data.experience.length > 0
          ? data.experience.map((exp, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold">{exp.title || "Job Title"}</p>
                <p className="text-sm">
                  {exp.company || "Company Name"} • {exp.year || "2020 - Present"}
                </p>
                <ul className="list-disc list-inside">
                  {exp.points.map((point, j) => (
                    <li key={j}>{point || "Key responsibility or achievement"}</li>
                  ))}
                </ul>
              </div>
            ))
          : "No work experience added"}
      </div>

      {/* Education */}
      <div className="mt-4">
        <h3 className="font-semibold border-l-4 border-blue-500 pl-2 mb-2">Education</h3>
        {data.education.length > 0
          ? data.education.map((edu, i) => (
              <p key={i}>
                {edu.degree || "Degree / Certification"} • {edu.institution || "Institution Name"} •{" "}
                {edu.year || "Year"}
              </p>
            ))
          : "No education added"}
      </div>

      {/* Certifications */}
      <div className="mt-4">
        <h3 className="font-semibold border-l-4 border-blue-500 pl-2 mb-2">Certifications</h3>
        {data.certifications.length > 0
          ? data.certifications.map((cert, i) => (
              <p key={i}>
                {cert.name || "Certification Name"} - {cert.org || "Issuing Organization"}
              </p>
            ))
          : "No certifications added"}
      </div>

      {/* Download PDF button with black text */}
      <button className="mt-4 w-full bg-blue-500 text-black py-2 rounded hover:bg-blue-600 hover:text-white">
        Download PDF
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
  const [messages, setMessages] = useState([{ role: "ai", content: questions[0].question }]);
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
      setMessages((prev) => [...prev, { role: "ai", content: "Awesome! Resume basics are done." }]);
    }
  };

  return (
    <div className="flex h-screen gap-4 p-4 bg-gray-100 pt-12"> {/* top padding increased */}
      {/* Chat Bot */}
      <div className="flex-1 flex flex-col bg-white border rounded-lg shadow-md">
        {/* Progress */}
        <div className="border-b border-gray-300 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Resume Builder</span>
            <span className="text-sm text-gray-500">{progress}% Complete</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === "ai"
                    ? "bg-blue-100 text-gray-800 border border-blue-200"
                    : "bg-gray-700 text-white shadow-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Row */}
        <div className="border-t border-gray-300 p-4 flex gap-2 items-center">
          <Button
            size="lg"
            variant={isRecording ? "default" : "outline"}
            className={isRecording ? "bg-green-500 text-white animate-pulse" : ""}
            onClick={() => setIsRecording(!isRecording)}
          >
            <FiMic className="w-6 h-6" />
          </Button>

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your answer..."
            className="flex-1"
          />

          <Button size="lg" variant="default" onClick={handleSend}>
            <FiSend className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="w-1/2">
        <ResumePreview data={resumeData} />
      </div>
    </div>
  );
};

export default App;
