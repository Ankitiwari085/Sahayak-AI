import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Brand Section */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-bold mb-2 text-teal-400">ResumeAI</h3>
          <p className="text-gray-400 text-sm sm:text-base">
            Empowering every skill, one resume at a time.
          </p>
        </div>

        {/* Support Section */}
        <div className="text-center sm:text-left">
          <h4 className="font-semibold mb-3 md:mb-4 text-white text-base sm:text-lg">Support</h4>
          <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
            <li className="hover:text-teal-400 cursor-pointer transition">Help Center</li>
            <li className="hover:text-teal-400 cursor-pointer transition">Contact</li>
          </ul>
        </div>

        {/* Legal Section */}
        <div className="text-center sm:text-left">
          <h4 className="font-semibold mb-3 md:mb-4 text-white text-base sm:text-lg">Legal</h4>
          <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
            <li className="hover:text-teal-400 cursor-pointer transition">Privacy Policy</li>
            <li className="hover:text-teal-400 cursor-pointer transition">Terms of Use</li>
          </ul>
        </div>

        {/* Newsletter / Social */}
        <div className="text-center sm:text-left">
          <h4 className="font-semibold mb-3 md:mb-4 text-white text-base sm:text-lg">Follow Us</h4>
          <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4 flex-wrap gap-y-2">
            <a href="#" className="hover:text-teal-400 transition text-sm sm:text-base">Facebook</a>
            <a href="#" className="hover:text-teal-400 transition text-sm sm:text-base">Twitter</a>
            <a href="#" className="hover:text-teal-400 transition text-sm sm:text-base">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-8 sm:mt-10 md:mt-12 border-t border-gray-800 pt-4 sm:pt-5 md:pt-6 text-center text-gray-500 text-xs sm:text-sm">
        © {new Date().getFullYear()} ResumeAI. All rights reserved.
      </div>
    </footer>
  );
}
