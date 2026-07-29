import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Install: npm install react-icons

const Footer = () => {
  return (
    // Responsive footer with dark theme background
    <footer className="bg-[#0a1426] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Tiles Bazar</h2>
          <p className="text-gray-400 mb-4 text-sm">
            Creating amazing digital experiences for businesses worldwide. Follow us to stay updated.
          </p>
          <div className="flex gap-4">
            <FaFacebook className="text-xl cursor-pointer hover:text-blue-500"/>
            <FaTwitter className="text-xl cursor-pointer hover:text-blue-400"/>
            <FaInstagram className="text-xl cursor-pointer hover:text-pink-500"/>
            <FaLinkedin className="text-xl cursor-pointer hover:text-blue-700"/>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Services</li>
            <li className="hover:text-white cursor-pointer">Portfolio</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <div className="text-gray-400 text-sm space-y-2">
            <p>📍 123 Innovation Drive, Suite 400, San Francisco, CA 94107</p>
            <p>✉️ hello@TilesBazar.com</p>
            <p>📞 +1 (555) 123-4567</p>
          </div>
        </div>

        {/* Quick Message (DaisyUI input styling) */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <input type="email" placeholder="Your email" className="input input-bordered w-full mb-2 bg-gray-800 border-none text-sm" />
          <textarea placeholder="How can we help?" className="textarea textarea-bordered w-full mb-2 bg-gray-800 border-none text-sm"></textarea>
          <button className="btn btn-info w-full text-white">Send</button>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-xs mt-12 border-t border-gray-800 pt-6">
        © 2024 Tiles Bazar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;