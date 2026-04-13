import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../context/AuthContext';

const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM',
];

// Get today's date in YYYY-MM-DD format (min selectable date)
const today = new Date().toISOString().split('T')[0];

export default function BookingPage() {
  const { serviceId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [service, setService]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]     = useState(false);
  const [error, setError]         = useState('');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    booking_date: '',
    booking_time: '',
    notes: '',
  });

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    API.get(`/services/${serviceId}/`)
      .then(r => {
        setService(r.data);
        // Pre-fill name from user
        setForm(prev => ({ ...prev, name: `${user.first_name} ${user.last_name}`.trim() || user.username }));
      })
      .catch(() => setError('Service not found.'))
      .finally(() => setLoading(false));
  }, [serviceId, user, navigate]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.booking_time) { setError('Please select a time slot.'); return; }

    setSubmitting(true);
    try {
      await API.post('/bookings/', {
        ...form,
        service: service.id,
      });
      setSuccess(true);
    } catch (err) {
      const data = err.response?.data;
      if (typeof data === 'object') {
        const msgs = Object.values(data).flat().join(' ');
        setError(msgs || 'Something went wrong. Please try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-400 text-lg">Loading...</div>;
  if (!service) return (
    <div className="text-center py-20">
      <p className="text-gray-500">{error || 'Service not found.'}</p>
      <Link to="/services" className="btn-primary mt-4 inline-block">Back to Services</Link>
    </div>
  );

  // Success screen
  if (success) return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <div className="text-7xl mb-5">🎉</div>
      <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{fontFamily:'Syne,sans-serif'}}>Booking Confirmed!</h2>
      <p className="text-gray-500 mb-2">
        <strong>{service.name}</strong> has been booked for <strong>{form.booking_date}</strong> at <strong>{form.booking_time}</strong>.
      </p>
      <p className="text-gray-400 text-sm mb-8">Our professional will contact you before arriving. 🛠️</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/my-bookings" className="btn-primary">View My Bookings</Link>
        <Link to="/services" className="btn-outline">Book Another</Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-1" style={{fontFamily:'Syne,sans-serif'}}>Book Service</h1>
      <p className="text-gray-500 mb-8">Fill in the details and we'll send a professional to you.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm p-6 md:p-8 space-y-5">

            <h2 className="font-bold text-gray-800 text-lg border-b pb-3" style={{fontFamily:'Syne,sans-serif'}}>Your Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input name="name" required value={form.name} onChange={handleChange}
                  placeholder="Rahul Sharma" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input name="phone" required value={form.phone} onChange={handleChange}
                  placeholder="10-digit mobile number" maxLength={10} className="input-field" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <textarea name="address" required value={form.address} onChange={handleChange}
                placeholder="Flat no., building name, street..." rows={2} className="input-field resize-none" />
            </div>

            <div className="w-40">
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
              <input name="pincode" required value={form.pincode} onChange={handleChange}
                placeholder="411001" maxLength={6} className="input-field" />
            </div>

            <h2 className="font-bold text-gray-800 text-lg border-b pb-3 pt-2" style={{fontFamily:'Syne,sans-serif'}}>Schedule</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input type="date" name="booking_date" required value={form.booking_date}
                min={today} onChange={handleChange} className="input-field w-auto" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {TIME_SLOTS.map(slot => (
                  <button key={slot} type="button"
                    onClick={() => setForm(prev => ({ ...prev, booking_time: slot }))}
                    className={`py-2 px-2 text-sm rounded-xl border font-medium transition-all ${
                      form.booking_time === slot
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-orange-400'
                    }`}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions <span className="text-gray-400 font-normal">(optional)</span></label>
              <textarea name="notes" value={form.notes} onChange={handleChange}
                placeholder="Any special requests or things the professional should know..."
                rows={2} className="input-field resize-none" />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
                ⚠️ {error}
              </div>
            )}

            <button type="submit" disabled={submitting}
              className="btn-primary w-full text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? 'Confirming your booking...' : `Confirm Booking — ₹${service.price}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-sm p-6 sticky top-24">
            <h3 className="font-bold text-gray-800 mb-4" style={{fontFamily:'Syne,sans-serif'}}>Order Summary</h3>
            <img
              src={service.image_url || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300'}
              alt={service.name}
              className="w-full h-36 object-cover rounded-2xl mb-4"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300'; }}
            />
            <div className="flex items-center gap-1.5 mb-2">
              <span>{service.category_icon}</span>
              <span className="text-xs text-orange-500 font-semibold">{service.category_name}</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-1">{service.name}</h4>
            <p className="text-xs text-gray-500 mb-4">⏱️ ~{service.duration_hours} hr{service.duration_hours > 1 ? 's' : ''}</p>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Service charge</span>
                <span>₹{service.price}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Platform fee</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 pt-2 border-t">
                <span>Total</span>
                <span className="text-orange-500 text-lg">₹{service.price}</span>
              </div>
            </div>

            <div className="mt-4 bg-green-50 rounded-xl p-3 text-xs text-green-700 flex gap-2">
              <span>🛡️</span>
              <span>Verified professional. 100% satisfaction guaranteed or we'll redo it for free.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
