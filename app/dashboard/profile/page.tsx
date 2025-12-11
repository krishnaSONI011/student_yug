"use client";

import { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSchool,
  FaGraduationCap,
  FaCalendarAlt,
  FaEdit,
} from "react-icons/fa";
import { GiPoliceBadge } from "react-icons/gi";

interface UserData {
  user_id: string;
  first_name?: string;
  last_name?: string;
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

  // -----------------------------------------
  // LOAD USER FROM LOCAL STORAGE
  // -----------------------------------------
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsed = JSON.parse(user);
      setUserData(parsed);

      // Student Profile
      const savedProfile = localStorage.getItem("studentProfile");
      setStudentProfile(
        savedProfile
          ? JSON.parse(savedProfile)
          : {
              name: `${parsed.first_name || ""} ${parsed.last_name || ""}`.trim(),
              class: parsed.class || "Not Set",
              address: parsed.address || "Not Set",
              email: parsed.email || "Not Set",
              phone: parsed.mobile || "Not Set",
              dateOfBirth: parsed.dob || "Not Set",
            }
      );

      // School Details
      const savedSchool = localStorage.getItem("schoolDetails");
      setSchoolDetails(
        savedSchool
          ? JSON.parse(savedSchool)
          : {
              schoolName: parsed.school_name || "Not Set",
              schoolAddress: parsed.school_address || "Not Set",
              schoolClass: parsed.class || "Not Set",
              schoolCode: parsed.school_code || "Not Set",
            }
      );
    }

    setLoading(false);
  }, []);

  // -----------------------------------------
  // API: UPDATE PROFILE
  // -----------------------------------------
  async function updateProfileAPI() {
    if (!userData || !studentProfile || !schoolDetails) return;

    try {
      const [fname, lname = ""] = studentProfile.name.split(" ");

      const formData = new FormData();

      formData.append("id", userData.user_id);
      formData.append("first_name", fname);
      formData.append("last_name", lname);
      formData.append("email", studentProfile.email);
      formData.append("apaar_id", ""); // optional if not used
      formData.append("mobile", studentProfile.phone);
      formData.append("class", studentProfile.class);
      formData.append("dob", studentProfile.dateOfBirth);
      formData.append("address", studentProfile.address);
      formData.append("school_name", schoolDetails.schoolName);
      formData.append("school_address", schoolDetails.schoolAddress);
      formData.append("school_code", schoolDetails.schoolCode || "");

      const response = await fetch(
        "https://irisinformatics.net/studentyug/wb/update_profile",
        { method: "POST", body: formData }
      );

      const data = await response.json();

      if (data.status === true) {
        // Update localStorage
        localStorage.setItem("user", JSON.stringify(data.data));

        setUserData(data.data);

        alert("Profile updated successfully! 🎉");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Something went wrong!");
    }
  }

  // -----------------------------------------
  // SAVE CHANGES
  // -----------------------------------------
  const handleSave = () => {
    if (studentProfile && schoolDetails) {
      localStorage.setItem("studentProfile", JSON.stringify(studentProfile));
      localStorage.setItem("schoolDetails", JSON.stringify(schoolDetails));

      updateProfileAPI(); // ⭐ Update server also

      setIsEditing(false);
    }
  };

  // -----------------------------------------
  // INPUT HANDLER
  // -----------------------------------------
  const handleInputChange = (
    section: "student" | "school",
    field: string,
    value: string
  ) => {
    if (section === "student" && studentProfile) {
      setStudentProfile({ ...studentProfile, [field]: value });
    } else if (section === "school" && schoolDetails) {
      setSchoolDetails({ ...schoolDetails, [field]: value });
    }
  };

  // -----------------------------------------
  // LOADING SCREEN
  // -----------------------------------------
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

  // -----------------------------------------
  // IF NO USER FOUND
  // -----------------------------------------
  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">User not found. Please login again.</p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-4 py-2 bg-[#204b73] text-white rounded-lg hover:bg-[#1a3a5a] transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // UI START
  // -----------------------------------------
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

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* STUDENT INFORMATION */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#204b73] rounded-full flex items-center justify-center">
                <FaUser className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Student Information</h2>
            </div>

            <div className="space-y-4">
              {/* FULL NAME */}
              <FormItem
                label="Full Name"
                value={studentProfile?.name}
                editing={isEditing}
                onChange={(v:any) => handleInputChange("student", "name", v)}
              />

              {/* CLASS */}
              <FormItem
                label="Class"
                icon={<GiPoliceBadge />}
                value={studentProfile?.class}
                editing={isEditing}
                onChange={(v:any) => handleInputChange("student", "class", v)}
              />

              {/* EMAIL */}
              <FormItem
                label="Email"
                icon={<FaEnvelope />}
                value={studentProfile?.email}
                editing={isEditing}
                onChange={(v:any) => handleInputChange("student", "email", v)}
              />

              {/* PHONE */}
              <FormItem
                label="Phone Number"
                icon={<FaPhone />}
                value={studentProfile?.phone}
                editing={isEditing}
                onChange={(v:any) => handleInputChange("student", "phone", v)}
              />

              {/* ADDRESS */}
              <FormItem
                label="Address"
                icon={<FaMapMarkerAlt />}
                textarea
                value={studentProfile?.address}
                editing={isEditing}
                onChange={(v:any) => handleInputChange("student", "address", v)}
              />

              {/* DOB */}
              <FormItem
                label="Date of Birth"
                icon={<FaCalendarAlt />}
                type="date"
                value={
                  studentProfile?.dateOfBirth !== "Not Set"
                    ? studentProfile?.dateOfBirth
                    : ""
                }
                editing={isEditing}
                onChange={(v:any) => handleInputChange("student", "dateOfBirth", v)}
              />
            </div>
          </div>

          {/* SCHOOL INFORMATION */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#204b73] rounded-full flex items-center justify-center">
                <FaSchool className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">School Details</h2>
            </div>

            <div className="space-y-4">
              <FormItem
                label="School Name"
                icon={<FaSchool />}
                value={schoolDetails?.schoolName}
                editing={isEditing}
                onChange={(v:any) => handleInputChange("school", "schoolName", v)}
              />

              <FormItem
                label="Class"
                icon={<FaGraduationCap />}
                value={schoolDetails?.schoolClass}
                editing={isEditing}
                onChange={(v:any) => handleInputChange("school", "schoolClass", v)}
              />

              <FormItem
                label="School Address"
                icon={<FaMapMarkerAlt />}
                textarea
                value={schoolDetails?.schoolAddress}
                editing={isEditing}
                onChange={(v:any) => handleInputChange("school", "schoolAddress", v)}
              />

              <FormItem
                label="School Code"
                value={schoolDetails?.schoolCode}
                editing={isEditing}
                onChange={(v:any) => handleInputChange("school", "schoolCode", v)}
              />
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        {isEditing && (
          <div className="mt-6 flex gap-3 justify-end">
            <button
              onClick={() => setIsEditing(false)}
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

// -----------------------------------------
// REUSABLE FORM ITEM COMPONENT
// -----------------------------------------
function FormItem({
  label,
  icon,
  value,
  editing,
  onChange,
  textarea,
  type,
}: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
        {icon}
        {label}
      </label>

      {editing ? (
        textarea ? (
          <textarea
            rows={3}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#204b73] focus:border-transparent"
          />
        ) : (
          <input
            type={type || "text"}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#204b73] focus:border-transparent"
          />
        )
      ) : (
        <p className="text-gray-900 font-medium">{value || "Not Set"}</p>
      )}
    </div>
  );
}
