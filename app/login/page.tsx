'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaCheckCircle, FaIdCard,  FaPhone, FaEnvelope } from 'react-icons/fa';
import {toast} from 'react-toastify'
export default function LoginPage() {
  const [currentStep, setCurrentStep] = useState(0); // 0: Login Type Selection, 1: Aadhaar/Aapar+DOB, 2: Contact Method, 3: OTP
  const [loginType, setLoginType] = useState<'email' | 'apaar' | ''>('');
 // 'aadhaar' or 'aapar'
  const [formData, setFormData] = useState({
    aadhaarId: '',
    dobDay: '',
    dobMonth: '',
    dobYear: '',
    contactMethod: '',
    mobile: '',
    email: '',
    rememberMe: false
  });
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2001 + 1 },
    (_, i) => currentYear - i
  );

  const [otpData, setOtpData] = useState({
    otp: '',
    isOtpSent: false,
    otpTimer: 0
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    let processedValue: string | boolean = value;

    // Aadhaar ID formatting
    if (name === "aadhaarId") {
      if (loginType === "apaar") {
        // Aadhaar: numbers only with spacing
        const digitsOnly = value.replace(/\D/g, "");
        processedValue = digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ");
      } 
      else if (loginType === "email") {
        const firstChar = value.charAt(0);
    
        // If starts with number → mobile number mode
        if (/^\d$/.test(firstChar)) {
          const digitsOnly = value.replace(/\D/g, "");
          processedValue = digitsOnly.slice(0, 10); // limit to 10 digits
        }
        // If starts with letter → email mode
        else {
          processedValue = value; // unlimited email typing
        }
      }
    }
    
    

    // OTP handled separately
    if (name === "otp") {
      setOtpData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      // Checkbox safe handling
      if (type === "checkbox" && e.target instanceof HTMLInputElement) {
        processedValue = e.target.checked;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: processedValue,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleLoginTypeSelect = (type: 'email' | 'apaar') => {

    setLoginType(type);
    setCurrentStep(1);
  };

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    const idType = loginType === 'email' ? 'Email' : 'Aadhaar';


    if (!formData.aadhaarId) {
      newErrors.aadhaarId = `${idType} ID is required`;
    } else {
      if (loginType === 'email') {
        if (!/^\S+@\S+\.\S+$/.test(formData.aadhaarId)) {
          newErrors.aadhaarId = 'Please enter a valid email address';
        }
      }
    
      if (loginType === 'apaar') {
        if (!/^\d{12}$/.test(formData.aadhaarId.replace(/\s/g, ''))) {
          newErrors.aadhaarId = 'Please enter a valid 12-digit Aadhaar ID';
        }
      }
    }
    

    if (!formData.dobDay || !formData.dobMonth || !formData.dobYear) {
      newErrors.dateOfBirth = 'Complete date of birth is required';
    } else {
      const dob = new Date(
        Number(formData.dobYear),
        Number(formData.dobMonth) - 1,
        Number(formData.dobDay)
      );

      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      if (age < 13 || age > 100) {
        newErrors.dateOfBirth = 'Please enter a valid date of birth';
      }
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.contactMethod) {
      newErrors.contactMethod = 'Please select a contact method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    const newErrors: { [key: string]: string } = {};

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
    // setTimeout(() => {
    //   setIsLoading(false);
    //   setCurrentStep(2);
    // }, 1000);


    try {
      const payload: any = {
        type: loginType,
        dob: `${formData.dobYear}-${String(formData.dobMonth).padStart(2, '0')}-${String(formData.dobDay).padStart(2, '0')}`,
      };
      
      if (loginType === 'email') {
        payload.email = formData.aadhaarId.trim();
      }
      
      if (loginType === 'apaar') {
        payload.apaar_id = formData.aadhaarId.replace(/\s/g, '');
      }
      
      console.log(formData)
      const response = await fetch(
        "https://irisinformatics.net/studentyug/wb/verify_user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // JSON payload
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok && data.status === "1") {
        setFormData((prev) => ({
          ...prev,
          mobile: data.data?.mobile || "",
          email: data.data?.email || "",
        }));
        setCurrentStep(2);
      } else {
        alert(data.message || "Verification failed.");
        setErrors({ general: data.message || "Verification failed." });
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Network error.");
      setErrors({ general: "Network error." });
    } finally {
      setIsLoading(false);
    }


  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setIsLoading(true);

    try {
      const response = await fetch('https://irisinformatics.net/studentyug/wb/send_otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: formData.contactMethod,
          value: formData.contactMethod === "email" ? formData.email : formData.mobile,
          // contactMethod: formData.contactMethod 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success: OTP initiated by server
        setOtpData(prev => ({
          ...prev,
          isOtpSent: true,
          otpTimer: 60 // Set a longer timer for production
        }));
        setCurrentStep(3);
        alert(`OTP successfully sent via ${formData.contactMethod}! (Demo: Use ${data.data.otp})`);
      } else {
        setErrors({ general: data.error || 'Failed to send OTP. Please try again.' });
        alert(data.error || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Step 2 API Error:', error);
      setErrors({ general: 'Network error. Could not send OTP.' });
      alert('Network error. Could not send OTP.');
    } finally {
      setIsLoading(false);
    }


    // Simulate API call for sending OTP
    // setTimeout(() => {
    //   setOtpData(prev => ({
    //     ...prev,
    //     isOtpSent: true,
    //     otpTimer: 30
    //   }));
    //   setCurrentStep(3);
    //   setIsLoading(false);

    //   // Start countdown timer
    //   const timer = setInterval(() => {
    //     setOtpData(prev => {
    //       if (prev.otpTimer <= 1) {
    //         clearInterval(timer);
    //         return { ...prev, otpTimer: 0 };
    //       }
    //       return { ...prev, otpTimer: prev.otpTimer - 1 };
    //     });
    //   }, 1000);
    // }, 1500);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateOtp()) return;

    setIsLoading(true);

    try {
      const response = await fetch('https://irisinformatics.net/studentyug/wb/verify_otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: formData.contactMethod, // "email" or "phone"
          value: formData.contactMethod === "email" ? formData.email : formData.mobile, // actual contact
          otp: otpData.otp.replace(/\D/g, '') // digits only
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === "1") {
        toast.success('Login successful! Redirecting to dashboard.')
        
        localStorage.setItem(
          "user",
          JSON.stringify({
            user_id: data.data.user_id,
            name: data.data.name,
            email: data.data.email,
            token: data.data.token
          })
        );
        setTimeout(()=>{
          window.location.href = data.redirectUrl || '/dashboard';
        },2000)
       
      } else {
        setErrors({ otp: data.message || 'Invalid or expired OTP.' });
        toast.error(data.message || 'Invalid or expired OTP.')
       
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
      setErrors({ general: 'Network error. Could not verify OTP.' });
      alert('Network error. Could not verify OTP.');
    } finally {
      setIsLoading(false);
    }


    // // Simulate OTP verification
    // setTimeout(() => {
    //   setIsLoading(false);
    //   // Redirect to dashboard on successful login
    //   window.location.href = '/dashboard';
    // }, 1000);
  };

  const resendOtp = async () => {
    if (otpData.otpTimer > 0) return;

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const contactInfo = formData.contactMethod === 'mobile' ? '98xxxxxxxx98' : 'xxxxxx@gmail.com';
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
    if (step === 0) {
      setLoginType('');
    }
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
    <div className="min-h-screen bg-gradient-to-br from-[#204b74] via-[#204b74] to-[#204b74] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-white rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
          <p className="text-gray-200">Sign in to continue your journey of growth</p>

          {/* Progress Steps */}
          {currentStep > 0 && (
            <div className="flex justify-center mt-4 mb-6">
              <div className="flex items-center space-x-2">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= step
                      ? 'bg-[#81c243] text-gray-900'
                      : 'bg-white/20 text-white'
                      }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`w-8 h-0.5 mx-2 ${currentStep > step ? 'bg-[#81c243]' : 'bg-white/20'
                        }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Multi-Step Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Step 0: Login Type Selection */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Choose Login Method</h3>
                <p className="text-gray-200">Select how you would like to sign in</p>
              </div>

              {/* Login Type Options */}
              <div className="space-y-4">
                <div
                  className={`flex items-center justify-between p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${loginType === 'email'
                    ? 'border-green-400 bg-[#81c243]/10'
                    : 'border-white/30 hover:border-white/50'
                    }`}
                    onClick={() => handleLoginTypeSelect('email')}

                >
                  <div className="flex items-center space-x-4">
                    <FaIdCard className="text-white text-2xl" />
                    <div>
                      <p className="text-white font-medium text-lg">Login with Email/Number</p>
                      <p className="text-gray-300 text-sm">Use your Email or Number  to sign in</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${loginType === 'email'
                    ? 'border-green-400 bg-[#81c243]'
                    : 'border-white/50'
                    }`}>
                    {loginType === 'email' && (
                      <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                    )}
                  </div>
                </div>

                <div
                  className={`flex items-center justify-between p-6    rounded-lg border-2 cursor-pointer transition-all duration-300 ${loginType === 'apaar'
                    ? 'border-green-400 bg-[#81c243]/10'
                    : 'border-white/30 hover:border-white/50'
                    }`}
                  onClick={() => handleLoginTypeSelect('apaar')}
                >
                  <div className="flex items-center space-x-4">
                    <FaIdCard className="text-white text-2xl" />
                    <div>
                      <p className="text-white font-medium text-lg">Login with Aadhaar</p>
                      <p className="text-gray-300 text-sm">Use your Aadhaar ID to sign in</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${loginType === 'apaar'
                    ? 'border-green-400 bg-[#81c243]'
                    : 'border-white/50'
                    }`}>
                    {loginType === 'apaar' && (
                      <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Aadhaar/apaar ID and Date of Birth */}
          {currentStep === 1 && (
            <form className="space-y-6" onSubmit={handleStep1Submit}>
              {/* Aadhaar/Aapar ID Field */}
              <div>
                <label htmlFor="aadhaarId" className="block text-sm font-medium text-white mb-2">
                {loginType === 'email' ? (
  <>Email ID / Mobile Number <span className="text-red-300">*</span></>
) : (
  <>Aadhaar ID <span className="text-red-300">*</span></>
)}

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
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 ${errors.aadhaarId ? 'border-red-500' : 'border-white/30'
                      }`}
                      placeholder={loginType === 'email' ? 'Enter your email or number' : '1234 5678 9012'}

                      maxLength={
                        loginType === "apaar"
                          ? 14            // Aadhaar: 12 digits + spaces
                          : undefined     // Email & Mobile: no limit
                      }
                      
                  />
                </div>
                {errors.aadhaarId && (
                  <p className="mt-2 text-sm text-red-300">{errors.aadhaarId}</p>
                )}
              </div>

              {/* Date of Birth Field */}
              <div>

                <div className="relative">

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Date of Birth <span className="text-red-300">*</span>
                    </label>

                    <div className="flex justify-evenly">
                      {/* Day */}
                      <select
                        name="dobDay"
                        value={formData.dobDay}
                        onChange={handleInputChange}
                        className="py-3 px-3 rounded-lg bg-white/90 border-2 border-white/30 text-gray-900 w-22"
                      >
                        <option value="">Day</option>
                        {days.map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>

                      {/* Month */}
                      <select
                        name="dobMonth"
                        value={formData.dobMonth}
                        onChange={handleInputChange}
                        className="py-3 px-3 rounded-lg bg-white/90 border-2 border-white/30 text-gray-900 w-42"
                      >
                        <option value="">Month</option>
                        {months.map((month, index) => (
                          <option key={index} value={index + 1}>{month}</option>
                        ))}
                      </select>

                      {/* Year */}
                      <select
                        name="dobYear"
                        value={formData.dobYear}
                        onChange={handleInputChange}
                        className="py-3 px-3 rounded-lg bg-white/90 border-2 border-white/30 text-gray-900"
                      >
                        <option value="">Year</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>

                    {errors.dateOfBirth && (
                      <p className="mt-2 text-sm text-red-300">{errors.dateOfBirth}</p>
                    )}
                  </div>

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

              {/* Back Button */}
              <button
                type="button"
                onClick={() => goBackToStep(0)}
                className="w-full flex justify-center items-center py-3 px-4 border border-white/30 rounded-lg shadow-sm text-sm font-medium text-white hover:bg-white/10 transition-all duration-300"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-gray-900 bg-[#81c243]  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${formData.contactMethod === 'mobile'
                    ? 'border-green-400 bg-[#81c243]/10'
                    : 'border-white/30 hover:border-white/50'
                    }`}
                  onClick={() => setFormData(prev => ({ ...prev, contactMethod: 'mobile' }))}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      id="mobile"
                      name="contactMethod"
                      type="radio"
                      value="mobile"
                      checked={formData.contactMethod === 'mobile'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-400 focus:ring-green-400 border-gray-300"
                    />
                    <FaPhone className="text-white" />
                    <div>
                      <p className="text-white font-medium">Phone Number</p>
                      <p className="text-gray-300 text-sm">{formData.mobile}</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${formData.contactMethod === 'email'
                    ? 'border-green-400 bg-[#81c243]/10'
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
                      className="h-4 w-4 text-green-400 focus:ring-green-400 border-gray-300"
                    />
                    <FaEnvelope className="text-white" />
                    <div>
                      <p className="text-white font-medium">Email Address</p>
                      <p className="text-gray-300 text-sm">{formData.email}</p>
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
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-gray-900 bg-[#81c243] hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <h3 className="text-xl font-semibold text-white mb-2">Verify Your {formData.contactMethod === 'mobile' ? 'Mobile' : 'Email'}</h3>
                <p className="text-gray-200">
                  We&apos;ve sent a 6-digit code to <br />
                  <span className="font-semibold text-white">
                    {formData.contactMethod === 'mobile'
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
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-center text-2xl tracking-widest ${errors.otp ? 'border-red-500' : 'border-white/30'
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
                    Resend OTP in <span className=" font-semibold">{otpData.otpTimer}s</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={resendOtp}
                    className="text-white bg-[#81c243] font-medium"
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
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-gray-900 bg-[#81c243]  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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