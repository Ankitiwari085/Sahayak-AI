import React, { useState } from 'react';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaBriefcase, FaMapMarkerAlt, FaTools, FaClock } from 'react-icons/fa';

export default function ApplyModal({ open, onClose, onSubmit, availableJobs = [] }) {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    category: '',
    position: '',
    location: '',
    experience: '',
    skills: '',
    jobId: '' 
  });

  const blueCollarCategories = [
    'Electrician',
    'Plumber',
    'Carpenter',
    'Welder',
    'Mason/Brick Layer',
    'Painter',
    'HVAC Technician',
    'Construction Worker',
    'Mechanic',
    'Driver',
    'Security Guard',
    'Cleaner/Janitor',
    'Warehouse Worker',
    'Factory Worker',
    'Delivery Personnel',
    'Chef/Cook',
    'Gardener/Landscaper',
    'Other'
  ];

  if (!open) return null;

  const stop = (e) => e.stopPropagation();

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.category) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit(form);
    setForm({ 
      name: '', 
      email: '', 
      phone: '', 
      category: '',
      position: '',
      location: '',
      experience: '',
      skills: '',
      jobId: '' 
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8" onClick={stop}>
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 rounded-t-2xl relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors">
            <FaTimes className="text-xl" />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-lg">
              <FaBriefcase className="text-3xl text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Apply for Job</h3>
              <p className="text-emerald-100">Fill in your details to submit your application</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto">
          {/* Apply to specific job (if available) */}
          {availableJobs.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Apply to Specific Job (Optional)
              </label>
              <select
                value={form.jobId}
                onChange={(e) => {
                  const selectedJob = availableJobs.find(j => j.id === parseInt(e.target.value));
                  setForm({
                    ...form, 
                    jobId: e.target.value,
                    position: selectedJob?.jobTitle || '',
                    category: selectedJob?.jobCategory || form.category
                  });
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              >
                <option value="">General Application</option>
                {availableJobs.map(job => (
                  <option key={job.id} value={job.id}>
                    {job.jobTitle} - {job.companyName || 'Employer'}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaUser className="text-emerald-600" />
                Full Name <span className="text-red-500">*</span>
              </label>
              <input 
                value={form.name} 
                onChange={(e) => setForm({...form, name: e.target.value})} 
                placeholder="Enter your full name" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" 
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaEnvelope className="text-blue-600" />
                Email
              </label>
              <input 
                type="email"
                value={form.email} 
                onChange={(e) => setForm({...form, email: e.target.value})} 
                placeholder="your.email@example.com" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" 
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaPhone className="text-green-600" />
                Phone <span className="text-red-500">*</span>
              </label>
              <input 
                type="tel"
                value={form.phone} 
                onChange={(e) => setForm({...form, phone: e.target.value})} 
                placeholder="+91 98765 43210" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" 
              />
            </div>

            {/* Job Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Category <span className="text-red-500">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({...form, category: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              >
                <option value="">Select category</option>
                {blueCollarCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Position/Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaBriefcase className="text-purple-600" />
                Desired Position
              </label>
              <input 
                value={form.position} 
                onChange={(e) => setForm({...form, position: e.target.value})} 
                placeholder="e.g., Senior Electrician" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" 
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-600" />
                Location
              </label>
              <input 
                value={form.location} 
                onChange={(e) => setForm({...form, location: e.target.value})} 
                placeholder="City, State" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" 
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaClock className="text-orange-600" />
                Experience
              </label>
              <input 
                value={form.experience} 
                onChange={(e) => setForm({...form, experience: e.target.value})} 
                placeholder="e.g., 3 years" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" 
              />
            </div>

            {/* Skills */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaTools className="text-indigo-600" />
                Skills
              </label>
              <input 
                value={form.skills} 
                onChange={(e) => setForm({...form, skills: e.target.value})} 
                placeholder="e.g., Wiring, Circuit Testing, Safety Compliance (comma separated)" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" 
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-4 p-6 border-t">
          <button 
            onClick={onClose} 
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}
