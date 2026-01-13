'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaTree, FaCalendarAlt, FaMapMarkerAlt, FaLeaf, FaSeedling, FaTrophy, FaHeart, FaEye, FaPlus, FaTumblr } from 'react-icons/fa';
import { GiPoliceBadge } from 'react-icons/gi';
import { LuTestTube } from 'react-icons/lu';

interface Tree {
  id: number;
  name: string;
  scientificName: string;
  tree_name_hi: string;
  tree_img : string ;
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

interface ApiTreeData {
  tree_id: string;
  tree_name_en: string;
  tree_name_sc: string;
  tree_name_hi: string;
  tree_category: string;
  tree_img : string ;
  tree_carbon_reduced_per_year: string;
  tree_oxygen_produced_per_year: string;
  student_id: string;
  planting_date: string;
  age_years: string;
  age_months: string;
  co2_reduced: string;
  oxygen_produced: string;
  stage: string;
  height: string;
  health: string;
  class: string;
  location: string;
}

interface ApiResponse {
  data: ApiTreeData[];
}

interface AvailableTree {
  id: string;
  name_en: string;
  name_hi: string;
  name_sc: string;
  tree_img : string ;
  category: string;
  carbon: string;
  oxygen: string;
  description: string;
  benefits: string[];
  img: string;
  status: string;
  co2_reduced:string;
  oxygen_produced:string;
  created_at: string;
  updated_at: string;
}

interface AvailableTreesResponse {
  status: string;
  message: string;
  data: AvailableTree[];
}

interface PlantTreeFormData {
  tree_id: string;
  planting_date: string;
  height: string;
  health: string;
  class: string;
  location: string;
  image: File | null;
}

// Helper function to extract numeric value from string like "0.00 kg" or "0 kg"
const extractNumericValue = (value: string): number => {

  if (!value) return 0;
  const match = value.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

// Transform API data to Tree interface
const transformApiDataToTree = (apiData: ApiTreeData): Tree => {
  return {
    id: parseInt(apiData.tree_id) || 0,
    name: apiData.tree_name_en || 'Unknown Tree',
    scientificName: apiData.tree_name_sc || 'Unknown',
    plantedDate: apiData.planting_date || '',
    tree_name_hi: apiData.tree_name_hi || '',
    tree_img: apiData.tree_img || '',
    class: apiData.class || 'N/A',
    subject: apiData.tree_category || 'General',
    location: apiData.location || 'Unknown Location',
    coordinates: '', // Not available in API response
    status: apiData.stage || 'Unknown',
    height: apiData.height || 'N/A',
    health: apiData.health || 'Unknown',
    image: apiData.tree_img || '', // Not available in API response
    description: `${apiData.tree_name_en} (${apiData.tree_name_sc}) planted on ${apiData.planting_date}. ${apiData.tree_category} category.`,
    impact: {
      co2Reduced: extractNumericValue(apiData.tree_carbon_reduced_per_year),
      oxygenProduced: extractNumericValue(apiData.tree_oxygen_produced_per_year),
      carbonStored: extractNumericValue(apiData.tree_carbon_reduced_per_year)
    },
    care: {
      lastWatered: 'N/A', // Not available in API response
      nextWatering: 'N/A', // Not available in API response
      fertilizer: 'N/A' // Not available in API response
    }
  };
};

// Get user_id from localStorage
const getUserIdFromStorage = (): string | null => {
  if (typeof window === 'undefined') return null;

  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.user_id || user.id || null;
    }
    return null;
  } catch (error) {
    console.error('Error reading user data from localStorage:', error);
    return null;
  }
};

