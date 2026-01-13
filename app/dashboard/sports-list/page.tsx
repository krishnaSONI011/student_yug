'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { 
  FaTree, 
  FaTimes,
  FaCheckCircle, 
} from 'react-icons/fa';
import { MdSportsBasketball } from 'react-icons/md';




interface tree2{
    name : string ; 
    category : string ;
    name_hi:string ;
    img : string ;
    benefits: string[] ;
    description : string ;
  
}

interface Tree {
    id: number;
    name: string;
    scientificName: string;
    plantedDate: string;
    class: string;
    subject: string;
    location: string;
    coordinates: string;
    status: string;
    height: string;
    health: string;
    image: string;
    description: string;
    impact: {
      co2Reduced: number;
      oxygenProduced: number;
      carbonStored: number;
    };
    care: {
      lastWatered: string;
      nextWatering: string;
      fertilizer: string;
    };
  }

export default function SportsList() {
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [trees, setTrees] = useState<tree2[]>([]);
  const [loading, setLoading] = useState(true);


  // Available trees that students can choose to plant







  useEffect(() => {
  const fetchTrees = async () => {
    try {

      const response = await axios.get("https://irisinformatics.net/studentyug/wb/get_all_sports");
      
      
      if (response.data.status === "1") {
        setTrees(response.data.data);   // all trees
      } else {
        console.error("Error fetching trees:", response.data.message);
      }
    } catch (error) {
      console.error("Network Error:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchTrees();
}, []);


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#204b73] rounded-full flex items-center justify-center">
              <MdSportsBasketball className="text-2xl text-white" />
            </div>
            <div className='cursor-default'>
              <h1 className="text-3xl font-bold text-gray-900">Sports List</h1>
              <p className="text-gray-600">Choose a sport</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-md">
            <div className="relative">
              <FaTree className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search trees by name or scientific name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c756b] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Trees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trees.map((tree , index) => (
            <div
              key={index}
              className="bg-white cursor-default rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300  transform hover:-translate-y-1"
              
            >
              {/* Tree Icon/Image */}
              {/* <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative">
                <span className="text-8xl">{tree.img}</span>
                <div className="absolute top-4 right-4">
                 
                </div>
              </div> */}
              <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
  <Image
    src={`https://irisinformatics.net/studentyug/${tree.img}`}
    alt={tree.name}
    fill
    className="object-cover"
  />
</div>


              {/* Tree Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{tree.name}({tree.name_hi})</h3>
                <p className="text-sm font-semibold text-gray-600 italic mb-3">{tree.category} (Game)</p>
                <p className="text-gray-700 font-semibold text-sm mb-4 text-justify">{tree.description}</p>

                {/* Key Benefits */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                 <ul className="flex flex-col gap-2">
                   {tree.benefits.map((ben, index) => (
                     <li key={index} className="flex font-semibold items-start gap-2 text-sm text-gray-700">
                       <FaCheckCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
                       <span>{ben}</span>
                     </li>
                   ))}
                 </ul>
                

                     
                   
                  
                </div>

                {/* Quick Info */}
               

                {/* Environmental Impact Preview */}
               

                {/* View Details Button */}
               
              </div>
            </div>
          ))}
        </div>

        

        {/* Tree Detail Modal */}
        {selectedTree && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                  
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedTree.name}</h2>
                    <p className="text-gray-600 italic">{selectedTree.scientificName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTree(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>

              {/* Modal Content */}
            
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

