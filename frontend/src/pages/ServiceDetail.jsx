import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../context/AuthContext';

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`text-lg ${i <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
      ))}
      <span className="text-gray-600 font-semibold ml-1">{rating} / 5</span>
    </div>
  );
}

export default function ServiceDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    API.get(`/services/${id}/`)
      .then(r => setService(r.data))
      .catch(() => setError('Service not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBookNow = () => {
    if (!user) {
      navigate('/login', { state: { from: `/book/${id}` } });
    } else {
      navigate(`/book/${id}`);
    }
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="text-5xl animate-bounce">⏳</div>
      <p className="text-gray-500 mt-4">Loading service details...</p>
    </div>
  );

  if (error || !service) return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="text-5xl mb-4">😕</div>
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Service Not Found</h2>
      <Link to="/services" className="btn-primary mt-4 inline-block">Browse Services</Link>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/" className="hover:text-orange-500">Home</Link>
        <span>/</span>
        <Link to="/services" className="hover:text-orange-500">Services</Link>
        <span>/</span>
        <span className="text-gray-700">{service.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left — image */}
        <div>
          <img
            src={service.image_url || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600'}
            alt={service.name}
            className="w-full h-72 md:h-96 object-cover rounded-3xl shadow-md"
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600'; }}
          />
        </div>

        {/* Right — details */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{service.category_icon}</span>
            <span className="text-sm text-orange-500 font-semibold">{service.category_name}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3" style={{fontFamily:'Syne,sans-serif'}}>
            {service.name}
          </h1>

          <Stars rating={service.rating} />
          <p className="text-sm text-gray-400 mt-1">{service.total_bookings.toLocaleString()}+ people have booked this</p>

          <p className="text-gray-600 mt-5 leading-relaxed">{service.description}</p>

          {/* What you get */}
          {service.what_you_get_list && service.what_you_get_list.length > 0 && (
            <div className="mt-5 bg-orange-50 rounded-2xl p-4">
              <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">What's Included</h3>
              <ul className="space-y-1.5">
                {service.what_you_get_list.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-green-500 font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Duration */}
          <div className="flex items-center gap-2 mt-5 text-sm text-gray-500">
            <span>⏱️</span>
            <span>Approx. duration: <strong className="text-gray-700">{service.duration_hours} hr{service.duration_hours > 1 ? 's' : ''}</strong></span>
          </div>

          {/* Price + Book */}
          <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 block">Price</span>
              <span className="text-4xl font-bold text-orange-500">₹{service.price}</span>
            </div>
            <button onClick={handleBookNow} className="btn-primary text-base px-8 py-3">
              Book Now →
            </button>
          </div>

          {!user && (
            <p className="text-xs text-gray-400 mt-3 text-center">
              You'll need to <Link to="/login" className="text-orange-500 underline">login</Link> before booking.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
