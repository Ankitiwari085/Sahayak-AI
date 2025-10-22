import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaUsers, FaChartLine, FaPlus, FaEye, FaTrash, FaEdit, FaCheck, FaTimes, FaClock, FaBuilding, FaUserTie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function EmployerDashboard({ user, jobPostings = [], applicants = [], onPostJob, onDeleteJob, onSignOut }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [theme, setTheme] = useState('light');
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    const htmlTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setTheme(htmlTheme);
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Filter applicants by selected job
  const filteredApplicants = selectedJob 
    ? applicants.filter(app => app.jobId === selectedJob.id)
    : applicants;

  // Filter applicants by category
  const categoryFilteredApplicants = filterCategory === 'all' 
    ? filteredApplicants
    : filteredApplicants.filter(app => app.category === filterCategory);

  const stats = [
    { label: 'Active Jobs', value: jobPostings.length, icon: FaBriefcase, color: 'blue' },
    { label: 'Total Applicants', value: applicants.length, icon: FaUsers, color: 'green' },
    { label: 'Pending Review', value: applicants.filter(a => !a.status || a.status === 'pending').length, icon: FaClock, color: 'yellow' },
    { label: 'Hired', value: applicants.filter(a => a.status === 'accepted').length, icon: FaCheck, color: 'purple' },
  ];

  const uniqueCategories = ['all', ...new Set(applicants.map(a => a.category).filter(Boolean))];

  return (
    <div className={`min-h-screen pt-20 ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'} transition-colors`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className={`${theme === 'dark' ? 'bg-gradient-to-r from-slate-800 to-slate-700' : 'bg-gradient-to-r from-blue-600 to-indigo-600'} rounded-2xl p-6 mb-6 shadow-lg`}>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                {user?.userType === 'organisation' ? (
                  <FaBuilding className="text-3xl text-white" />
                ) : (
                  <FaUserTie className="text-3xl text-white" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {user?.userType === 'organisation' ? 'Organization' : 'Employer'} Dashboard
                </h1>
                <p className="text-blue-100">Welcome, {user?.name || 'User'}!</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={onPostJob}
                className="flex items-center gap-2 px-5 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-md hover:shadow-lg"
              >
                <FaPlus /> Post New Job
              </button>
              <button 
                onClick={onSignOut} 
                className="px-5 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all shadow-md"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, i) => (
            <div key={i} className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-md hover:shadow-lg transition-all`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-medium`}>{stat.label}</p>
                  <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mt-2`}>{stat.value}</p>
                </div>
                <div className={`p-4 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                  stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                  stat.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                  'bg-purple-100 dark:bg-purple-900/30'
                }`}>
                  <stat.icon className={`text-2xl ${
                    stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                    stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
                    stat.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-purple-600 dark:text-purple-400'
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl p-2 mb-6 shadow-md`}>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: FaChartLine },
              { id: 'jobs', label: 'My Job Postings', icon: FaBriefcase },
              { id: 'applicants', label: 'Applicants', icon: FaUsers },
            ].map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                    : theme === 'dark' 
                      ? 'text-gray-400 hover:bg-slate-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Recent Job Postings */}
            <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-md`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Recent Job Postings</h3>
                {jobPostings.length > 0 && (
                  <button 
                    onClick={() => setActiveTab('jobs')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All →
                  </button>
                )}
              </div>
              {jobPostings.length > 0 ? (
                <div className="space-y-3">
                  {jobPostings.slice(-3).reverse().map((job, idx) => (
                    <div key={idx} className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} hover:shadow-md transition-all`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{job.jobTitle}</h4>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                            {job.jobCategory} • {job.location}
                          </p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                            Posted: {new Date(job.id).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400`}>
                            {applicants.filter(a => a.jobId === job.id).length} Applicants
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaBriefcase className={`mx-auto text-6xl mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-4`}>No job postings yet</p>
                  <button 
                    onClick={onPostJob}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                  >
                    Post Your First Job
                  </button>
                </div>
              )}
            </div>

            {/* Recent Applicants */}
            <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-md`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Recent Applicants</h3>
                {applicants.length > 0 && (
                  <button 
                    onClick={() => setActiveTab('applicants')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All →
                  </button>
                )}
              </div>
              {applicants.length > 0 ? (
                <div className="space-y-3">
                  {applicants.slice(-5).reverse().map((applicant, idx) => (
                    <div key={idx} className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{applicant.name || 'Applicant'}</h4>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Applied for: {applicant.position || applicant.category}
                          </p>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                            {new Date(applicant.id).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          applicant.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                          applicant.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {applicant.status || 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaUsers className={`mx-auto text-6xl mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No applicants yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Job Postings Tab */}
        {activeTab === 'jobs' && (
          <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-md`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>My Job Postings</h3>
              <button 
                onClick={onPostJob}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                <FaPlus /> Post Job
              </button>
            </div>
            {jobPostings.length > 0 ? (
              <div className="grid gap-4">
                {jobPostings.map((job, i) => (
                  <div key={i} className={`p-5 rounded-lg border ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} hover:shadow-lg transition-all`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{job.jobTitle}</h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                          {job.jobCategory} • {job.location} • {job.jobType}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedJob(job)}
                          className={`p-2 rounded ${theme === 'dark' ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'} transition-all`}
                          title="View applicants"
                        >
                          <FaEye />
                        </button>
                        <button 
                          onClick={() => onDeleteJob && onDeleteJob(job.id)}
                          className={`p-2 rounded ${theme === 'dark' ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' : 'bg-red-100 text-red-600 hover:bg-red-200'} transition-all`}
                          title="Delete job"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
                      {job.salary && <p><strong>Salary:</strong> {job.salary}</p>}
                      {job.experienceRequired && <p><strong>Experience:</strong> {job.experienceRequired}</p>}
                      {job.numberOfPositions && <p><strong>Positions:</strong> {job.numberOfPositions}</p>}
                      {job.description && <p><strong>Description:</strong> {job.description}</p>}
                      {job.requiredSkills && <p><strong>Skills:</strong> {job.requiredSkills}</p>}
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
                        Posted: {new Date(job.id).toLocaleDateString()} • {applicants.filter(a => a.jobId === job.id).length} applicants
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <FaBriefcase className={`mx-auto text-6xl mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-4 text-lg`}>No job postings yet</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mb-6`}>Start hiring by posting your first job!</p>
                <button 
                  onClick={onPostJob}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg"
                >
                  Post Your First Job
                </button>
              </div>
            )}
          </div>
        )}

        {/* Applicants Tab */}
        {activeTab === 'applicants' && (
          <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-md`}>
            <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Applicants</h3>
            
            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Filter by Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                >
                  {uniqueCategories.map(cat => (
                    <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                  ))}
                </select>
              </div>
              
              {jobPostings.length > 0 && (
                <div className="flex-1 min-w-[200px]">
                  <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Filter by Job Posting
                  </label>
                  <select
                    value={selectedJob?.id || ''}
                    onChange={(e) => setSelectedJob(jobPostings.find(j => j.id === parseInt(e.target.value)) || null)}
                    className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  >
                    <option value="">All Jobs</option>
                    {jobPostings.map(job => (
                      <option key={job.id} value={job.id}>{job.jobTitle}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {categoryFilteredApplicants.length > 0 ? (
              <div className="space-y-4">
                {categoryFilteredApplicants.map((applicant, i) => (
                  <div key={i} className={`p-5 rounded-lg border ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} hover:shadow-lg transition-all`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {applicant.name || 'Applicant Name'}
                        </h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {applicant.position || applicant.category}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        applicant.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        applicant.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {applicant.status || 'Pending'}
                      </span>
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
                      {applicant.email && <p><strong>Email:</strong> {applicant.email}</p>}
                      {applicant.phone && <p><strong>Phone:</strong> {applicant.phone}</p>}
                      {applicant.location && <p><strong>Location:</strong> {applicant.location}</p>}
                      {applicant.experience && <p><strong>Experience:</strong> {applicant.experience}</p>}
                      {applicant.skills && <p><strong>Skills:</strong> {applicant.skills}</p>}
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
                        Applied: {new Date(applicant.id).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <FaUsers className={`mx-auto text-6xl mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-2 text-lg`}>No applicants found</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {jobPostings.length === 0 
                    ? 'Post a job to start receiving applications' 
                    : 'Applicants will appear here once they apply for your jobs'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
