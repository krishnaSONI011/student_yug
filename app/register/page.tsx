'use client';

import { useState } from 'react';
import Link from 'next/link';

import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash,FaIdCard } from 'react-icons/fa';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    aadhaarId: '',
    class: '',
    DOB: '',
    userType: 'student',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    let processedValue = value;
    
    // Format Aadhaar ID with spaces for better readability
    if (name === 'aadhaarId') {
      // Remove all non-digits
      const digitsOnly = value.replace(/\D/g, '');
      // Add spaces every 4 digits
      processedValue = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));
    
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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Aadhaar ID validation - only required for students
    if (formData.userType === 'student') {
      if (!formData.aadhaarId) {
        newErrors.aadhaarId = 'Aadhaar ID is required for students';
      } else if (!/^\d{12}$/.test(formData.aadhaarId.replace(/\s/g, ''))) {
        newErrors.aadhaarId = 'Please enter a valid 12-digit Aadhaar ID';
      }
    }
    
  
    
  
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Registration data:', formData);
      // Here you would typically make an API call to register the user
      alert('Registration successful! Welcome to StudentYug! (This is a demo)');
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
          
          <h2 className="text-3xl font-bold text-white mb-2">Join StudentYug!</h2>
          <p className="text-gray-200">Start your journey of growth and environmental impact</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 ${
                      errors.firstName ? 'border-red-500' : 'border-white/30'
                    }`}
                    placeholder="First name"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-300">{errors.firstName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 ${
                      errors.lastName ? 'border-red-500' : 'border-white/30'
                    }`}
                    placeholder="Last name"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-300">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-white/30'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-300">{errors.email}</p>
              )}
            </div>

            {/* Aadhaar ID Field - Only for students */}
            {formData.userType === 'student' && (
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
                <p className="mt-1 text-xs text-gray-300">
                  Required for student verification and government schemes
                </p>
              </div>
            )}

            {/* User Type */}
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-white mb-2">
                Mobile
              </label>
              <input
                    id="aadhaarId"
                    name="aadhaarId"
                    type="text"
                    value={formData.aadhaarId}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 ${
                      errors.aadhaarId ? 'border-red-500' : 'border-white/30'
                    }`}
                    placeholder="1234 5678 90"
                    maxLength={14}
                  />
            </div>

            {/* Password Fields */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Class
              </label>
              <div className="relative">
                
                <input
                  id="password"
                  name="password"
                  type="text"
                  value={formData.class}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border-2 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 ${
                    errors.password ? 'border-red-500' : 'border-white/30'
                  }`}
                  placeholder="Enter Your Class"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-300">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                Date Of Birth
              </label>
              <div className="relative">
                
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="date"
                  value={formData.DOB}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border-2 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-white/30'
                  }`}
                 
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-300">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-[#1c756b] focus:ring-yellow-400 border-gray-300 rounded mt-1"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-white">
                I agree to the{' '}
                <a href="#" className="text-yellow-300 hover:text-yellow-200 transition-colors">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-yellow-300 hover:text-yellow-200 transition-colors">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-red-300">{errors.agreeToTerms}</p>
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
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
        

          {/* Social Registration Buttons */}
         
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-white">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-yellow-300 hover:text-yellow-200 transition-colors">
              Sign in here
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
