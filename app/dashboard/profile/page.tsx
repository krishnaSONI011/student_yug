'use client';

import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSchool, FaGraduationCap, FaCalendarAlt, FaEdit } from 'react-icons/fa';
import { GiPoliceBadge } from 'react-icons/gi';

interface UserData {
  user_id: string;
  name?: string;
  email?: string;
  token?: string;
}

interface StudentProfile {
  name: string;
  class: string;
  address: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

interface SchoolDetails {
  schoolName: string;
  schoolAddress: string;
  schoolClass: string;
  schoolCode?: string;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [schoolDetails, setSchoolDetails] = useState<SchoolDetails | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadUserData = () => {
      try {
        const user = localStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserData(parsedUser);
          
          // Initialize student profile from localStorage or set defaults
          const savedProfile = localStorage.getItem('studentProfile');
          if (savedProfile) {
            setStudentProfile(JSON.parse(savedProfile));
          } else {
            // Set default values based on available data
            setStudentProfile({
              name: parsedUser.name || 'Not Set',
              class: 'Not Set',
              address: 'Not Set',
              email: parsedUser.email || 'Not Set',
              phone: 'Not Set',
              dateOfBirth: 'Not Set'
            });
          }

          // Initialize school details from localStorage or set defaults
          const savedSchool = localStorage.getItem('schoolDetails');
          if (savedSchool) {
            setSchoolDetails(JSON.parse(savedSchool));
          } else {
            setSchoolDetails({
              schoolName: 'Not Set',
              schoolAddress: 'Not Set',
              schoolClass: 'Not Set',
              schoolCode: 'Not Set'
            });
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleSave = () => {
    if (studentProfile && schoolDetails) {
      localStorage.setItem('studentProfile', JSON.stringify(studentProfile));
      localStorage.setItem('schoolDetails', JSON.stringify(schoolDetails));
      setIsEditing(false);
      alert('Profile updated successfully!');
    }
  };

  const handleInputChange = (section: 'student' | 'school', field: string, value: string) => {
    if (section === 'student' && studentProfile) {
      setStudentProfile({ ...studentProfile, [field]: value });
    } else if (section === 'school' && schoolDetails) {
      setSchoolDetails({ ...schoolDetails, [field]: value });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#204b73] mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">User not found. Please login again.</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="px-4 py-2 bg-[#204b73] text-white rounded-lg hover:bg-[#1a3a5a] transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#204b73] rounded-full flex items-center justify-center">
                <FaUser className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-600">View and manage your profile information</p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#204b73] text-white rounded-lg hover:bg-[#1a3a5a] transition-colors duration-200 font-medium"
              >
                <FaEdit className="text-sm" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Student Information Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#204b73] rounded-full flex items-center justify-center">
                <FaUser className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Student Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={studentProfile?.name || ''}
                    onChange={(e) => handleInputChange('student', 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#204b73] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{studentProfile?.name || 'Not Set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <GiPoliceBadge className="text-gray-500" />
                  Class
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={studentProfile?.class || ''}
                    onChange={(e) => handleInputChange('student', 'class', e.target.value)}
                    placeholder="e.g., 8th, 9th, 10th"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#204b73] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{studentProfile?.class || 'Not Set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaEnvelope className="text-gray-500" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={studentProfile?.email || ''}
                    onChange={(e) => handleInputChange('student', 'email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#204b73] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{studentProfile?.email || 'Not Set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaPhone className="text-gray-500" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={studentProfile?.phone || ''}
                    onChange={(e) => handleInputChange('student', 'phone', e.target.value)}
                    placeholder="e.g., +91 1234567890"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#204b73] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{studentProfile?.phone || 'Not Set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-500" />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={studentProfile?.address || ''}
                    onChange={(e) => handleInputChange('student', 'address', e.target.value)}
                    rows={3}
                    placeholder="Enter your full address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#204b73] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{studentProfile?.address || 'Not Set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-500" />
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={studentProfile?.dateOfBirth !== 'Not Set' ? studentProfile?.dateOfBirth : ''}
                    onChange={(e) => handleInputChange('student', 'dateOfBirth', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#204b73] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{studentProfile?.dateOfBirth || 'Not Set'}</p>
                )}
              </div>
            </div>
          </div>

          {/* School Information Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#204b73] rounded-full flex items-center justify-center">
                <FaSchool className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">School Details</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaSchool className="text-gray-500" />
                  School Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={schoolDetails?.schoolName || ''}
                    onChange={(e) => handleInputChange('school', 'schoolName', e.target.value)}
                    placeholder="Enter school name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#204b73] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{schoolDetails?.schoolName || 'Not Set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaGraduationCap className="text-gray-500" />
                  Class
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={schoolDetails?.schoolClass || ''}
                    onChange={(e) => handleInputChange('school', 'schoolClass', e.target.value)}
                    placeholder="e.g., 8th, 9th, 10th"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#204b73] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{schoolDetails?.schoolClass || 'Not Set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-500" />
                  School Address
                </label>
                {isEditing ? (
                  <textarea
                    value={schoolDetails?.schoolAddress || ''}
                    onChange={(e) => handleInputChange('school', 'schoolAddress', e.target.value)}
                    rows={3}
                    placeholder="Enter school address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#204b73] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{schoolDetails?.schoolAddress || 'Not Set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School Code</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={schoolDetails?.schoolCode || ''}
                    onChange={(e) => handleInputChange('school', 'schoolCode', e.target.value)}
                    placeholder="Enter school code (if available)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#204b73] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{schoolDetails?.schoolCode || 'Not Set'}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="mt-6 flex gap-3 justify-end">
            <button
              onClick={() => {
                setIsEditing(false);
                // Reload data to reset changes
                const savedProfile = localStorage.getItem('studentProfile');
                const savedSchool = localStorage.getItem('schoolDetails');
                if (savedProfile) setStudentProfile(JSON.parse(savedProfile));
                if (savedSchool) setSchoolDetails(JSON.parse(savedSchool));
              }}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-[#204b73] text-white rounded-lg hover:bg-[#1a3a5a] transition-colors font-medium"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


