'use client';

import { useEffect, useState } from 'react';
import { FaPlus, FaImage, FaMapMarkerAlt, FaHeart, FaComment, FaShare } from 'react-icons/fa';
import Image from 'next/image';
import axios from 'axios';
import PostCard from '../Components/Dashboard/PostCard';

interface PostData {
  id: string;
  location: string;
  description: string;
  first_name: string;
  img: string;
}

interface UserData {
  user_id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});

  const [newPost, setNewPost] = useState({
    content: '',
    image: null as File | null,
    location: ''
  });

  useEffect(() => {
    // Load user from localStorage safely
    const user = localStorage.getItem('user');
    if (user) {
      try {
        setUserData(JSON.parse(user) as UserData);
      } catch {
        setUserData(null);
      }
    }
  }, []);

  useEffect(() => {
    getThePost();

    const interval = setInterval(() => {
      getThePost();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  async function getThePost() {
    try {
      const response = await axios.get('https://irisinformatics.net/studentyug/wb/get_all_posts');
      if (response.data.status === '1') {
        setPosts(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPost({ ...newPost, image: file });
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.content || !newPost.location || !newPost.image) {
      alert('Please fill all fields and select an image');
      return;
    }

    if (!userData?.user_id) {
      alert('User not found');
      return;
    }

    const formData = new FormData();
    formData.append('user_id', userData.user_id); // dynamic user_id
    formData.append('location', newPost.location);
    formData.append('description', newPost.content);
    formData.append('img', newPost.image); // SAME KEY AS POSTMAN

    try {
      const response = await axios.post(
        'https://irisinformatics.net/studentyug/wb/post_upload',
        formData
      );

      console.log('Upload Response:', response.data);

      if (response.data.status === '1') {
        alert('Post uploaded successfully!');

        // Refresh posts
        getThePost();

        // Reset form
        setNewPost({ content: '', image: null, location: '' });
        setShowCreatePost(false);
      } else {
        alert('Upload failed!');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data || error.message);
      } else {
        console.log(error);
      }
      alert('Server error while uploading');
    }
  };

  return (
    <div className="dashboard-container min-h-screen">
      <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6">

        {/* Welcome Section */}
        <div className="bg-gradient-to-r cursor-default from-[#204b73] to-[#204b73] rounded-2xl p-4 sm:p-6 text-white mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, {userData?.first_name ?? 'User'}! 🌱</h2>
          <p className="text-sm sm:text-base text-green-100">
            Share your tree planting journey and inspire others to go green!
          </p>
        </div>

        {/* Create Post Section */}
        <div id='post-create' className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <Image
              src="/logo.png"
              width={40}
              height={40}
              alt="Profile"
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0"
            />

            <button
              onClick={() => setShowCreatePost(true)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-full px-3 sm:px-4 py-2 sm:py-3 text-left text-sm sm:text-base text-gray-500 transition-colors"
            >
              <span className="hidden sm:inline">Share your tree planting experience...</span>
              <span className="sm:hidden">Share experience...</span>
            </button>

            <button
              onClick={() => setShowCreatePost(true)}
              className="bg-[#204b73] text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-white hover:text-[#204b73] transition-colors flex items-center gap-1 sm:gap-2 border border-[#204b73] cursor-pointer text-sm sm:text-base"
            >
              <FaPlus className="text-sm sm:text-base" />
              <span className="hidden sm:inline">Post</span>
            </button>
          </div>
        </div>

        {/* Create Post Modal */}
        {showCreatePost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
            <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg sm:text-xl font-bold mb-4">Create New Post</h3>

              <div className="space-y-4">
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Share your tree planting experience..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c756b] resize-none"
                  rows={4}
                />

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <label className="flex items-center gap-2 text-sm sm:text-base text-gray-600 cursor-pointer">
                    <FaImage />
                    <span>Add Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  <label className="flex items-center gap-2 text-sm sm:text-base text-gray-600 cursor-pointer">
                    <FaMapMarkerAlt />
                    <span className="whitespace-nowrap">Add Location</span>
                    <input
                      type="text"
                      value={newPost.location}
                      onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                      placeholder="Where did you plant?"
                      className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </label>
                </div>

                {newPost.image && (
                  <div className="relative w-full h-[200px]">
                    <Image
                      src={URL.createObjectURL(newPost.image)}
                      fill
                      alt="Preview"
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-gray-300 rounded-lg hover:bg-[#204b73] hover:text-white text-sm sm:text-base"
                >
                  Cancel
                </button>

                <button
                  onClick={handleCreatePost}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-[#204b73] text-white rounded-lg hover:bg-white hover:text-[#204b73] border border-[#204b73] text-sm sm:text-base"
                >
                  Share Post
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posts Feed */}
        <div className="space-y-4 sm:space-y-6">
          {posts.map((post, index) => (
            <PostCard key={index} id={post.id} first_name={post.first_name} description={post.description} img={post.img} location={post.location} />
          ))}
        </div>

      </div>

      {/* Floating Button */}
      <button
        onClick={() => setShowCreatePost(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#204b73] text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center z-40"
        aria-label="Create new post"
      >
        <FaPlus className="text-lg sm:text-xl" />
      </button>

    </div>
  );
}
