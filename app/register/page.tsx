"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { FaUser, FaEnvelope, FaIdCard, FaPhone } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {toast} from 'react-toastify'
// -----------------------------
// Types
// -----------------------------
interface RegisterForm {
  first_name: string;
  last_name: string;
  email: string;
  apaar_id: string;
  mobile: string;
  class: string;
  dobDay: string,
  dobMonth: string,
  dobYear: string,
  agreeToTerms: boolean;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  apaar_id?: string;
  mobile?: string;
  class?: string;
  dob?: string;
  agreeToTerms?: string;
}

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterForm>({
    first_name: "",
    last_name: "",
    email: "",
    apaar_id: "",
    mobile: "",
    class: "",
    dobDay: '',
    dobMonth: '',
    dobYear: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showWarning , setShowWarning] = useState<boolean> (false)
  // ------------------------
  // Handle Inputs
  // ------------------------

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1980 + 1 },
    (_, i) => currentYear - i
  );
    
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
  
    let processedValue: string | boolean = value;
  
    // Checkbox handling (only inputs have checked)
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      processedValue = e.target.checked;
    }
  
    // APAAR ID formatting
    if (name === "apaar_id") {
      const digitsOnly = value.replace(/\D/g, "");
      processedValue = digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ");
    }
  
    // Mobile number – only digits, max 10
    if (name === "mobile") {
      processedValue = value.replace(/\D/g, "").slice(0, 10);
    }
  
    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  useEffect(()=>{
    if(formData.first_name === ""){
      setShowWarning(false)
    }
    else{
      setShowWarning(true)
    }
  } , [formData.first_name])

  // ------------------------
  // Validation
  // ------------------------
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";

    // APAAR ID - 12 digits
    if (!/^\d{12}$/.test(formData.apaar_id.replace(/\s/g, "")))
      newErrors.apaar_id = "Enter a valid 12-digit Apaar ID";

    // ✅ Mobile - Exactly 10 digits
    if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter a valid 10-digit mobile number";

    if (!formData.class.trim()) newErrors.class = "Class is required";
    
    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ------------------------
  // Submit
  // ------------------------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        apaar_id: formData.apaar_id.replace(/\s/g, ""),
        mobile: formData.mobile,
        class: formData.class,
        dob: `${formData.dobYear}-${String(formData.dobMonth).padStart(2, '0')}-${String(formData.dobDay).padStart(2, '0')}`,
      };

      const response = await axios.post(
        "https://irisinformatics.net/studentyug/wb/register",
        payload
      );

      if (response.data.status === "1") {
        toast.success(response.data.message)
        router.push("/login");
        console.log(response.data.message);
      } else if (response.data.status === "0") {
        console.log(response.data.message);
      }

    } catch (error) {
      console.error(error);
      alert("Registration failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------
  // UI
  // ------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#204b74] via-[#204b74] to-[#204b74] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-15">
      <div className="max-w-md w-full relative z-10">

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">Join StudentYug!</h2>
          <p className="text-gray-200">Start your journey today</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {
              showWarning ? <p className="bg-[#ffe69c] border-2 border-amber-400 rounded  p-2 text-yellow-600 font-bold "><span>Warning !</span><br/>
              <span className="font-light text-justify">You Are Not Able To Change Your Name Again And Please Enter The Name According To The Apaar / Aadhar Id . </span>
              </p> : <span></span>
            }
            
            {/* First / Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm mb-1 block">First Name</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-300" />
                  <input
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-3 rounded-lg bg-white/90 border ${
                      errors.first_name ? "border-red-500" : "border-white/40"
                    }`}
                    placeholder="Krishna"
                  />
                </div>
                {errors.first_name && (
                  <p className="text-red-300 text-sm">{errors.first_name}</p>
                )}
              </div>

              <div>
                <label className="text-white text-sm mb-1 block">Last Name</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-300" />
                  <input
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-3 rounded-lg bg-white/90 border ${
                      errors.last_name ? "border-red-500" : "border-white/40"
                    }`}
                    placeholder="Soni"
                  />
                </div>
                {errors.last_name && (
                  <p className="text-red-300 text-sm">{errors.last_name}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-white text-sm mb-1 block">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-300" />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-3 rounded-lg bg-white/90 border ${
                    errors.email ? "border-red-500" : "border-white/40"
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && <p className="text-red-300 text-sm">{errors.email}</p>}
            </div>

            {/* APAAR */}
            <div>
              <label className="text-white text-sm mb-1 block">Apaar ID</label>
              <div className="relative">
                <FaIdCard className="absolute left-3 top-3 text-gray-300" />
                <input
                  name="apaar_id"
                  type="text"
                  value={formData.apaar_id}
                  maxLength={14}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-3 rounded-lg bg-white/90 border ${
                    errors.apaar_id ? "border-red-500" : "border-white/40"
                  }`}
                  placeholder="1234 5678 9012"
                />
              </div>
              {errors.apaar_id && <p className="text-red-300 text-sm">{errors.apaar_id}</p>}
            </div>

            {/* ✅ Mobile */}
            <div>
              <label className="text-white text-sm mb-1 block">Mobile</label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-gray-300" />
                <input
                  name="mobile"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-3 rounded-lg bg-white/90 border ${
                    errors.mobile ? "border-red-500" : "border-white/40"
                  }`}
                  placeholder="9876543210"
                />
              </div>
              {errors.mobile && <p className="text-red-300 text-sm">{errors.mobile}</p>}
            </div>

            {/* Class */}
            <div>
              <label className="text-white text-sm mb-1 block">Class</label>
              <select className="bg-white text-black w-full p-3 rounded "
              name="class"
              onChange={handleInputChange}
              >
                <option>Select Class</option>
                <option value="I Class">I Class</option>
                <option value="II Class">II Class</option>
                <option value={"III Class"}>III Class</option>
                <option value={"IV Class"}>IV Class</option>
                <option value={"V Class"}>V Class</option>
                <option value={"VI Class"}>VI Class</option>
                <option value={"VII Class"}>VII Class</option>
                <option value={"VIII Class"}>VIII Class</option>
                <option value={"IX Class"}>IX Class</option>
                <option value={"X Class"}>X Class</option>
              </select>

              
              {errors.class && <p className="text-red-300 text-sm">{errors.class}</p>}
            </div>

            {/* DOB */}
            <div>
              <label className="text-white text-sm mb-1 block">Date of Birth</label>
              {/* <input
                name="dob"
                type="date"
                value={formData.dob}
                max="2025-12-31"
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/90 border ${
                  errors.dob ? "border-red-500" : "border-white/40"
                }`}
              /> */}
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

              {errors.dob && <p className="text-red-300 text-sm">{errors.dob}</p>}
            </div>

            {/* Terms */}
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
              />
              <p className="text-white text-sm">
                I agree to the <span className="text-yellow-300">Terms & Conditions</span>
              </p>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-300 text-sm">{errors.agreeToTerms}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#81c243] text-white font-semibold rounded-lg"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

          </form>
        </div>

        <p className="text-center text-white mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-yellow-300">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
}
