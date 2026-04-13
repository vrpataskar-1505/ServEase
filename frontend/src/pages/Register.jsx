import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm]       = useState({ username: '', email: '', first_name: '', last_name: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  if (user) { navigate('/'); return null; }

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match."); return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.'); return;
    }
    if (form.phone && !/^\d{10}$/.test(form.phone)) {
      setError('Phone number must be exactly 10 digits.'); return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...data } = form;
      await register(data);
      navigate('/');
    } catch (err) {
      const data = err.response?.data;
      if (typeof data === 'object') {
        const msgs = Object.values(data).flat().join(' ');
        setError(msgs);
      } else {
        setError('Registration failed. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">S</div>
            <span className="text-2xl font-bold text-gray-900" style={{fontFamily:'Syne,sans-serif'}}>
              Serv<span className="text-orange-500">Ease</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900" style={{fontFamily:'Syne,sans-serif'}}>Create your account</h1>
          <p className="text-gray-500 mt-1 text-sm">Book home services in minutes</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-4">

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input name="first_name" value={form.first_name} onChange={handleChange}
                placeholder="Rahul" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input name="last_name" value={form.last_name} onChange={handleChange}
                placeholder="Sharma" className="input-field" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
            <input name="username" required value={form.username} onChange={handleChange}
              placeholder="rahul_sharma" autoComplete="username" className="input-field" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="rahul@email.com" className="input-field" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input name="phone" value={form.phone} onChange={handleChange}
              placeholder="10-digit number" maxLength={10} className="input-field" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
            <input type="password" name="password" required value={form.password} onChange={handleChange}
              placeholder="Min. 6 characters" autoComplete="new-password" className="input-field" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
            <input type="password" name="confirmPassword" required value={form.confirmPassword} onChange={handleChange}
              placeholder="Re-enter password" className="input-field" />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
              ⚠️ {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base disabled:opacity-50 mt-2">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 font-semibold hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
