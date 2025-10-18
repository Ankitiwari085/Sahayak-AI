import React, { useContext } from "react";
import { Mic, MessageCircle } from "lucide-react";
import { FaUserCog, FaFileAlt, FaRocket } from "react-icons/fa";
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
      <section className="container mx-auto px-4 py-20">
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
              style={{ animationDelay: `${index * 0.1}s` }}
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

     
    </div>
  );
}
