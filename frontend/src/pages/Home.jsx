import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import ServiceCard from '../components/ServiceCard';

const STATS = [
  { number: '50,000+', label: 'Happy Customers' },
  { number: '1,200+', label: 'Verified Experts' },
  { number: '15+',    label: 'Cities Covered' },
  { number: '4.8★',  label: 'Average Rating' },
];

const HOW_IT_WORKS = [
  { step: '01', icon: '🔍', title: 'Choose a Service', desc: 'Browse from our wide range of professional home services.' },
  { step: '02', icon: '📅', title: 'Pick Date & Time', desc: 'Select a slot that works for you — we\'ll be there.' },
  { step: '03', icon: '✅', title: 'Sit Back & Relax', desc: 'A verified professional arrives on time and gets the job done.' },
];

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [popularServices, setPopularServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/services/categories/').then(res => setCategories(res.data)).catch(() => {});
    API.get('/services/').then(res => {
      // Show top 6 by bookings
      const sorted = [...res.data].sort((a, b) => b.total_bookings - a.total_bookings);
      setPopularServices(sorted.slice(0, 6));
    }).catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/services?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <div>
      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-amber-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
              🏠 Home Services Made Simple
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-5">
              Expert Help,<br />
              <span className="text-orange-500">Right at Your</span><br />
              Doorstep
            </h1>
            <p className="text-gray-500 text-lg mb-8 max-w-md">
              Book verified professionals for plumbing, electrical, cleaning, and more — in just a few taps.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto md:mx-0">
              <input
                type="text"
                placeholder="What service do you need?"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 input-field"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Search
              </button>
            </form>

            <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              {['Plumbing', 'AC Service', 'Home Cleaning', 'Electrician'].map(tag => (
                <Link key={tag} to={`/services?search=${tag}`}
                  className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-orange-400 hover:text-orange-500 transition-colors">
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Hero illustration / image */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-orange-200 rounded-3xl rotate-6 opacity-30"></div>
              <div className="absolute inset-0 bg-orange-100 rounded-3xl rotate-3 opacity-50"></div>
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500"
                alt="Professional cleaner"
                className="relative w-full h-full object-cover rounded-3xl shadow-xl"
              />
              {/* Floating cards */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">Booking Confirmed!</p>
                  <p className="text-xs text-gray-400">AC Service • Today 3 PM</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-3">
                <div className="text-lg text-center">⭐ 4.9</div>
                <p className="text-xs text-gray-500 text-center">Top Rated</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="bg-orange-500 py-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {STATS.map(stat => (
            <div key={stat.label}>
              <div className="text-3xl font-bold" style={{fontFamily:'Syne,sans-serif'}}>{stat.number}</div>
              <div className="text-orange-100 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────── */}
      {categories.length > 0 && (
        <section className="py-16 max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Browse by Category</h2>
            <p className="text-gray-500">Pick what you need — we'll handle the rest</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {categories.map(cat => (
              <Link key={cat.id} to={`/services?category=${cat.id}`}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 group">
                <div className="text-3xl">{cat.icon}</div>
                <span className="text-xs font-semibold text-gray-700 text-center group-hover:text-orange-500 transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── POPULAR SERVICES ─────────────────────────────────── */}
      {popularServices.length > 0 && (
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Popular Services</h2>
                <p className="text-gray-500 mt-1">Most booked by our customers</p>
              </div>
              <Link to="/services" className="btn-outline text-sm py-2">View All →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularServices.map(s => <ServiceCard key={s.id} service={s} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">How ServEase Works</h2>
          <p className="text-gray-500">Get your service done in 3 easy steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item, i) => (
            <div key={i} className="text-center relative">
              {i < HOW_IT_WORKS.length - 1 && (
                <div className="hidden md:block absolute top-10 left-2/3 w-1/2 border-t-2 border-dashed border-orange-200"></div>
              )}
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 relative">
                {item.icon}
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2" style={{fontFamily:'Syne,sans-serif'}}>{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="bg-gray-900 py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-3" style={{fontFamily:'Syne,sans-serif'}}>
            Ready to get started?
          </h2>
          <p className="text-gray-400 mb-7">Join thousands of happy homeowners who trust ServEase.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-base px-8 py-3">Create Free Account</Link>
            <Link to="/services" className="border-2 border-gray-600 text-gray-300 hover:border-orange-400 hover:text-orange-400 font-semibold px-8 py-3 rounded-xl transition-all duration-200">
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
