import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/navber";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WorkerHome from "./pages/WorkerHome";
import IndividualHome from "./pages/IndividualHome";
import OrganizationHome from "./pages/OrganizationHome";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Chat from "./Chat/chst"
import Dashboard from "./pages/Dashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import { useState, createContext } from "react";
import AuthModal from "./components/AuthModal";
import ApplyModal from "./components/ApplyModal";
import JobPostingModal from "./components/JobPostingModal";
import ProfileView from "./pages/About";
import WhatsAppSupport from "./components/WhatsAppSupport";
// import Contact from "./pages/Contact";

export const AuthContext = createContext({});

function NavbarWithRouter({ onAuthClick, user, onApplyClick, onPostJobClick, onProfileAction }) {
  const navigate = useNavigate();
  return (
    <Navbar 
      onAuthClick={onAuthClick} 
      user={user} 
      onApplyClick={onApplyClick}
      onPostJobClick={onPostJobClick}
      onProfileAction={(action) => onProfileAction(action, navigate)} 
    />
  );
}

export default function Router() {
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const [jobPostOpen, setJobPostOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [jobPostings, setJobPostings] = useState([]);

  const handleProfileAction = (action, navigate) => {
    if (action === 'signout') {
      setUser(null);
      navigate('/');
    }
    if (action === 'profile') {
      // Navigate to appropriate dashboard based on user type
      if (user?.userType === 'employee') {
        navigate('/dashboard', { state: { tab: 'profile' } });
      } else {
        navigate('/employer-dashboard', { state: { tab: 'overview' } });
      }
    }
    if (action === 'applications') {
      if (user?.userType === 'employee') {
        navigate('/dashboard', { state: { tab: 'applications' } });
      } else {
        navigate('/employer-dashboard', { state: { tab: 'applicants' } });
      }
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

  const handleJobPost = (jobData) => {
    setJobPostings(prev => [...prev, { ...jobData, id: Date.now(), postedBy: user?.name }]);
  };

  const handleDeleteJob = (jobId) => {
    setJobPostings(prev => prev.filter(job => job.id !== jobId));
  };

  const handleApply = (applicationData) => {
    setApplications(prev => [...prev, { ...applicationData, id: Date.now() }]);
  };

  return (
    <AuthContext.Provider value={{ user, openAuth: ()=>setAuthOpen(true) }}>
      <BrowserRouter>
        <NavbarWithRouter 
          onAuthClick={() => setAuthOpen(true)} 
          user={user} 
          onApplyClick={() => setApplyOpen(true)}
          onPostJobClick={() => setJobPostOpen(true)}
          onProfileAction={handleProfileAction} 
        />

        <Routes>
          <Route path="/" element={
            user?.userType === 'organisation' ? <OrganizationHome /> :
            user?.userType === 'individual' ? <IndividualHome /> :
            user?.userType === 'employee' ? <WorkerHome /> :
            <Home />
          } />
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
          <Route path="/employer-dashboard" element={
            <EmployerDashboard
              user={user}
              jobPostings={jobPostings}
              applicants={applications}
              onPostJob={() => setJobPostOpen(true)}
              onDeleteJob={handleDeleteJob}
              onSignOut={() => { setUser(null); }}
            />
          } />
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>

        <Footer />

        {/* WhatsApp Help & Support */}
        <WhatsAppSupport />

        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onLogin={(u)=>setUser(u)} />
        <ApplyModal 
          open={applyOpen} 
          onClose={()=>setApplyOpen(false)} 
          onSubmit={handleApply}
          availableJobs={jobPostings}
        />
        <JobPostingModal 
          open={jobPostOpen} 
          onClose={() => setJobPostOpen(false)} 
          onSubmit={handleJobPost}
          userType={user?.userType}
        />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
