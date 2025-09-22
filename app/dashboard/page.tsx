'use client';

import { useState } from 'react';
import { FaPlus, FaImage, FaMapMarkerAlt, FaHeart, FaComment, FaShare } from 'react-icons/fa';
import Image from 'next/image';

export default function Dashboard() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    content: '',
    image: null as File | null,
    location: ''
  });

  // Sample posts data
  const posts = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: '/fina.jpg',
        location: 'Delhi, India'
      },
      content: 'Just planted my 5th tree today! 🌱 The sapling is a beautiful Neem tree that will provide shade and clean air for years to come. #TreePlanting #GreenIndia',
      image: '/fina.jpg',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
      shares: 3,
      treeType: 'Neem Tree'
    },
    {
      id: 2,
      user: {
        name: 'Raj Patel',
        avatar: '/fina.jpg',
        location: 'Mumbai, India'
      },
      content: 'Amazing experience planting trees with my college friends! We planted 10 trees in our campus today. Every tree counts! 🌳',
      image: '/fina.jpg',
      timestamp: '4 hours ago',
      likes: 42,
      comments: 15,
      shares: 7,
      treeType: 'Mixed Species'
    },
    {
      id: 3,
      user: {
        name: 'Priya Sharma',
        avatar: '/fina.jpg',
        location: 'Bangalore, India'
      },
      content: 'My mango tree is growing beautifully! Planted it 6 months ago and it\'s already 3 feet tall. Can\'t wait to see it bear fruits! 🥭',
      image: '/fina.jpg',
      timestamp: '6 hours ago',
      likes: 18,
      comments: 5,
      shares: 2,
      treeType: 'Mango Tree'
    }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPost({ ...newPost, image: file });
    }
  };

  const handleCreatePost = () => {
    // Handle post creation logic here
    console.log('Creating post:', newPost);
    setShowCreatePost(false);
    setNewPost({ content: '', image: null, location: '' });
  };

  return (
    <div className="dashboard-container min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#1c756b] to-[#2a8b7f] rounded-2xl p-6 text-white mb-6">
          <h2 className="text-2xl font-bold mb-2">Welcome back, John! 🌱</h2>
          <p className="text-green-100">Share your tree planting journey and inspire others to go green!</p>
        </div>

        {/* Create Post Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <Image
              src="/fina.jpg"
              width={48}
              height={48}
              alt="Profile"
              className="rounded-full"
            />
            <button
              onClick={() => setShowCreatePost(true)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-3 text-left text-gray-500 transition-colors"
            >
              Share your tree planting experience...
            </button>
            <button
              onClick={() => setShowCreatePost(true)}
              className="bg-[#1c756b] text-white px-6 py-3 rounded-full hover:bg-[#155e56] transition-colors flex items-center gap-2"
            >
              <FaPlus />
              Post
            </button>
          </div>
        </div>

        {/* Create Post Modal */}
        {showCreatePost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
              <h3 className="text-xl font-bold mb-4">Create New Post</h3>
              
              <div className="space-y-4">
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Share your tree planting experience..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c756b] resize-none"
                  rows={4}
                />
                
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                    <FaImage />
                    <span>Add Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  
                  <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                    <FaMapMarkerAlt />
                    <span>Add Location</span>
                    <input
                      type="text"
                      value={newPost.location}
                      onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                      placeholder="Where did you plant?"
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </label>
                </div>
                
                {newPost.image && (
                  <div className="relative">
                    <Image
                      src={URL.createObjectURL(newPost.image)}
                      width={200}
                      height={200}
                      alt="Preview"
                      className="rounded-lg"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  className="px-6 py-2 bg-[#1c756b] text-white rounded-lg hover:bg-[#155e56] transition-colors"
                >
                  Share Post
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="post-card bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Post Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={post.user.avatar}
                    width={48}
                    height={48}
                    alt={post.user.name}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{post.user.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{post.timestamp}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-xs" />
                        {post.user.location}
                      </span>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {post.treeType}
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-6 pb-4">
                <p className="text-gray-800 leading-relaxed">{post.content}</p>
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="px-6 pb-4">
                  <Image
                    src={post.image}
                    width={600}
                    height={400}
                    alt="Tree planting"
                    className="w-full rounded-lg"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="px-6 py-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                      <FaHeart />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                      <FaComment />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                      <FaShare />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    {post.likes} people liked this
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowCreatePost(true)}
        className="fab bg-[#1c756b] text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center"
      >
        <FaPlus className="text-xl" />
      </button>
    </div>
  );
}
