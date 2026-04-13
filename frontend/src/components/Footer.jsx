import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold">S</div>
            <span className="text-xl font-bold text-white" style={{fontFamily:'Syne,sans-serif'}}>
              Serv<span className="text-orange-400">Ease</span>
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Trusted home services at your doorstep. Quality professionals, on time, every time.
          </p>
          <div className="flex gap-3 mt-4 text-xl">
            <span title="Facebook" className="cursor-pointer hover:text-orange-400 transition-colors">📘</span>
            <span title="Instagram" className="cursor-pointer hover:text-orange-400 transition-colors">📸</span>
            <span title="Twitter" className="cursor-pointer hover:text-orange-400 transition-colors">🐦</span>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-semibold mb-4" style={{fontFamily:'Syne,sans-serif'}}>Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-orange-400 transition-colors">Services</Link></li>
            <li><Link to="/my-bookings" className="hover:text-orange-400 transition-colors">My Bookings</Link></li>
            <li><Link to="/register" className="hover:text-orange-400 transition-colors">Create Account</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4" style={{fontFamily:'Syne,sans-serif'}}>Contact</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>📞 1800-123-4567 (Toll Free)</li>
            <li>📧 support@servease.in</li>
            <li>🕐 Mon–Sat, 8 AM – 8 PM</li>
            <li>📍 Available across major Indian cities</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 px-4 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} ServEase. Made with ❤️ by a final-year B.Tech student.
      </div>
    </footer>
  );
}