export default function MyTreesPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [treesData, setTreesData] = useState<Tree[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPlantModal, setShowPlantModal] = useState(false);
  const [availableTrees, setAvailableTrees] = useState<AvailableTree[]>([]);
  const [loadingTrees, setLoadingTrees] = useState(false);
  const [planting, setPlanting] = useState(false);
  const [plantFormData, setPlantFormData] = useState<PlantTreeFormData>({
    tree_id: '',
    planting_date: new Date().toISOString().split('T')[0],
    height: '',
    health: 'good',
    class: '',
    location: '',
    image: null
  });

  // Fetch trees from API
  useEffect(() => {
    const fetchTrees = async () => {
      try {
        setLoading(true);
        setError(null);

        const userId = getUserIdFromStorage();
        if (!userId) {
          setError('User not found. Please login again.');
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://irisinformatics.net/studentyug/wb/getPlantedTrees?user_id=${userId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch trees: ${response.statusText}`);
        }

        const result: ApiResponse = await response.json();

        if (result.data && Array.isArray(result.data)) {
          const transformedTrees = result.data.map(transformApiDataToTree);
          setTreesData(transformedTrees);
        } else {
          setTreesData([]);
        }
      } catch (err) {
        console.error('Error fetching trees:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch trees');
        setTreesData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrees();
  }, []);

  // Fetch available trees when modal opens
  useEffect(() => {
    if (showPlantModal) {
      const fetchAvailableTrees = async () => {
        try {
          setLoadingTrees(true);
          const response = await fetch(
            'https://irisinformatics.net/studentyug/wb/get_all_trees'
          );

          if (!response.ok) {
            throw new Error('Failed to fetch available trees');
          }

          const result: AvailableTreesResponse = await response.json();

          if (result.data && Array.isArray(result.data)) {
            setAvailableTrees(result.data);
          } else {
            setAvailableTrees([]);
          }
        } catch (err) {
          console.error('Error fetching available trees:', err);
          setAvailableTrees([]);
        } finally {
          setLoadingTrees(false);
        }
      };

      fetchAvailableTrees();
    }
  }, [showPlantModal]);

  // Handle plant tree form submission
  const handlePlantTree = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!plantFormData.tree_id || !plantFormData.planting_date || !plantFormData.height ||
      !plantFormData.health || !plantFormData.class || !plantFormData.location) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setPlanting(true);

      const userId = getUserIdFromStorage();
      if (!userId) {
        alert('User not found. Please login again.');
        setPlanting(false);
        return;
      }

      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('tree_id', plantFormData.tree_id);
      formData.append('planting_date', plantFormData.planting_date);
      formData.append('height', plantFormData.height);
      formData.append('health', plantFormData.health);
      formData.append('class', plantFormData.class);
      formData.append('location', plantFormData.location);

      if (plantFormData.image) {
        formData.append('image', plantFormData.image);
      }

      const response = await fetch(
        'https://irisinformatics.net/studentyug/wb/addPlantedTree',
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error('Failed to plant tree');
      }

      await response.json();

      // Reset form and close modal
      setPlantFormData({
        tree_id: '',
        planting_date: new Date().toISOString().split('T')[0],
        height: '',
        health: 'good',
        class: '',
        location: '',
        image: null
      });
      setShowPlantModal(false);

      // Refresh the trees list
      const refreshUserId = getUserIdFromStorage();
      if (refreshUserId) {
        const refreshResponse = await fetch(
          `https://irisinformatics.net/studentyug/wb/getPlantedTrees?user_id=${refreshUserId}`
        );
        if (refreshResponse.ok) {
          const refreshResult: ApiResponse = await refreshResponse.json();
          if (refreshResult.data && Array.isArray(refreshResult.data)) {
            const transformedTrees = refreshResult.data.map(transformApiDataToTree);
            setTreesData(transformedTrees);
          }
        }
      }

      alert('Tree planted successfully!');
    } catch (err) {
      console.error('Error planting tree:', err);
      alert(err instanceof Error ? err.message : 'Failed to plant tree');
    } finally {
      setPlanting(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPlantFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPlantFormData(prev => ({
        ...prev,
        image: e.target.files![0]
      }));
    }
  };

  const filters = [
    { id: 'all', label: 'All Trees', count: treesData.length },
    { id: 'growing', label: 'Growing', count: treesData.filter(tree => tree.status.toLowerCase() === 'growing').length },
    { id: 'mature', label: 'Mature', count: treesData.filter(tree => tree.status.toLowerCase() === 'mature').length },
    { id: 'excellent', label: 'Excellent Health', count: treesData.filter(tree => tree.health.toLowerCase() === 'excellent' || tree.health.toLowerCase() === 'good').length }
  ];

  const filteredTrees = selectedFilter === 'all'
    ? treesData
    : treesData.filter(tree => {
      if (selectedFilter === 'growing') return tree.status.toLowerCase() === 'growing';
      if (selectedFilter === 'mature') return tree.status.toLowerCase() === 'mature';
      if (selectedFilter === 'excellent') return tree.health.toLowerCase() === 'excellent' || tree.health.toLowerCase() === 'good';
      return true;
    });

  const totalImpact = treesData.reduce((acc, tree) => ({
    co2Reduced: acc.co2Reduced + tree.impact.co2Reduced,
    oxygenProduced: acc.oxygenProduced + tree.impact.oxygenProduced,
    carbonStored: acc.carbonStored + tree.impact.carbonStored
  }), { co2Reduced: 0, oxygenProduced: 0, carbonStored: 0 });

  // Calculate average years from trees
  const averageYears = treesData.length > 0
    ? Math.round(treesData.reduce((sum, tree) => {
      const plantedDate = new Date(tree.plantedDate);
      const now = new Date();
      const years = (now.getTime() - plantedDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
      return sum + (isNaN(years) ? 0 : years);
    }, 0) / treesData.length)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1c756b] mb-4"></div>
          <p className="text-gray-600">Loading trees...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Trees</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#1c756b] text-white rounded-lg hover:bg-[#155e56] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
