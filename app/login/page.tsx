'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaCheckCircle, FaIdCard, FaCalendarAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function LoginPage() {
  const [currentStep, setCurrentStep] = useState(1); // 1: Aadhaar+DOB, 2: Contact Method, 3: OTP
  const [formData, setFormData] = useState({
    aadhaarId: '',
    dateOfBirth: '',
    contactMethod: '', // 'phone' or 'email'
    phoneNumber: '',
    email: '',
    rememberMe: false
  });
  const [otpData, setOtpData] = useState({
    otp: '',
    isOtpSent: false,
    otpTimer: 0
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    let processedValue = value;
    
    // Format Aadhaar ID with spaces for better readability
    if (name === 'aadhaarId') {
      const digitsOnly = value.replace(/\D/g, '');
      processedValue = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    
    if (name === 'otp') {
      setOtpData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : processedValue
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
  
  const validateStep1 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.aadhaarId) {
      newErrors.aadhaarId = 'Aadhaar ID is required';
    } else if (!/^\d{12}$/.test(formData.aadhaarId.replace(/\s/g, ''))) {
      newErrors.aadhaarId = 'Please enter a valid 12-digit Aadhaar ID';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 13 || age > 100) {
        newErrors.dateOfBirth = 'Please enter a valid date of birth';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.contactMethod) {
      newErrors.contactMethod = 'Please select a contact method';
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

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep1()) return;
    
    setIsLoading(true);
    
    // Simulate API call to verify Aadhaar and DOB
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
    }, 1000);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setIsLoading(true);
    
    // Simulate API call for sending OTP
    setTimeout(() => {
      setOtpData(prev => ({
        ...prev,
        isOtpSent: true,
        otpTimer: 30
      }));
      setCurrentStep(3);
      setIsLoading(false);
      
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
    }, 1500);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateOtp()) return;
    
    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard on successful login
      window.location.href = '/dashboard';
    }, 1000);
  };

  const resendOtp = async () => {
    if (otpData.otpTimer > 0) return;
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const contactInfo = formData.contactMethod === 'phone' ? '98xxxxxxxx98' : 'xxxxxx@gmail.com';
      console.log('Resending OTP to:', contactInfo);
      
      setOtpData(prev => ({
        ...prev,
        otpTimer: 30
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
      
      alert(`OTP resent to ${contactInfo}! (Demo: Use 123456)`);
    } catch (error) {
      console.error('Resend OTP error:', error);
      alert('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const goBackToStep = (step: number) => {
    setCurrentStep(step);
    setOtpData(prev => ({
      ...prev,
      isOtpSent: false,
      otpTimer: 0
    }));
    setFormData(prev => ({
      ...prev,
      otp: ''
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
          
          {/* Progress Steps */}
          <div className="flex justify-center mt-4 mb-6">
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step 
                      ? 'bg-yellow-400 text-gray-900' 
                      : 'bg-white/20 text-white'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      currentStep > step ? 'bg-yellow-400' : 'bg-white/20'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Multi-Step Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Step 1: Aadhaar ID and Date of Birth */}
          {currentStep === 1 && (
            <form className="space-y-6" onSubmit={handleStep1Submit}>
              {/* Aadhaar ID Field */}
              <div>
                <label htmlFor="aadhaarId" className="block text-sm font-medium text-white mb-2">
                  Apaar ID <span className="text-red-300">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaIdCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="aadhaarId"
                    name="aadhaarId"
                    type="text"
                    value={formData.aadhaarId}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 ${
                      errors.aadhaarId ? 'border-red-500' : 'border-white/30'
                    }`}
                    placeholder="1234 5678 9012"
                    maxLength={14}
                  />
                </div>
                {errors.aadhaarId && (
                  <p className="mt-2 text-sm text-red-300">{errors.aadhaarId}</p>
                )}
              </div>

              {/* Date of Birth Field */}
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-white mb-2">
                  Date of Birth <span className="text-red-300">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 ${
                      errors.dateOfBirth ? 'border-red-500' : 'border-white/30'
                    }`}
                  />
                </div>
                {errors.dateOfBirth && (
                  <p className="mt-2 text-sm text-red-300">{errors.dateOfBirth}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-center">
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
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  'Continue'
                )}
              </button>
            </form>
          )}

          {/* Step 2: Contact Method Selection */}
          {currentStep === 2 && (
            <form className="space-y-6" onSubmit={handleStep2Submit}>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Choose Verification Method</h3>
                <p className="text-gray-200">How would you like to receive your OTP?</p>
              </div>

              {/* Contact Method Selection */}
              <div className="space-y-4">
                <div 
                  className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    formData.contactMethod === 'phone' 
                      ? 'border-yellow-400 bg-yellow-400/10' 
                      : 'border-white/30 hover:border-white/50'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, contactMethod: 'phone' }))}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      id="phone"
                      name="contactMethod"
                      type="radio"
                      value="phone"
                      checked={formData.contactMethod === 'phone'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-300"
                    />
                    <FaPhone className="text-white" />
                    <div>
                      <p className="text-white font-medium">Phone Number</p>
                      <p className="text-gray-300 text-sm">98xxxxxxxx98</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    formData.contactMethod === 'email' 
                      ? 'border-yellow-400 bg-yellow-400/10' 
                      : 'border-white/30 hover:border-white/50'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, contactMethod: 'email' }))}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      id="email"
                      name="contactMethod"
                      type="radio"
                      value="email"
                      checked={formData.contactMethod === 'email'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-300"
                    />
                    <FaEnvelope className="text-white" />
                    <div>
                      <p className="text-white font-medium">Email Address</p>
                      <p className="text-gray-300 text-sm">xxxxxx@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {errors.contactMethod && (
                <p className="text-sm text-red-300">{errors.contactMethod}</p>
              )}

              {/* Back Button */}
              <button
                type="button"
                onClick={() => goBackToStep(1)}
                className="w-full flex justify-center items-center py-3 px-4 border border-white/30 rounded-lg shadow-sm text-sm font-medium text-white hover:bg-white/10 transition-all duration-300"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !formData.contactMethod}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                    Sending OTP...
                  </div>
                ) : (
                  'Send OTP'
                )}
              </button>
            </form>
          )}

          {/* Step 3: OTP Verification */}
          {currentStep === 3 && (
            <form className="space-y-6" onSubmit={handleOtpSubmit}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-2xl text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Verify Your {formData.contactMethod === 'phone' ? 'Phone' : 'Email'}</h3>
                <p className="text-gray-200">
                  We&apos;ve sent a 6-digit code to <br />
                  <span className="font-semibold text-yellow-300">
                    {formData.contactMethod === 'phone' 
                      ? '+91 98xxxxxxxx98' 
                      : 'xxxxxx@gmail.com'
                    }
                  </span>
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

              {/* Back Button */}
              <button
                type="button"
                onClick={() => goBackToStep(2)}
                className="w-full flex justify-center items-center py-3 px-4 border border-white/30 rounded-lg shadow-sm text-sm font-medium text-white hover:bg-white/10 transition-all duration-300"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  'Verify OTP'
                )}
              </button>
            </form>
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