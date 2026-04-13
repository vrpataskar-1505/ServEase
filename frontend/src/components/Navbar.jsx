import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{fontFamily:'Syne,sans-serif'}}>S</div>
          <span className="text-xl font-bold text-gray-900" style={{fontFamily:'Syne,sans-serif'}}>
            Serv<span className="text-orange-500">Ease</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}>
            Home
          </Link>
          <Link to="/services" className={`text-sm font-medium transition-colors ${isActive('/services') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}>
            Services
          </Link>
          {user && (
            <Link to="/my-bookings" className={`text-sm font-medium transition-colors ${isActive('/my-bookings') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}>
              My Bookings
            </Link>
          )}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold text-sm">
                  {(user.first_name || user.username).charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user.first_name || user.username}
                </span>
              </div>
              <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-500 transition-colors font-medium">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
                Login
              </Link>
              <Link to="/register" className="btn-primary text-sm py-2 px-5">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium">Home</Link>
          <Link to="/services" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium">Services</Link>
          {user && <Link to="/my-bookings" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium">My Bookings</Link>}
          {user ? (
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-left text-red-500 font-medium">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium">Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary text-center">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
