import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { BASE_URL } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdNature } from 'react-icons/md';

const PASSWORD_MIN_LENGTH = 5;

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < PASSWORD_MIN_LENGTH) {
      newErrors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.status === 200) {
        Cookies.set('access_token', data.access_token);
        Cookies.set('refresh_token', data.refresh_token);
        navigate('/bus');
      } else if (response.status === 401) {
        toast.error(data.detail || 'Invalid credentials. Please try again.');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="max-lg:hidden flex lg:w-1/2 bg-gradient-to-br from-green-700 via-emerald-600 to-teal-500 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="EcoCity logo" className="h-10 w-10" />
          <span className="text-white text-2xl font-semibold tracking-wide">EcoCity</span>
        </div>
        <div>
          <MdNature className="text-white/30 mb-6" size={80} />
          <h2 className="text-white text-4xl font-bold leading-tight mb-4">
            Sustainable City<br />Management
          </h2>
          <p className="text-green-100 text-lg leading-relaxed">
            Monitor Dublin's live transport, air quality, energy usage, and more — all in one dashboard.
          </p>
        </div>
        <p className="text-green-200 text-sm">© 2024 EcoCity. All rights reserved.</p>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <img src="/logo.png" alt="EcoCity logo" className="h-14 w-14 mb-2" />
            <span className="text-gray-800 text-2xl font-semibold">EcoCity</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-500 mb-8">Sign in to your account to continue.</p>

          <form onSubmit={handleLogin} noValidate>
            {/* Email field */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <MdEmail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 transition ${
                    errors.email
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-green-400 focus:border-green-400'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <MdLock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`w-full pl-10 pr-10 py-3 rounded-lg border text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 transition ${
                    errors.password
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-green-400 focus:border-green-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="login-button w-full py-3 px-4 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500 text-sm">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-green-600 hover:text-green-800 font-medium transition"
            >
              Register here
            </button>
          </p>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        theme="colored"
        pauseOnHover
      />
    </div>
  );
};

export default LoginPage;
