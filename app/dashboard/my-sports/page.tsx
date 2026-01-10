'use client';

import { useState, useEffect } from 'react';
import { FaTree, FaCalendarAlt, FaMapMarkerAlt, FaLeaf, FaTrophy, FaPlus } from 'react-icons/fa';
import { FaBaseball } from 'react-icons/fa6';
import { GiLevelThreeAdvanced, GiPoliceBadge } from 'react-icons/gi';
import { MdSportsBasketball } from 'react-icons/md';

interface Sport {
  id: number;
  sports_name: string;
  category: string;
  sports_name_hi: string
  sports_img: string;
  level: string;
  achievement: string;
  participation_date: string;
  class: string;
  location: string;
  play: string;
  status: string;
  image: string;
  certificate: string | null;
  created_at: string;
  updated_at: string;
  description: string;
}

interface ApiSportsData {
  id?: string;
  user_id?: string;
  sports_id?: string;
  sports_img: string;
  sports_name_hi?: string;
  sports_name?: string;
  category?: string;
  level?: string;
  participation_date?: string;
  achievement?: string;
  location?: string;
  play?: string;
  upload_certificate?: string | null;
  created_at?: string;
  updated_at?: string;
}

interface ApiResponse {
  data: ApiSportsData[];
}

interface AvailableTree {
  id: string;
  name: string;
  name_hi: string;
  name_sc: string;
  category: string;
  sports_img: string;
  carbon: string;
  oxygen: string;
  description: string;
  benefits: string[];
  img: string;
  status: string;
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

// Transform API data to Sport interface
const userId = getUserIdFromStorage();
const transformApiDataToSport = (apiData: ApiSportsData): Sport => ({
  id: parseInt(apiData.id || apiData.sports_id || '0') || 0,
  sports_name: apiData.sports_name || 'Unknown Sport',
  category: apiData.category || 'General',
  sports_name_hi: apiData.sports_name_hi || '',
  sports_img: apiData.sports_img || '',
  level: apiData.level || 'N/A',
  achievement: apiData.achievement || 'N/A',
  participation_date: apiData.participation_date || '',
  class: "na",
  location: apiData.location || 'Unknown Location',
  play: apiData.play || 'N/A',
  status: 'Active',
  image: '',
  certificate: apiData.upload_certificate || null,
  created_at: apiData.created_at || '',
  updated_at: apiData.updated_at || '',
  description: ''
});

// Get user_id from localStorage


export default function MySportsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [sportsData, setSportsData] = useState<Sport[]>([]);
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

  // Fetch sports from API
  
