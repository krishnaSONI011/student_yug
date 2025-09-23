'use client';

import { useState } from 'react';
import { 
  FaHome, 
  FaTree, 
  FaUsers, 
  FaTrophy, 
  FaMapMarkerAlt, 
  FaCog,
  FaUser,
  FaLeaf,
  FaChartLine
} from 'react-icons/fa';
import Image from 'next/image';

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('home');

  const menuItems = [
    { id: 'home', label: 'Home', icon: FaHome },
    { id: 'trees', label: 'My Trees', icon: FaTree },
    { id: 'community', label: 'Community', icon: FaUsers },
    { id: 'achievements', label: 'Achievements', icon: FaTrophy },
    { id: 'locations', label: 'Locations', icon: FaMapMarkerAlt },
    { id: 'analytics', label: 'Analytics', icon: FaChartLine },
    { id: 'tree list', label: 'Tree List', icon: FaTree },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* User Profile Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Image
            src="/fina.jpg"
            width={48}
            height={48}
            alt="Profile"
            className="rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-900">John Doe</h3>
            <p className="text-sm text-gray-500">Student</p>
          </div>
        </div>
        
        {/* User Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="stat-card p-3 rounded-lg text-white text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <FaTree className="text-sm" />
              <span className="text-lg font-bold">12</span>
            </div>
            <p className="text-xs opacity-90">Trees Planted</p>
          </div>
          <div className="stat-card p-3 rounded-lg text-white text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <FaTrophy className="text-sm" />
              <span className="text-lg font-bold">5</span>
            </div>
            <p className="text-xs opacity-90">Badges</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`sidebar-item w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-[#1c756b] text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-[#1c756b]'
                  }`}
                >
                  <Icon className="text-lg flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Environmental Impact */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaLeaf className="text-green-600" />
            <span className="text-sm font-semibold text-green-800">Environmental Impact</span>
          </div>
          <div className="text-xs text-green-700">
            <p>CO₂ Reduced: 24 kg</p>
            <p>Oxygen Produced: 180 kg/year</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
