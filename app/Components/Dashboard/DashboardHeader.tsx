'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react';
import { FaSearch, FaBell, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface UserData {
  name: string;
  email?: string;
  img?: string;
}

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [search, setSearch] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = () => {
      const user = localStorage.getItem("user");
      if (user) {
        setUserData(JSON.parse(user));
      }
    };
  
    loadUser(); // initial load
  
    window.addEventListener("userUpdated", loadUser);
    window.addEventListener("storage", loadUser); // cross-tab
  
    return () => {
      window.removeEventListener("userUpdated", loadUser);
      window.removeEventListener("storage", loadUser);
    };
  }, []);
  
  

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserData(null);
    router.push("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", search);
    // You can connect API here
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4 sticky top-0 z-20">
      <div className="flex items-center justify-between gap-2 sm:gap-4">

        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <FaBars className="text-xl" />
        </button>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-2 sm:mx-4 lg:mx-8">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts, users..."
              className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#204b73] focus:border-transparent"
            />
          </div>
        </form>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Notifications */}
          {/* <button className="relative p-2 text-gray-600 hover:text-[#204b73] transition-colors">
            <FaBell className="text-xl" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button> */}

          {/* Profile Menu */}
          <div ref={menuRef} id="profile" className="relative">

            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
             <div className="relative w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full overflow-hidden">
  <Image
    src={userData?.img || "/fina.jpg"}
    alt="Profile"
    fill
    sizes="(max-width: 640px) 40px, 50px"
    className="object-cover"
  />
</div>


              <span className="hidden sm:inline text-sm font-medium text-gray-700">
                {userData?.name || "Guest"}
              </span>
            </button>

            {/* Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">

                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <FaUser className="text-sm" />
                  Profile
                </Link>

                <hr className="my-2" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <FaSignOutAlt className="text-sm" />
                  Logout
                </button>

              </div>
            )}

          </div>
        </div>
      </div>
    </header>
  );
}
