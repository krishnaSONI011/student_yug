'use client'

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface studentApi {
  name: string;
  last_name: string;
  mobile: string;
  email: string;
  current_class: string;
  dob: string;
  enroll_id: string;
  address: string;
  school_name: string;
  school_address: string;
  school_code: string;
  profile_image?: string;
}

export default function Profile2() {
  const [profileData, setProfileData] = useState<studentApi | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    getProfileData();
  }, []);

  // ================= GET PROFILE =================
  async function getProfileData() {
    const user = localStorage.getItem("user");
    if (!user) return;

    const userData = JSON.parse(user);

    try {
      const response = await axios.get(
        `https://irisinformatics.net/studentyug/wb/getStudent?user_id=${userData.user_id}`
      );

      if (response.data.status === "1") {
        setProfileData(response.data.data[0]);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  }

  // ================= HANDLE INPUT CHANGE =================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setProfileData((prev) =>
      prev
        ? {
            ...prev,
            [name]: value,
          }
        : prev
    );
  };

  // ================= HANDLE IMAGE CHANGE =================
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // ================= UPDATE PROFILE =================
  async function updateProfileData() {
    const user = localStorage.getItem("user");
    if (!user || !profileData) return;

    const userData = JSON.parse(user);

    try {
      const formData = new FormData();

      formData.append("id", userData.user_id);
      formData.append("first_name", profileData.name);
      formData.append("last_name", profileData.last_name);
      formData.append("email", profileData.email);
      formData.append("apaar_id", profileData.enroll_id);
      formData.append("mobile", profileData.mobile);
      formData.append("class", profileData.current_class);
      formData.append("dob", profileData.dob);
      formData.append("address", profileData.address);
      formData.append("school_name", profileData.school_name);
      formData.append("school_address", profileData.school_address);
      formData.append("school_code", profileData.school_code);

      if (profileImage) {
        formData.append("profile_image", profileImage);
      }

      const response = await axios.post(
        "https://irisinformatics.net/studentyug/wb/update_profile",
        formData
      );

      if (response.data.status === "1") {
        toast.success(response.data.message);
        setPreviewImage(null);
        setProfileImage(null);
        getProfileData();
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error("Profile update failed");
    }
  }

  if (!profileData) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

    return(
        <>
       
       {/* ================= PROFILE IMAGE ================= */}
      <div className="flex flex-col items-center mt-5 gap-3">
        <Image
          src={
            previewImage
              ? previewImage
              : profileData.profile_image
              ? profileData.profile_image
              : "/logo.png"
          }
          alt="profile"
          width={120}
          height={120}
          className="rounded-full border object-cover"
        />

        <label className="cursor-pointer text-sm text-blue-600">
          Change Profile Photo
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </label>
      </div>
        <div className="p-2">
            <h1 className="text-xl font-bold">Fixed  Information</h1>
        <p className="my-5 bg-yellow-200 p-2 text-amber-500 text-center border border-amber-500 rounded">You do not Change some Basic Information</p>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2">
            <div className="flex flex-col">
                <label>First Name</label>
                <input className="cursor-no-drop border bg-gray-100 p-2" value={profileData?.name}  disabled/>
            </div>
            <div className="flex flex-col">
                <label>Last Name</label>
                <input className="cursor-no-drop border bg-gray-100 p-2" value={profileData?.last_name} disabled/>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2">
        <div className="flex flex-col">
                <label>Aadhaar Id</label>
                <input type="text" className="cursor-no-drop border bg-gray-100 p-2" value={profileData?.enroll_id} name="enroll_id"  onChange={handleChange}/>
            </div>
            <div className="flex flex-col">
                <label>DOB</label>
                <input type="text" className="cursor-no-drop border bg-gray-100 p-2" name="dob"  onChange={handleChange} value={profileData?.dob} />
            </div>
        </div>
        <h1 className="text-xl mt-5 px-5 font-bold">Basic Information</h1>
        <div className="grid grid-cols-2 gap-2 p-2">
        <div className="flex flex-col">
                <label>Email</label>
                <input type="email" className=" border bg-white p-2" value={profileData?.email} name="email"  onChange={handleChange} />
            </div>
            <div className="flex flex-col">
                <label>Phone</label>
                <input type="text" className=" border bg-white p-2" value={profileData?.mobile} name="mobile"  onChange={handleChange}/>
            </div>
        </div>
       <div className="grid grid-cols-1 gap-2 p-2">
       <div className="flex flex-col">
                <label>Address</label>
                <textarea  className=" border bg-white p-2" value={profileData?.address}  name="address"  onChange={handleChange}/>
            </div>
       </div>
        <div className="p-2">
            <h1 className="text-xl font-bold">
                School Information
            </h1>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2">
        <div className="flex flex-col">
                <label>School Name</label>
                <input type="text" className=" border bg-white p-2" value={profileData?.school_name}  name="school_name"  onChange={handleChange}/>
            </div>
            <div className="flex flex-col">
                <label>School Code</label>
                <input type="text" className=" border bg-white p-2"  value={profileData?.school_code} name="school_code"  onChange={handleChange}/>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-2 p-2">
        <div className="flex flex-col">
                <label>School Address</label>
                <textarea  className=" border bg-white p-2" value={profileData?.school_address}  name="school_address"  onChange={handleChange}/>
            </div>
            <div className="my-10 text-center">
                <button onClick={updateProfileData} className="px-6 py-2 bg-[#204b73] text-white rounded-lg hover:bg-white hover:text-[#204b73] border border-[#204b73]">Submit</button>
            </div>
            {/* <div className="flex flex-col">
                <label></label>
                <input type="text" className=" border bg-gray-100 p-2" value={"SB0001"} />
            </div> */}
        </div>
        </>
    )
}