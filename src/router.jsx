import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/navber";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Chat from "./Chat/chst"
import Dashboard from "./pages/Dashboard";
import { useState, createContext } from "react";
import AuthModal from "./components/AuthModal";
import ApplyModal from "./components/ApplyModal";
import ProfileView from "./pages/About";
// import Contact from "./pages/Contact";

export const AuthContext = createContext({});

function NavbarWithRouter({ onAuthClick, user, onApplyClick, onProfileAction }) {
  const navigate = useNavigate();
  return (
    <Navbar 
      onAuthClick={onAuthClick} 
      user={user} 
      onApplyClick={onApplyClick} 
      onProfileAction={(action) => onProfileAction(action, navigate)} 
    />
  );
}

export default function Router() {
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const [applications, setApplications] = useState([]);

  const handleProfileAction = (action, navigate) => {
    if (action === 'signout') {
      setUser(null);
      navigate('/');
    }
    if (action === 'profile') {
      navigate('/dashboard', { state: { tab: 'profile' } });
    }
    if (action === 'applications') {
      navigate('/dashboard', { state: { tab: 'applications' } });
    }
    if (action === 'notifications') {
      navigate('/dashboard', { state: { tab: 'notifications' } });
    }
    if (action === 'settings') {
      navigate('/dashboard', { state: { tab: 'settings' } });
    }
  };

  const handleUpdateProfile = (profileData) => {
    setUser(prev => ({ ...prev, ...profileData }));
  };

  return (
    <AuthContext.Provider value={{ user, openAuth: ()=>setAuthOpen(true) }}>
      <BrowserRouter>
        <NavbarWithRouter 
          onAuthClick={() => setAuthOpen(true)} 
          user={user} 
          onApplyClick={()=>setApplyOpen(true)} 
          onProfileAction={handleProfileAction} 
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/dashboard" element={
            <Dashboard 
              user={user} 
              applications={applications} 
              onUpdateProfile={handleUpdateProfile}
              onSignOut={() => { setUser(null); }}
            />
          } />
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>

        <Footer />

        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onLogin={(u)=>setUser(u)} />
        <ApplyModal open={applyOpen} onClose={()=>setApplyOpen(false)} onSubmit={(form)=>setApplications(prev=>[...prev,{...form, id:Date.now()}])} />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