  useEffect(() => {
    const fetchTrees = async () => {
      try {
        setLoading(true);
        setError(null);

        
        if (!userId) {
          setError('User not found. Please login again.');
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://irisinformatics.net/studentyug/wb/getSportsParticipation?user_id=${userId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch trees: ${response.statusText}`);
        }

        const result: ApiResponse = await response.json();

        if (result.data && Array.isArray(result.data)) {
          const transformedSports = result.data.map(transformApiDataToSport);
          setSportsData(transformedSports);
        } else {
          setSportsData([]);
        }
      } catch (err) {
        console.error('Error fetching trees:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch sports');
        setSportsData([]);
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
            'https://irisinformatics.net/studentyug/wb/get_all_sports'
          );

          if (!response.ok) {
            throw new Error('Failed to fetch available sports');
          }

          const result: AvailableTreesResponse = await response.json();

          if (result.data && Array.isArray(result.data)) {
            setAvailableTrees(result.data);
            console.log(result.data)
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
      formData.append('sports_id', plantFormData.tree_id);
      formData.append('participation_date', plantFormData.planting_date);
      formData.append('achievement', plantFormData.height);
      formData.append('play', plantFormData.health);
      formData.append('level', plantFormData.class);
      formData.append('location', plantFormData.location);

      if (plantFormData.image) {
        formData.append('image', plantFormData.image);
      }

      const response = await fetch(
        'https://irisinformatics.net/studentyug/wb/addSportsParticipation',
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

      // Refresh the sports list
      const refreshUserId = getUserIdFromStorage();
      if (refreshUserId) {
        const refreshResponse = await fetch(
          `https://irisinformatics.net/studentyug/wb/getSportsParticipation?user_id=${refreshUserId}`
        );
        if (refreshResponse.ok) {
          const refreshResult: ApiResponse = await refreshResponse.json();
          if (refreshResult.data && Array.isArray(refreshResult.data)) {
            const transformedSports = refreshResult.data.map(transformApiDataToSport);
            setSportsData(transformedSports);
          }
        }
      }

      alert('Sport added successfully!');
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
    { id: 'all', label: 'All Sports', count: sportsData.length },
    { id: 'team', label: 'Team', count: sportsData.filter(s => s.play.toLowerCase() === 'team').length },
    { id: 'individual', label: 'Individual', count: sportsData.filter(s => s.play.toLowerCase() === 'individual').length },
  ];

  const filteredSports = selectedFilter === 'all'
    ? sportsData
    : sportsData.filter(sport => {
      if (selectedFilter === 'team') return sport.play.toLowerCase() === 'team';
      if (selectedFilter === 'individual') return sport.play.toLowerCase() === 'individual';
      return true;
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1c756b] mb-4"></div>
          <p className="text-gray-600">Loading sports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Sports</h2>
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#204b73] rounded-full flex items-center justify-center">
                <MdSportsBasketball className="text-2xl text-white" />
              </div>
              <div className='cursor-default'>
                <h1 className="text-3xl font-bold text-gray-900">My Sports</h1>
                <p className="text-gray-600">Track your Fitness By Playing Sports</p>
              </div>
            </div>
            <button
              onClick={() => setShowPlantModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#204b73] text-white cursor-pointer border border-[#204b73] rounded-lg hover:bg-white hover:text-[#204b73] transition-colors duration-200 font-medium shadow-sm"
            >
              <FaPlus className="text-sm" />
              Sports
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="cursor-default w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaBaseball className="text-blue-600" />
                </div>
                <div>
                  <p className="cursor-default text-2xl font-bold text-gray-900">{sportsData.length}</p>
                  <p className="text-sm text-gray-600 cursor-default font-bold">Total Sports</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaCalendarAlt className="text-blue-600" />
                </div>
                <div>
                  <p className="cursor-default text-2xl font-bold text-gray-900">{sportsData.filter(s => s.play.toLowerCase() === 'team').length}</p>
                  <p className="cursor-default text-sm text-gray-600 font-bold">Team Sports</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <FaTrophy className="text-yellow-600" />
                </div>
                <div>
                  <p className="cursor-default text-2xl font-semibold text-gray-900">{sportsData?.[0]?.level || "No Sport Yet"}</p>
                  <p className="text-sm text-gray-600 cursor-default font-bold">Level</p>
                </div>
              </div>
            </div>
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

        {/* Sports Grid */}
        {filteredSports.length === 0 ? (
          <div className="text-center cursor-default py-12">
            <MdSportsBasketball className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No sports found</h3>
            <p className="text-gray-600">No sports match your current filter criteria.</p>
          </div>
        ) : (
          <div className="grid cursor-default  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSports.map((sport) => (
              <div key={sport.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="h-48 bg-gradient-to-br relative overflow-hidden">
                  <img
                    src={`https://irisinformatics.net/studentyug/${sport.sports_img}`}
                    alt="image"
                    className="w-full h-full object-cover"
                  />
                </div>


                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{sport.sports_name}({sport.sports_name_hi})</h3>
                      <p className="text-sm text-gray-600">{sport.category}</p>
                     
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${sport.status.toLowerCase() === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                      }`}>
                      {sport.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaCalendarAlt className="text-gray-400" />
                      <span>Participation: {sport.participation_date ? new Date(sport.participation_date).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <GiPoliceBadge className="text-gray-400" />
                      <span>Class: X</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span>{sport.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <GiLevelThreeAdvanced className="text-gray-400" />
                      <span>Level : {sport.level === undefined ? "" : sport.level}</span>
                    </div>
                    {/* <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaTrophy className="text-gray-400" />
                      <span>Achievement: {sport.achievement}</span>
                    </div> */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaLeaf className="text-gray-400" />
                      <span>Play: {sport.play}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sport Detail Modal */}
        {selectedSport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSport.sports_name}</h2>
                  <button
                    onClick={() => setSelectedSport(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Sport Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="font-medium">{selectedSport.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Level</p>
                        <p className="font-medium">{selectedSport.level}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Participation Date</p>
                        <p className="font-medium">{selectedSport.participation_date ? new Date(selectedSport.participation_date).toLocaleDateString() : 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Achievement</p>
                        <p className="font-medium">{selectedSport.achievement}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Play</p>
                        <p className="font-medium">{selectedSport.play}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium">{selectedSport.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Created At</p>
                        <p className="font-medium">{selectedSport.created_at ? new Date(selectedSport.created_at).toLocaleString() : 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Updated At</p>
                        <p className="font-medium">{selectedSport.updated_at ? new Date(selectedSport.updated_at).toLocaleString() : 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Certificate */}
                  {selectedSport.certificate && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Certificate</h3>
                      <a
                        href={`https://irisinformatics.net/studentyug/${selectedSport.certificate}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1c756b] underline"
                      >
                        View Certificate
                      </a>
                    </div>
                  )}
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
                  <h2 className="text-2xl font-bold text-gray-900">Part in a new sports</h2>
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
                      Select Sports <span className="text-red-500">*</span>
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
                        <option value="">Select a Sports</option>
                        {availableTrees.map((tree) => (
                          <option key={tree.id} value={tree.id}>
                            {tree.name} ({tree.name_hi}) - {tree.category}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Planting Date */}
                  <div>
                    <label htmlFor="planting_date" className="block text-sm font-medium text-gray-700 mb-2">
                      Participation Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="planting_date"
                      name="planting_date"
                      value={plantFormData.planting_date || ""}
                      onChange={handleInputChange}
                      onClick={(e) => e.currentTarget.showPicker?.()}
                      onKeyDown={(e) => e.preventDefault()}
                      onPaste={(e) => e.preventDefault()}
                      inputMode="none"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-[#1c756b] focus:border-transparent"
                    />

                  </div>

                  {/* Height */}
                  {/* <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                      Achievement <span className="text-red-500">*</span>
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
                      placeholder="1st , 2nd"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1c756b] focus:border-transparent"
                    />
                  </div> */}

                  {/* Health */}
                  <div>
                    <label htmlFor="health" className="block text-sm font-medium text-gray-700 mb-2">
                      Play <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="health"
                      name="health"
                      value={plantFormData.health}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1c756b] focus:border-transparent"
                    >
                      <option value="Team">Team</option>
                      <option value="Individual">Individual</option>

                    </select>
                  </div>

                  {/* Class */}
                  <div>
                    <label
                      htmlFor="class"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Level <span className="text-red-500">*</span>
                    </label>

                    <select
                      id="class"
                      name="class"
                      value={plantFormData.class}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#1c756b] focus:border-transparent"
                    >
                      <option value="" disabled>
                        Select level
                      </option>
                      <option value="school">School</option>
                      <option value="district">District</option>
                      <option value="state">State</option>
                      <option value="national">National</option>
                      <option value="international">International</option>
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
                      placeholder=" indore, mp"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1c756b] focus:border-transparent"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                      Certificate Image (Optional)
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
                          Loading...
                        </span>
                      ) : (
                        'Submit'
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




