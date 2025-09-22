'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPhone, FaLock, FaEye, FaEyeSlash, FaFacebook, FaGoogle, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    password: '',
    rememberMe: false
  });
  const [otpData, setOtpData] = useState({
    otp: '',
    isOtpSent: false,
    otpTimer: 0
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'otp') {
      setOtpData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!otpData.otp) {
      newErrors.otp = 'OTP is required';
    } else if (otpData.otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otpData.isOtpSent) {
      // First step: Send OTP
      if (!validateForm()) {
        return;
      }
      
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Sending OTP to:', formData.mobileNumber);
        
        // Simulate OTP sent
        setOtpData(prev => ({
          ...prev,
          isOtpSent: true,
          otpTimer: 60
        }));
        
        // Start countdown timer
        const timer = setInterval(() => {
          setOtpData(prev => {
            if (prev.otpTimer <= 1) {
              clearInterval(timer);
              return { ...prev, otpTimer: 0 };
            }
            return { ...prev, otpTimer: prev.otpTimer - 1 };
          });
        }, 1000);
        
        alert(`OTP sent to ${formData.mobileNumber}! (Demo: Use 123456)`);
      } catch (error) {
        console.error('OTP send error:', error);
        alert('Failed to send OTP. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Second step: Verify OTP
      if (!validateOtp()) {
        return;
      }
      
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Verifying OTP:', otpData.otp);
        
        // Simulate OTP verification (demo OTP: 123456)
        if (otpData.otp === '123456') {
          alert('Login successful! Welcome to StudentYug!');
          // Redirect to dashboard
          window.location.href = '/dashboard';
        } else {
          alert('Invalid OTP. Please try again.');
        }
      } catch (error) {
        console.error('OTP verification error:', error);
        alert('OTP verification failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resendOtp = async () => {
    if (otpData.otpTimer > 0) return;
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Resending OTP to:', formData.mobileNumber);
      
      setOtpData(prev => ({
        ...prev,
        otpTimer: 60
      }));
      
      // Start countdown timer
      const timer = setInterval(() => {
        setOtpData(prev => {
          if (prev.otpTimer <= 1) {
            clearInterval(timer);
            return { ...prev, otpTimer: 0 };
          }
          return { ...prev, otpTimer: prev.otpTimer - 1 };
        });
      }, 1000);
      
      alert('OTP resent successfully!');
    } catch (error) {
      console.error('Resend OTP error:', error);
      alert('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const goBackToLogin = () => {
    setOtpData(prev => ({
      ...prev,
      isOtpSent: false,
      otp: '',
      otpTimer: 0
    }));
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1c756b] via-[#2a8b7f] to-[#1c756b] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-white rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full animate-float" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
          <p className="text-gray-200">Sign in to continue your journey of growth</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!otpData.isOtpSent ? (
              <>
                {/* Mobile Number Field */}
                <div>
                  <label htmlFor="mobileNumber" className="block text-sm font-medium text-white mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="mobileNumber"
                      name="mobileNumber"
                      type="tel"
                      autoComplete="tel"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 ${
                        errors.mobileNumber ? 'border-red-500' : 'border-white/30'
                      }`}
                      placeholder="Enter your 10-digit mobile number"
                      maxLength={10}
                    />
                  </div>
                  {errors.mobileNumber && (
                    <p className="mt-2 text-sm text-red-300">{errors.mobileNumber}</p>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* OTP Verification */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheckCircle className="text-2xl text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Verify Your Mobile</h3>
                  <p className="text-gray-200">
                    We&apos;ve sent a 6-digit code to <br />
                    <span className="font-semibold text-yellow-300">+91 {formData.mobileNumber}</span>
                  </p>
                </div>

                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-white mb-2">
                    Enter OTP
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    value={otpData.otp}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-center text-2xl tracking-widest ${
                      errors.otp ? 'border-red-500' : 'border-white/30'
                    }`}
                    placeholder="000000"
                    maxLength={6}
                  />
                  {errors.otp && (
                    <p className="mt-2 text-sm text-red-300">{errors.otp}</p>
                  )}
                </div>

                {/* Resend OTP */}
                <div className="text-center">
                  {otpData.otpTimer > 0 ? (
                    <p className="text-gray-200">
                      Resend OTP in <span className="text-yellow-300 font-semibold">{otpData.otpTimer}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={resendOtp}
                      className="text-yellow-300 hover:text-yellow-200 transition-colors font-medium"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                {/* Back to Login */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={goBackToLogin}
                    className="text-white/80 hover:text-white transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <FaArrowLeft className="text-xs" />
                    Change mobile number
                  </button>
                </div>
              </>
            )}

            {/* Password Field - Only show in first step */}
            {!otpData.isOtpSent && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 rounded-lg border-2 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 ${
                      errors.password ? 'border-red-500' : 'border-white/30'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-300">{errors.password}</p>
                )}
              </div>
            )}

            {/* Remember Me & Forgot Password - Only show in first step */}
            {!otpData.isOtpSent && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#1c756b] focus:ring-yellow-400 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-white">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-yellow-300 hover:text-yellow-200 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-[#1c756b] bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#1c756b] mr-2"></div>
                  {otpData.isOtpSent ? 'Verifying...' : 'Sending OTP...'}
                </div>
              ) : (
                otpData.isOtpSent ? 'Verify OTP' : 'Send OTP'
              )}
            </button>
          </form>

          {/* Divider - Only show in first step */}
          {!otpData.isOtpSent && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white">Or continue with</span>
                </div>
              </div>
            </div>
          )}

          {/* Social Login Buttons - Only show in first step */}
          {!otpData.isOtpSent && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-3 px-4 border border-white/30 rounded-lg shadow-sm bg-white/10 text-sm font-medium text-white hover:bg-white/20 transition-all duration-300">
                <FaFacebook className="mr-2" />
                Facebook
              </button>
              <button className="w-full inline-flex justify-center py-3 px-4 border border-white/30 rounded-lg shadow-sm bg-white/10 text-sm font-medium text-white hover:bg-white/20 transition-all duration-300">
                <FaGoogle className="mr-2" />
                Google
              </button>
            </div>
          )}
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-white">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-medium text-yellow-300 hover:text-yellow-200 transition-colors">
              Sign up here
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/" className="text-white/80 hover:text-white transition-colors text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
