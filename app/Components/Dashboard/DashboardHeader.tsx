'use client';

import { useState } from 'react';
import { FaSearch, FaBell, FaUser, FaSignOutAlt, FaTree } from 'react-icons/fa';
import Image from 'next/image';

export default function DashboardHeader() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1c756b] rounded-full flex items-center justify-center">
            <FaTree className="text-white text-lg" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1c756b]">StudentYug</h1>
            <p className="text-xs text-gray-500">Green Community</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts, users, or topics..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1c756b] focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-[#1c756b] transition-colors">
            <FaBell className="text-xl" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Image
                src="/fina.jpg"
                width={32}
                height={32}
                alt="Profile"
                className="rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">John Doe</span>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <FaUser className="text-sm" />
                  Profile
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <FaTree className="text-sm" />
                  My Trees
                </a>
                <hr className="my-2" />
                <a
                  href="/"
                  className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <FaSignOutAlt className="text-sm" />
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
