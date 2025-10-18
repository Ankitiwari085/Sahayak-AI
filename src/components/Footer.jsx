import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-8 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h3 className="text-2xl font-bold mb-2 text-teal-400">ResumeAI</h3>
          <p className="text-gray-400">
            Empowering every skill, one resume at a time.
          </p>
        </div>

        {/* Support Section */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Support</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-teal-400 cursor-pointer transition">Help Center</li>
            <li className="hover:text-teal-400 cursor-pointer transition">Contact</li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Legal</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-teal-400 cursor-pointer transition">Privacy Policy</li>
            <li className="hover:text-teal-400 cursor-pointer transition">Terms of Use</li>
          </ul>
        </div>

        {/* Newsletter / Social */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-teal-400 transition">Facebook</a>
            <a href="#" className="hover:text-teal-400 transition">Twitter</a>
            <a href="#" className="hover:text-teal-400 transition">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ResumeAI. All rights reserved.
      </div>
    </footer>
  );
}
