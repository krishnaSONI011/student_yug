'use client';

import { useEffect, useState } from 'react';
import { FaPlus, FaImage, FaMapMarkerAlt, FaHeart, FaComment, FaShare } from 'react-icons/fa';
import Image from 'next/image';
import axios from 'axios';

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
      <div className="max-w-4xl mx-auto p-6">

        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#204b73] to-[#204b73] rounded-2xl p-6 text-white mb-6">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {userData?.first_name ?? 'User'}! 🌱</h2>
          <p className="text-green-100">
            Share your tree planting journey and inspire others to go green!
          </p>
        </div>

        {/* Create Post Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
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
              className="bg-[#204b73] text-white px-6 py-3 rounded-full hover:bg-[#204b73] transition-colors flex items-center gap-2"
            >
              <FaPlus />
              Post
            </button>
          </div>
        </div>

        {/* Create Post Modal */}
        {showCreatePost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
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

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleCreatePost}
                  className="px-6 py-2 bg-[#204b73] text-white rounded-lg hover:bg-[#204b73]"
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
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >

              {/* Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/fina.jpg"
                    width={48}
                    height={48}
                    alt={post.first_name}
                    className="rounded-full"
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{post.first_name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>2 hours</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-xs" />
                        {post.location}
                      </span>
                    </div>
                  </div>

                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    tree
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="px-6 pb-4">
                <p className="text-gray-800 leading-relaxed">
                  {post.description}
                </p>
              </div>

              {/* IMAGE WITH SKELETON */}
              {post.img && (
                <div className="px-6 pb-4">

                  {/* Skeleton */}
                  {!loadedImages[post.id] && (
                    <div className="w-full h-[300px] rounded-lg bg-gray-200 animate-pulse"></div>
                  )}

                  {/* Actual Image */}
                  <div>
                    <Image
                      src={'https://irisinformatics.net/studentyug/' + post.img}
                      width={600}
                      height={400}
                      alt="Tree planting"
                      className="w-full h-[500px] rounded-lg object-cover"
                      onLoadingComplete={() => {
                        setLoadedImages((prev) => ({ ...prev, [post.id]: true }));
                      }}
                    />
                  </div>

                </div>
              )}

              {/* Actions */}
              <div className="px-6 py-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                      <FaHeart />
                      24
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
                      <FaComment />
                      2
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-green-500">
                      <FaShare />
                      3
                    </button>
                  </div>

                  <div className="text-sm text-gray-500">
                    23 people liked this
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Floating Button */}
      <button
        onClick={() => setShowCreatePost(true)}
        className="fixed bottom-6 right-6 bg-[#1c756b] text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center"
      >
        <FaPlus className="text-xl" />
      </button>

    </div>
  );
}
