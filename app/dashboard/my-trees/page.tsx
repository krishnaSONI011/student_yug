'use client';

import { useState } from 'react';
import { FaTree, FaCalendarAlt, FaMapMarkerAlt, FaLeaf, FaSeedling, FaTrophy, FaHeart, FaEye } from 'react-icons/fa';
import { GiPoliceBadge } from 'react-icons/gi';
import Image from 'next/image';

export default function MyTreesPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTree, setSelectedTree] = useState(null);

  // Sample tree data - in real app, this would come from API
  const treesData = [
    {
      id: 1,
      name: 'Neem Tree',
      scientificName: 'Azadirachta indica',
      plantedDate: '2024-01-15',
      class: '10th Grade',
      subject: 'Environmental Science',
      location: 'School Garden, Block A',
      coordinates: '28.6139° N, 77.2090° E',
      status: 'Growing',
      height: '2.3m',
      health: 'Excellent',
      image: '/tree1.jpg',
      description: 'Planted during Environmental Science class. This neem tree will provide shade and medicinal benefits.',
      impact: {
        co2Reduced: 12.5,
        oxygenProduced: 8.2,
        carbonStored: 15.3
      },
      care: {
        lastWatered: '2024-01-20',
        nextWatering: '2024-01-27',
        fertilizer: 'Organic compost applied'
      }
    },
    {
      id: 2,
      name: 'Peepal Tree',
      scientificName: 'Ficus religiosa',
      plantedDate: '2024-02-10',
      class: '9th Grade',
      subject: 'Biology',
      location: 'School Playground',
      coordinates: '28.6140° N, 77.2091° E',
      status: 'Growing',
      height: '1.8m',
      health: 'Good',
      image: '/tree2.jpg',
      description: 'Sacred peepal tree planted during Biology class. Known for its religious significance and air purification.',
      impact: {
        co2Reduced: 18.7,
        oxygenProduced: 12.4,
        carbonStored: 22.1
      },
      care: {
        lastWatered: '2024-01-18',
        nextWatering: '2024-01-25',
        fertilizer: 'Natural manure applied'
      }
    },
    {
      id: 3,
      name: 'Mango Tree',
      scientificName: 'Mangifera indica',
      plantedDate: '2023-12-05',
      class: '11th Grade',
      subject: 'Agriculture',
      location: 'School Farm',
      coordinates: '28.6141° N, 77.2092° E',
      status: 'Mature',
      height: '3.2m',
      health: 'Excellent',
      image: '/tree3.jpg',
      description: 'Mango tree planted during Agriculture class. Will provide fruits and contribute to food security.',
      impact: {
        co2Reduced: 25.3,
        oxygenProduced: 16.8,
        carbonStored: 28.7
      },
      care: {
        lastWatered: '2024-01-22',
        nextWatering: '2024-01-29',
        fertilizer: 'NPK fertilizer applied'
      }
    },
    {
      id: 4,
      name: 'Banyan Tree',
      scientificName: 'Ficus benghalensis',
      plantedDate: '2023-11-20',
      class: '12th Grade',
      subject: 'Environmental Studies',
      location: 'School Entrance',
      coordinates: '28.6138° N, 77.2089° E',
      status: 'Growing',
      height: '2.7m',
      health: 'Good',
      image: '/tree4.jpg',
      description: 'Majestic banyan tree planted during Environmental Studies. Will provide shade and shelter.',
      impact: {
        co2Reduced: 21.4,
        oxygenProduced: 14.2,
        carbonStored: 26.8
      },
      care: {
        lastWatered: '2024-01-19',
        nextWatering: '2024-01-26',
        fertilizer: 'Organic fertilizer applied'
      }
    }
  ];

  const filters = [
    { id: 'all', label: 'All Trees', count: treesData.length },
    { id: 'growing', label: 'Growing', count: treesData.filter(tree => tree.status === 'Growing').length },
    { id: 'mature', label: 'Mature', count: treesData.filter(tree => tree.status === 'Mature').length },
    { id: 'excellent', label: 'Excellent Health', count: treesData.filter(tree => tree.health === 'Excellent').length }
  ];

  const filteredTrees = selectedFilter === 'all' 
    ? treesData 
    : treesData.filter(tree => {
        if (selectedFilter === 'growing') return tree.status === 'Growing';
        if (selectedFilter === 'mature') return tree.status === 'Mature';
        if (selectedFilter === 'excellent') return tree.health === 'Excellent';
        return true;
      });

  const totalImpact = treesData.reduce((acc, tree) => ({
    co2Reduced: acc.co2Reduced + tree.impact.co2Reduced,
    oxygenProduced: acc.oxygenProduced + tree.impact.oxygenProduced,
    carbonStored: acc.carbonStored + tree.impact.carbonStored
  }), { co2Reduced: 0, oxygenProduced: 0, carbonStored: 0 });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FaTree className="text-2xl text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Trees</h1>
              <p className="text-gray-600">Track your environmental impact through tree plantation</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FaTree className="text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{treesData.length}</p>
                  <p className="text-sm text-gray-600">Total Trees</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaLeaf className="text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalImpact.co2Reduced.toFixed(1)} kg</p>
                  <p className="text-sm text-gray-600">CO₂ Reduced</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <FaSeedling className="text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalImpact.oxygenProduced.toFixed(1)} kg</p>
                  <p className="text-sm text-gray-600">Oxygen Produced</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <FaTrophy className="text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                  <p className="text-sm text-gray-600">Classes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedFilter === filter.id
                    ? 'bg-[#1c756b] text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* Trees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrees.map((tree) => (
            <div key={tree.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              {/* Tree Image */}
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <FaTree className="text-6xl text-green-600" />
              </div>

              {/* Tree Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{tree.name}</h3>
                    <p className="text-sm text-gray-600 italic">{tree.scientificName}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tree.status === 'Mature' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {tree.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCalendarAlt className="text-gray-400" />
                    <span>Planted: {new Date(tree.plantedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <GiPoliceBadge className="text-gray-400" />
                    <span>Class: {tree.class}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>{tree.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaTree className="text-gray-400" />
                    <span>Height: {tree.height}</span>
                  </div>
                </div>

                {/* Health Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Health Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tree.health === 'Excellent' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {tree.health}
                  </span>
                </div>

                {/* Impact Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-600">CO₂</p>
                    <p className="text-sm font-semibold text-gray-900">{tree.impact.co2Reduced}kg</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-600">O₂</p>
                    <p className="text-sm font-semibold text-gray-900">{tree.impact.oxygenProduced}kg</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-600">Carbon</p>
                    <p className="text-sm font-semibold text-gray-900">{tree.impact.carbonStored}kg</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedTree(tree)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[#1c756b] text-white rounded-lg hover:bg-[#155e56] transition-colors duration-200 text-sm font-medium"
                  >
                    <FaEye className="text-sm" />
                    View Details
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                    <FaHeart className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tree Detail Modal */}
        {selectedTree && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTree.name}</h2>
                  <button
                    onClick={() => setSelectedTree(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Tree Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Scientific Name</p>
                        <p className="font-medium">{selectedTree.scientificName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Planted Date</p>
                        <p className="font-medium">{new Date(selectedTree.plantedDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Class</p>
                        <p className="font-medium">{selectedTree.class}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Subject</p>
                        <p className="font-medium">{selectedTree.subject}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Height</p>
                        <p className="font-medium">{selectedTree.height}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="font-medium">{selectedTree.status}</p>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium">{selectedTree.location}</p>
                      <p className="text-sm text-gray-600">Coordinates</p>
                      <p className="font-medium text-sm">{selectedTree.coordinates}</p>
                    </div>
                  </div>

                  {/* Environmental Impact */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Environmental Impact</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">CO₂ Reduced</p>
                        <p className="text-xl font-bold text-green-600">{selectedTree.impact.co2Reduced} kg</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Oxygen Produced</p>
                        <p className="text-xl font-bold text-blue-600">{selectedTree.impact.oxygenProduced} kg</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600">Carbon Stored</p>
                        <p className="text-xl font-bold text-purple-600">{selectedTree.impact.carbonStored} kg</p>
                      </div>
                    </div>
                  </div>

                  {/* Care Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Care Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Last Watered</span>
                        <span className="font-medium">{selectedTree.care.lastWatered}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Next Watering</span>
                        <span className="font-medium">{selectedTree.care.nextWatering}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Fertilizer</span>
                        <span className="font-medium">{selectedTree.care.fertilizer}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700">{selectedTree.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
