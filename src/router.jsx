import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navber";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Chat from "./Chat/chst"
import { useState, createContext } from "react";
import AuthModal from "./components/AuthModal";
import ApplyModal from "./components/ApplyModal";
import ProfileView from "./pages/About";
// import Contact from "./pages/Contact";

export const AuthContext = createContext({});

export default function Router() {
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const [applications, setApplications] = useState([]);

  return (
    <AuthContext.Provider value={{ user, openAuth: ()=>setAuthOpen(true) }}>
      <BrowserRouter>
        <Navbar onAuthClick={() => setAuthOpen(true)} user={user} onApplyClick={()=>setApplyOpen(true)} onProfileAction={(action)=>{
          if(action==='signout') setUser(null);
          if(action==='profile') alert('Open profile (not implemented)');
          if(action==='applications') alert(JSON.stringify(applications,null,2));
          if(action==='notifications') alert('No notifications');
          if(action==='settings') alert('Settings');
        }} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/chat" element={<Chat />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>

        <Footer />

        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onLogin={(u)=>setUser(u)} />
        <ApplyModal open={applyOpen} onClose={()=>setApplyOpen(false)} onSubmit={(form)=>setApplications(prev=>[...prev,{...form, id:Date.now()}])} />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
