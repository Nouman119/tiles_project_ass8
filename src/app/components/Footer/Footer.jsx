import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    // Responsive footer with dark theme background
    <footer className="bg-[#0a1426] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Tiles Bazar</h2>
          <p className="text-gray-400 mb-4 text-sm">
            Premium tiles and modern interior solutions for your dream spaces. Follow us to stay updated with our latest collections.
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
            <li className="hover:text-white cursor-pointer">All Tiles</li>
            <li className="hover:text-white cursor-pointer">My Profile</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <div className="text-gray-400 text-sm space-y-3">
            
            <p className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-[#CB3C0C] shrink-0 mt-0.5" />
              <span>45, Kemal Ataturk Avenue, Level 4, Banani, Dhaka-1212</span>
            </p>

            {/* Email */}
            <p className="flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-[#CB3C0C] shrink-0" />
              <span>hello@TilesBazar.com</span>
            </p>

            {/* Phone */}
            <p className="flex items-center gap-2.5">
              <Phone className="w-5 h-5 text-[#CB3C0C] shrink-0" />
              <span>+880 1712-345678</span>
            </p>

          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Message</h3>
          <input type="email" placeholder="Your email" className="input input-bordered w-full mb-2 bg-gray-800 border-none text-sm text-white" />
          <textarea placeholder="How can we help?" className="textarea textarea-bordered w-full mb-2 bg-gray-800 border-none text-sm text-white"></textarea>
          <button className="btn bg-[#CB3C0C] hover:bg-[#b0320a] border-none w-full text-white">Send</button>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-xs mt-12 border-t border-gray-800 pt-6">
        © 2026 Tiles Bazar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;