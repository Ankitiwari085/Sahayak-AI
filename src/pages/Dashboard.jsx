import React, { useState, useEffect } from 'react';

import { FaUser, FaClipboardList, FaBell, FaCog, FaFileAlt, FaBriefcase, FaChartLine, FaEdit, FaTrash, FaEye, FaCheck, FaClock, FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Dashboard({ user, applications = [], onUpdateProfile, onSignOut }) {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTab = location.state?.tab || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Application Update', message: 'Your application has been reviewed', time: '2h ago', read: false },
    { id: 2, title: 'Resume Tip', message: 'Add more skills to improve profile', time: '1d ago', read: false },
  ]);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: user?.phone || '+1234567890',
    location: user?.location || 'New York, USA',
    profession: user?.profession || 'Electrician',
    experience: user?.experience || '5 years',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const htmlTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setTheme(htmlTheme);
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Update active tab when location state changes
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  // Generate notifications when applications change
  useEffect(() => {
    if (applications.length > 0) {
      const latestApp = applications[applications.length - 1];
      const appExists = notifications.some(n => n.message.includes(latestApp.position || 'Position'));
      
      if (!appExists && latestApp.position) {
        setNotifications(prev => [{
          id: Date.now(),
          title: 'New Application Submitted',
          message: `Your application for ${latestApp.position} at ${latestApp.company || 'the company'} has been submitted successfully`,
          time: 'Just now',
          read: false
        }, ...prev]);
      }
    }
  }, [applications]);

  const stats = [
    { label: 'Total Apps', value: applications.length, icon: FaClipboardList },
    { label: 'Pending', value: applications.filter(a => !a.status).length, icon: FaClock },
    { label: 'Accepted', value: applications.filter(a => a.status === 'accepted').length, icon: FaCheck },
    { label: 'Views', value: 25, icon: FaEye },
  ];

  return (
    <div className={`min-h-screen pt-20 ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'} transition-colors`}>
      <div className="container mx-auto px-4 py-8">
        <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 mb-6 shadow-sm`}>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-full ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'} flex items-center justify-center`}>
                <FaUser className={`text-3xl ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Welcome, {profileData.name}!</h1>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{profileData.profession}</p>
              </div>
            </div>
            <button onClick={onSignOut} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Sign Out</button>
          </div>
        </div>

        <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl p-2 mb-6 shadow-sm`}>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: FaChartLine },
              { id: 'profile', label: 'Profile', icon: FaUser },
              { id: 'applications', label: 'Applications', icon: FaClipboardList },
              { id: 'notifications', label: 'Notifications', icon: FaBell },
              { id: 'settings', label: 'Settings', icon: FaCog },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 
                  theme === 'dark' ? 'text-gray-400 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'
                }`}>
                <tab.icon /><span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div key={i} className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{s.label}</p>
                      <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{s.value}</p>
                    </div>
                    <s.icon className={`text-2xl ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                </div>
              ))}
            </div>
            <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <button onClick={() => navigate('/chat')} className={`flex items-center gap-3 p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-blue-50 hover:bg-blue-100'}`}>
                  <FaFileAlt className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
                  <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Create Resume</span>
                </button>
                <button onClick={() => setActiveTab('applications')} className={`flex items-center gap-3 p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-green-50 hover:bg-green-100'}`}>
                  <FaBriefcase className={theme === 'dark' ? 'text-green-400' : 'text-green-600'} />
                  <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Applications</span>
                </button>
                <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-3 p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-purple-50 hover:bg-purple-100'}`}>
                  <FaUser className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} />
                  <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Edit Profile</span>
                </button>
              </div>
            </div>

            {/* Recent Applications */}
            <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Recent Applications</h3>
                {applications.length > 0 && (
                  <button 
                    onClick={() => setActiveTab('applications')}
                    className={`text-sm ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                  >
                    View All
                  </button>
                )}
              </div>
              {applications.length > 0 ? (
                <div className="space-y-3">
                  {applications.slice(-3).reverse().map((app, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-50'}`}>
                      <div className="flex-1">
                        <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{app.position || 'Position'}</p>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{app.company || 'Company'} • Applied {new Date(app.id).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {app.status || 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-3`}>No applications yet. Start by creating your resume!</p>
                  <button 
                    onClick={() => navigate('/chat')}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Resume Now
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
            <div className="flex justify-between mb-6">
              <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Profile</h3>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                  <FaEdit /> Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => { onUpdateProfile?.(profileData); setIsEditing(false); }} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg">
                    <FaCheck /> Save
                  </button>
                  <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg">
                    <FaTimes /> Cancel
                  </button>
                </div>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.keys(profileData).map(key => (
                <div key={key}>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} capitalize`}>{key}</label>
                  <input type="text" value={profileData[key]} disabled={!isEditing}
                    onChange={(e) => setProfileData({...profileData, [key]: e.target.value})}
                    className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'} ${!isEditing && 'opacity-60'}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
            <h3 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>My Applications</h3>
            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((app, i) => (
                  <div key={i} className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{app.position || 'Position'}</h4>
                        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{app.company || 'Company'}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {app.status || 'Pending'}
                      </span>
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
                      {app.location && <p><strong>Location:</strong> {app.location}</p>}
                      {app.salary && <p><strong>Salary:</strong> {app.salary}</p>}
                      {app.experience && <p><strong>Experience Required:</strong> {app.experience}</p>}
                      {app.skills && <p><strong>Skills:</strong> {app.skills}</p>}
                      <p><strong>Applied:</strong> {new Date(app.id).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaClipboardList className={`mx-auto text-6xl mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-4`}>No applications yet</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mb-4`}>Start your career journey by applying for jobs</p>
                <button 
                  onClick={() => navigate('/')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Jobs
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
            <h3 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
            {notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.map(n => (
                  <div key={n.id} className={`p-4 rounded-lg ${n.read ? (theme === 'dark' ? 'bg-slate-700/50 border border-slate-600' : 'bg-gray-50 border border-gray-200') : (theme === 'dark' ? 'bg-slate-700 border border-blue-500' : 'bg-blue-50 border border-blue-200')}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{n.title}</h4>
                      <div className="flex gap-2">
                        {!n.read && (
                          <button 
                            onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? {...x, read: true} : x))} 
                            className={`${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                            title="Mark as read"
                          >
                            <FaCheck />
                          </button>
                        )}
                        <button 
                          onClick={() => setNotifications(prev => prev.filter(x => x.id !== n.id))} 
                          className={`${theme === 'dark' ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'}`}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{n.message}</p>
                    <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{n.time}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaBell className={`mx-auto text-6xl mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-2`}>No notifications</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>You're all caught up!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
            <h3 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Settings</h3>
            <div className="space-y-6">
              {/* Notification Preferences */}
              <div>
                <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Notification Preferences</h4>
                <div className="space-y-3">
                  <div className={`flex justify-between items-center p-3 rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-50'}`}>
                    <div>
                      <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Email Notifications</span>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Receive updates about applications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className={`flex justify-between items-center p-3 rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-50'}`}>
                    <div>
                      <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>SMS Notifications</span>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Get text updates on your phone</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className={`flex justify-between items-center p-3 rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-50'}`}>
                    <div>
                      <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Application Updates</span>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Notify when application status changes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div>
                <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Privacy</h4>
                <div className="space-y-3">
                  <div className={`flex justify-between items-center p-3 rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-50'}`}>
                    <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Profile Visibility</span>
                    <select className={`px-3 py-1 rounded border ${theme === 'dark' ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                      <option>Public</option>
                      <option>Private</option>
                      <option>Employers Only</option>
                    </select>
                  </div>
                  <div className={`flex justify-between items-center p-3 rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-50'}`}>
                    <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Show Resume to Recruiters</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Account Management */}
              <div>
                <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Account</h4>
                <div className="space-y-3">
                  <button className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'border-slate-600 text-gray-300 hover:bg-slate-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors`}>
                    Change Password
                  </button>
                  <button className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'border-slate-600 text-gray-300 hover:bg-slate-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors`}>
                    Download My Data
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div>
                <h4 className="font-semibold mb-3 text-red-600">Danger Zone</h4>
                <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-red-900/50 bg-red-900/10' : 'border-red-200 bg-red-50'}`}>
                  <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Once you delete your account, there is no going back. Please be certain.</p>
                  <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
