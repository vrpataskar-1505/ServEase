import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../context/AuthContext';

const STATUS_STYLES = {
  pending:   'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const STATUS_ICONS = {
  pending:   '⏳',
  confirmed: '✅',
  completed: '🎉',
  cancelled: '❌',
};

export default function MyBookings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [cancelling, setCancelling] = useState(null); // booking id being cancelled

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    API.get('/bookings/')
      .then(r => setBookings(r.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    setCancelling(bookingId);
    try {
      await API.delete(`/bookings/${bookingId}/`);
      setBookings(prev =>
        prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b)
      );
    } catch (err) {
      alert(err.response?.data?.error || 'Could not cancel booking.');
    } finally {
      setCancelling(null);
    }
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="text-5xl animate-bounce">⏳</div>
      <p className="text-gray-400 mt-4">Loading your bookings...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900" style={{fontFamily:'Syne,sans-serif'}}>My Bookings</h1>
          <p className="text-gray-500 mt-1">Track all your service appointments</p>
        </div>
        <Link to="/services" className="btn-primary text-sm py-2 px-5">+ Book New</Link>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No bookings yet</h3>
          <p className="text-gray-400 mb-6">You haven't booked any service. Let's fix that!</p>
          <Link to="/services" className="btn-primary">Explore Services</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div key={booking.id} className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                {/* Service image */}
                <img
                  src={booking.service_detail?.image_url || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150'}
                  alt={booking.service_detail?.name}
                  className="w-full sm:w-24 h-20 object-cover rounded-xl flex-shrink-0"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150'; }}
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base" style={{fontFamily:'Syne,sans-serif'}}>
                        {booking.service_detail?.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {booking.service_detail?.category_icon} {booking.service_detail?.category_name}
                      </p>
                    </div>
                    <span className={`badge ${STATUS_STYLES[booking.status] || 'bg-gray-100 text-gray-600'} text-xs`}>
                      {STATUS_ICONS[booking.status]} {booking.status_display}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                    <span>📅 {booking.booking_date}</span>
                    <span>🕐 {booking.booking_time}</span>
                    <span>📍 {booking.address.substring(0, 30)}...</span>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="font-bold text-orange-500 text-lg">₹{booking.total_price}</span>
                    <div className="flex gap-2">
                      {(booking.status === 'pending' || booking.status === 'confirmed') && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          disabled={cancelling === booking.id}
                          className="text-xs text-red-500 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50">
                          {cancelling === booking.id ? 'Cancelling...' : 'Cancel'}
                        </button>
                      )}
                      <Link to={`/services/${booking.service}`}
                        className="text-xs text-orange-500 border border-orange-200 hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-colors">
                        View Service
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
