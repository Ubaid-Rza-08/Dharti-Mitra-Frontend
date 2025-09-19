// components/common/AuthModal.jsx
import React, { useState } from 'react';
import { X, Loader } from 'lucide-react';
import { API_CONFIG } from '../../data/constants';

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', 'otp'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    area: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSendOTP = async () => {
    if (!formData.phone) {
      setMessage({ text: 'Please enter phone number', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({ text: 'OTP sent successfully!', type: 'success' });
        setAuthMode('otp');
      } else {
        throw new Error(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp || formData.otp.length !== 6) {
      setMessage({ text: 'Please enter valid 6-digit OTP', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, otp: formData.otp })
      });
      const data = await response.json();
      if (response.ok) {
        const userData = {
          name: data.name || 'User',
          phone: formData.phone,
          city: data.city || 'Delhi'
        };
        onLogin(userData, data.token); // Assume backend returns token
        onClose();
      } else {
        throw new Error(data.message || 'Invalid OTP');
      }
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!formData.name || !formData.phone || !formData.city) {
      setMessage({ text: 'Please fill all required fields', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          city: formData.city,
          area: formData.area
        })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({ text: 'Account created successfully!', type: 'success' });
        setTimeout(() => {
          setAuthMode('login');
          setMessage({ text: '', type: '' });
        }, 2000);
      } else {
        throw new Error(data.message || 'Signup failed');
      }
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {authMode === 'login' && 'Welcome to DhartiMitra'}
            {authMode === 'signup' && 'Join DhartiMitra'}
            {authMode === 'otp' && 'Verify OTP'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`p-3 rounded-lg mb-4 text-sm ${
            message.type === 'error' 
              ? 'bg-red-100 text-red-700 border border-red-200' 
              : 'bg-green-100 text-green-700 border border-green-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* Forms */}
        {authMode === 'login' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91XXXXXXXXXX"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <Loader className="h-4 w-4 animate-spin mr-2" /> : null}
              Send OTP
            </button>
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setAuthMode('signup')}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}

        {authMode === 'signup' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91XXXXXXXXXX"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter your city"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area/Village
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                placeholder="Enter your area"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <Loader className="h-4 w-4 animate-spin mr-2" /> : null}
              Sign Up
            </button>
            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setAuthMode('login')}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Login
              </button>
            </div>
          </div>
        )}

        {authMode === 'otp' && (
          <div className="space-y-4">
            <p className="text-center text-sm text-gray-600 mb-4">
              We've sent a 6-digit code to {formData.phone}
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="Enter 6-digit code"
                maxLength="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-center text-lg tracking-wider"
                required
              />
            </div>
            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <Loader className="h-4 w-4 animate-spin mr-2" /> : null}
              Verify OTP
            </button>
            <div className="text-center text-sm text-gray-600 space-x-4">
              <button
                onClick={handleSendOTP}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Resend OTP
              </button>
              <span>|</span>
              <button
                onClick={() => setAuthMode('login')}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Back to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;