'use client';

import { useEffect, useState } from 'react';
import { 
  FaHome, 
  FaTree, 
  FaUsers, 
  FaTrophy, 
  FaLeaf, 
  FaChartLine,
  FaUser
} from 'react-icons/fa';
import { GiPoliceBadge } from "react-icons/gi";

import { MdSportsBasketball } from "react-icons/md";
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';


export default function Sidebar() {
  const [treeNumber , setTreeNumber] = useState(0)
  const [sportsNumber , setSportsNumber] = useState(0)
  useEffect( ()=>{
      getNumberOfTree()
      getNumberOfSports()
  }, [])
  async function getNumberOfSports(){
    const user = localStorage.getItem("user")
    let userName
    if(user){
       userName = JSON.parse(user)
    }
   
    try{
        const resposne  = await axios.get(`https://irisinformatics.net/studentyug/wb/getSportsParticipation?sports_id=${userName.user_id}`)
        setSportsNumber(resposne.data.data.length)
    }catch(e){
      console.log(e)
    }
  }
  async function getNumberOfTree(){
    const user = localStorage.getItem("user")
    let userName
    if(user){
       userName = JSON.parse(user)

    }
   
    try{
        const resposne  = await axios.get(`https://irisinformatics.net/studentyug/wb/getPlantedTrees?user_id=${userName.user_id}`)
        setTreeNumber(resposne.data.data.length)
    }catch(e){
      console.log(e)
    }
  }
  const [activeTab, setActiveTab] = useState('home');

      const [userName, setUserName] = useState<string>(''); // State for user name
  
        // Get user name from localStorage on component mount
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.name || "User");
    }
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home', Link:"/dashboard", icon: FaHome },
    { id: 'trees', label: 'My Trees', Link:"/dashboard/my-trees", icon: FaTree },
    { id: 'sport', label: 'My Sport', Link:"/dashboard/my-sports", icon: MdSportsBasketball },
    
    { id: 'community', label: 'Community', Link:"#", icon: FaUsers },
    { id: 'achievements', label: 'View Certificate', Link:"#", icon: FaTrophy },
  
    { id: 'analytics', label: 'Environmental Analysis', Link:"#", icon: FaChartLine },
    { id: 'tree list', label: 'Tree List', Link:"/dashboard/tree-list", icon: FaTree },
    { id: 'sport list', label: 'Sport List', Link:"/dashboard/sports-list", icon: MdSportsBasketball},
    
  ];

  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* User Profile Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Image
            src="/logo.png"
            width={120}
            height={48}
            alt="Profile"
            className="rounded-full cursor-pointer"
          />
          
        </div>
        
        {/* User Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className=" bg-[#204b73] p-2 rounded-lg text-white text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <FaTree className="text-sm" />
              <span className="text-lg font-bold">{treeNumber}</span>
            </div>
            <p className="text-xs opacity-90">Trees Planted</p>
          </div>
          <div className="bg-[#204b73] p-3 rounded-lg text-white text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
            <GiPoliceBadge className="text-sm" />
             Sliver
            </div>
            <p className="text-xs opacity-90">Badges</p>
          </div>
          <div className="bg-[#204b73] p-3 rounded-lg text-white text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
            <MdSportsBasketball className="text-sm" />
             {sportsNumber}
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
              <Link key={item.id} href={item.Link} className=''>
              <li>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`cursor-pointer sidebar-item w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-[#204b73] text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-[#204b73]'
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
      {/* <div className="p-4 border-t border-gray-200">
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
      </div> */}
    </aside>
  );
}
