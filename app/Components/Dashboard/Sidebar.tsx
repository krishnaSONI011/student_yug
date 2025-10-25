'use client';

import { useState } from 'react';
import { 
  FaHome, 
  FaTree, 
  FaUsers, 
  FaTrophy, 
  FaLeaf,
  FaChartLine,
  
} from 'react-icons/fa';
import { GiPoliceBadge } from "react-icons/gi";

import { MdSportsBasketball } from "react-icons/md";
import Image from 'next/image';
import Link from 'next/link';


export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('home');

  const menuItems = [
    { id: 'home', label: 'Home', Link:"/dashboard", icon: FaHome },
    { id: 'trees', label: 'My Trees', Link:"/dashboard/my-trees", icon: FaTree },
    { id: 'sport', label: 'My Sport', Link:"#", icon: MdSportsBasketball },
    { id: 'community', label: 'Community', Link:"#", icon: FaUsers },
    { id: 'achievements', label: 'Achievements', Link:"#", icon: FaTrophy },
  
    { id: 'analytics', label: 'Analytics', Link:"#", icon: FaChartLine },
    { id: 'tree list', label: 'Tree List', Link:"#", icon: FaTree },
    { id: 'sport list', label: 'Sport List', Link:"#", icon: MdSportsBasketball},
    
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
            <GiPoliceBadge className="text-sm" />
             Sliver
            </div>
            <p className="text-xs opacity-90">Badges</p>
          </div>
          <div className="stat-card p-3 rounded-lg text-white text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
            <MdSportsBasketball className="text-sm" />
             2
            </div>
            <p className="text-xs opacity-90">Sports</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.id} href={item.Link}>
              <li>
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
              </Link>
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