console.log(filteredTrees)
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#204b73] rounded-full flex items-center justify-center">
                <FaTree className="text-2xl text-white" />
              </div>
              <div className='cursor-default'>
                <h1 className="text-3xl font-bold text-gray-900">My Trees</h1>
                <p className="text-gray-600">Track your environmental impact through tree plantation</p>
              </div>
            </div>
            <button
              onClick={() => setShowPlantModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#204b73] text-white cursor-pointer border border-[#204b73] rounded-lg hover:bg-white hover:text-[#204b73] transition-colors duration-200 font-medium shadow-sm"
            >
              <FaPlus className="text-sm" />
              Plant Tree
            </button>
          </div>

          {/* Stats Cards */}
          <div className="cursor-default grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FaTree className="text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{treesData.length}</p>
                  <p className="text-sm text-gray-600 font-semibold">Total Trees</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaLeaf className="text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalImpact.co2Reduced.toFixed(1)} </p>
                  <p className="text-sm text-gray-600 font-semibold">CO₂ Reduced (kg/year)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <FaSeedling className="text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalImpact.oxygenProduced.toFixed(1)} </p>
                  <p className="text-sm text-gray-600 font-semibold">O₂ Produced (kg/year)</p>
                </div>
              </div>
            </div>

            {/* <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <FaTrophy className="text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{averageYears}</p>
                  <p className="text-sm text-gray-600">Avg Years</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Filters */}
        {/* <div className="mb-6">
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
        </div> */}

        {/* Trees Grid */}
        {filteredTrees.length === 0 ? (
          <div className="text-center py-12">
            <FaTree className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No trees found</h3>
            <p className="text-gray-600">No trees match your current filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrees.map((tree , index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                {/* Tree Image */}
                <div className="h-48 bg-gradient-to-br relative overflow-hidden">
  <img
    src={`https://irisinformatics.net/studentyug/${tree.image}`}
    alt="image"
    className="w-full h-full object-cover"
  />
</div>

                {/* Tree Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className='cursor-default'>
                      <h3 className="cursor-default text-lg font-semibold text-gray-900">{tree.name}({tree.tree_name_hi})</h3>
                      {/* <p className="text-sm text-gray-600 italic">{tree.scientificName}</p> */}
                    </div>
                    <span className={`px-2 py-1 rounded-full cursor-default text-xs font-medium ${tree.status.toLowerCase() === 'mature'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                      }`}>
                      {tree.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center font-semibold gap-2 text-sm text-gray-600 cursor-default">
                      <FaCalendarAlt className="text-gray-400" />
                      <span>Planted: {new Date(tree.plantedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center font-semibold gap-2 text-sm text-gray-600 cursor-default">
                      <LuTestTube className="text-gray-400" />
                      <span className='font-bold'>Scientific Name: <span className=''> {tree.scientificName}</span></span>
                    </div>
                    <div className="flex items-center font-semibold gap-2 text-sm text-gray-600 cursor-default">
                      <GiPoliceBadge className="text-gray-400" />
                      <span>Class: {tree.class}</span>
                    </div>
                    <div className="flex items-center font-semibold gap-2 text-sm text-gray-600 cursor-default">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span>{tree.location}</span>
                    </div>
                    <div className="flex items-center font-semibold gap-2 text-sm text-gray-600 cursor-default">
                      <FaTree className="text-gray-400" />
                      <span>Height: {tree.height}</span>
                    </div>
                  </div>

                  {/* Health Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600 cursor-default">Health Status:</span>
                    <span className={`capitalize cursor-default px-2 py-1 rounded-full text-xs font-medium ${tree.health.toLowerCase() === 'excellent' || tree.health.toLowerCase() === 'good'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {tree.health}
                    </span>
                  </div>

                  {/* Impact Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="cursor-default text-center p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-600 font-semibold">CO₂ Reduce (kg/year)</p>
                      <p className="text-sm font-semibold text-gray-900">{tree.impact.co2Reduced.toFixed(2)} kg</p>
                    </div>
                    <div className="cursor-default text-center p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-600 font-semibold">O₂ Produced (kg/year)</p>
                      <p className="text-sm font-semibold text-gray-900">{tree.impact.oxygenProduced.toFixed(2)} kg</p>
                    </div>
                    {/* <div className="cursor-default text-center p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-600">Carbon</p>
                      <p className="text-sm font-semibold text-gray-900">{tree.impact.carbonStored}kg</p>
                    </div> */}
                  </div>

                  {/* Actions */}
                  {/* <div className="flex gap-2">
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
                </div> */}
                </div>
              </div>
            ))}
          </div>
        )}

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
                        <p className="text-sm  text-gray-600">Planted Date</p>
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
                        <p className="text-sm text-gray-600">CO₂ Reduced (kg/year)</p>
                        <p className="text-xl font-bold text-green-600">{selectedTree.impact.co2Reduced.toFixed(2)} kg</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">O₂ Produced (kg/year)</p>
                        <p className="text-xl font-bold text-blue-600">{selectedTree.impact.oxygenProduced.toFixed(2)} kg</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600">Carbon Stored</p>
                        <p className="text-xl font-bold text-purple-600">{selectedTree.impact.carbonStored.toFixed(2)} kg</p>
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

        {/* Plant Tree Modal */}
        {showPlantModal && (
          <div className="fixed inset-0 bg-[#00000091] bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Plant a New Tree</h2>
                  <button
                    onClick={() => {
                      setShowPlantModal(false);
                      setPlantFormData({
                        tree_id: '',
                        planting_date: new Date().toISOString().split('T')[0],
                        height: '',
                        health: 'good',
                        class: '',
                        location: '',
                        image: null
                      });
                    }}
                    className="text-gray-400 hover:text-gray-600 text-2xl bg-red-500 p-2 rounded-full px-4 text-white"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handlePlantTree} className="space-y-4">
                  {/* Tree Selection */}
                  <div>
                    <label htmlFor="tree_id" className="block text-sm font-medium text-gray-700 mb-2">
                      Select Tree <span className="text-red-500">*</span>
                    </label>
                    {loadingTrees ? (
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-[#1c756b]"></div>
                        <span>Loading trees...</span>
                      </div>
                    ) : (
                      <select
                        id="tree_id"
                        name="tree_id"
                        value={plantFormData.tree_id}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1c756b] focus:border-transparent"
                      >
                        <option value="">Select a tree</option>
                        {availableTrees.map((tree) => (
                          <option key={tree.id} value={tree.id}>
                            {tree.name_en} ({tree.name_sc}) - {tree.category}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Planting Date */}
                  <div>
                    <label htmlFor="planting_date" className="block text-sm font-medium text-gray-700 mb-2">
                      Planting Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="planting_date"
                      value={plantFormData.planting_date || ""}
                      onChange={handleInputChange}
                      // onClick={(e) => e.currentTarget.showPicker?.()}
                      disabled
                      // onKeyDown={(e) => e.preventDefault()}   // ⛔ blocks typing
                      max="2026-12-31"
                      required
                      className="w-full cursor-not-allowed px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1c756b]"
                    />

                  </div>

                  {/* Height */}
                  <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                      Height (meters) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="height"
                      name="height"
                      value={plantFormData.height}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.1"
                      placeholder="e.g., 3.0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1c756b] focus:border-transparent"
                    />
                  </div>

                  {/* Health */}
                  <div>
                    <label htmlFor="health" className="block text-sm font-medium text-gray-700 mb-2">
                      Health Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="health"
                      name="health"
                      value={plantFormData.health}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1c756b] focus:border-transparent"
                    >
                      <option value="good">Good</option>
                      <option value="excellent">Excellent</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>

                  {/* Class */}
                  <div>
                    <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
                      Class <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="class"
                      name="class"
                      value={plantFormData.class || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1c756b] focus:border-transparent bg-white"
                    >
                      <option value="" disabled>
                        Select Class
                      </option>

                      <option value="I">Class I</option>
                      <option value="II">Class II</option>
                      <option value="III">Class III</option>
                      <option value="IV">Class IV</option>
                      <option value="V">Class V</option>
                      <option value="VI">Class VI</option>
                      <option value="VII">Class VII</option>
                      <option value="VIII">Class VIII</option>
                      <option value="IX">Class IX</option>
                      <option value="X">Class X</option>
                      <option value="XI">Class XI</option>
                      <option value="XII">Class XII</option>
                    </select>

                  </div>

                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={plantFormData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., indore, mp"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1c756b] focus:border-transparent"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                      Tree Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1c756b] focus:border-transparent"
                    />
                    {plantFormData.image && (
                      <p className="mt-2 text-sm text-gray-600">
                        Selected: {plantFormData.image.name}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPlantModal(false);
                        setPlantFormData({
                          tree_id: '',
                          planting_date: new Date().toISOString().split('T')[0],
                          height: '',
                          health: 'good',
                          class: '',
                          location: '',
                          image: null
                        });
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg  hover:bg-[#204b73] cursor-pointer hover:text-white transition-colors"
                      disabled={planting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={planting}
                      className="flex-1 px-4 py-2 bg-[#204b73] text-white rounded-lg border hover:text-[#204b73] border-[#204b73] hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {planting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Planting...
                        </span>
                      ) : (
                        'Plant Tree'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
