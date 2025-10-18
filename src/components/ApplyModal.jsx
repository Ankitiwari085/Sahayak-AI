import React, { useState } from 'react';

export default function ApplyModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', role: '' });
  if (!open) return null;

  const stop = (e) => e.stopPropagation();

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6" onClick={stop}>
        <h3 className="text-xl font-semibold mb-3">Apply for Job</h3>
        <p className="text-sm text-gray-500 mb-4">Fill your details and submit your application.</p>

        <div className="grid grid-cols-1 gap-3">
          <input value={form.fullName} onChange={(e)=>setForm({...form, fullName:e.target.value})} placeholder="Full name" className="border border-gray-300 bg-gray-50 p-2 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
          <input value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} placeholder="Email" className="border border-gray-300 bg-gray-50 p-2 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
          <input value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} placeholder="Phone" className="border border-gray-300 bg-gray-50 p-2 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
          <input value={form.role} onChange={(e)=>setForm({...form, role:e.target.value})} placeholder="Role you're applying for" className="border border-gray-300 bg-gray-50 p-2 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
        </div>

        <div className="flex justify-end space-x-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-100">Cancel</button>
          <button onClick={()=>{ onSubmit(form); onClose(); }} className="px-4 py-2 rounded bg-emerald-600 text-white">Submit</button>
        </div>
      </div>
    </div>
  );
}
