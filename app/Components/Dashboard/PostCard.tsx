"use client";

import Image from "next/image";
import { FaMapMarkerAlt, FaHeart, FaComment, FaShare } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import confetti from "canvas-confetti"; // 🎉 Confetti Library
import CommentModal from "./CommentModal";

interface PostData {
  id: string;
  location: string;
  first_name: string;
  description: string;
  img: string;
}

export default function PostCard({
  id,
  location,
  first_name,
  description,
  img,
}: PostData) {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});
  const [like, setLike] = useState<number>(0);
  const [comment, setCommnet] = useState<number>(0);
  const [isLiked, setisLike] = useState<boolean>(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);

  // ❤️ Heart Button Reference (for confetti origin)
  const heartRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    getLikeAndCommnet();
  }, []);

  async function getLikeAndCommnet() {
    const user = localStorage.getItem("user");
    let userID;
    if (user) {
      const userData = JSON.parse(user);
      userID = userData.user_id;
    }

    try {
      const response = await axios.get(
        `https://irisinformatics.net/studentyug/wb/count_liked_posts?post_id=${id}&user_id=${userID}`
      );

      setCommnet(response.data.data.total_comments);
      setLike(response.data.data.total_likes);
      setisLike(response.data.data.is_liked);
    } catch (e) {
      console.log(e);
    }
  }

  // 🎉 Confetti Burst from EXACT Heart Position
  function runConfettiFromHeart() {
    if (!heartRef.current) return;

    const rect = heartRef.current.getBoundingClientRect();

    const origin = {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    };

    confetti({
      particleCount: 50,
      spread: 30,
      startVelocity: 10,
      origin,
    });
  }

  // ❤️ LIKE POST
  async function likeMyPost() {
    const user = localStorage.getItem("user");
    let userID;
    if (user) {
      const userData = JSON.parse(user);
      userID = userData.user_id;
    }

    // Optimistic UI
    const oldLike = like;
    const oldIsLiked = isLiked;

    if (!isLiked) {
      setLike(like + 1);
      runConfettiFromHeart(); // 🎉 Confetti here
    } else {
      setLike(like - 1);
    }

    setisLike(!isLiked);

    // API Request
    try {
      const formData = new FormData();
      formData.append("user_id", userID);
      formData.append("post_id", id);

      await axios.post(
        "https://irisinformatics.net/studentyug/wb/posts_liked",
        formData
      );

      getLikeAndCommnet();
    } catch (e) {
      console.log(e);
      setLike(oldLike);
      setisLike(oldIsLiked);
    }
  }
  function updateCommentCount() {
    setCommnet(prev => prev + 1);
  }
  

  return (
    <>
    <div
      key={id}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            width={48}
            height={48}
            alt={first_name}
            className="rounded-full"
          />

          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{first_name}</h4>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>2 hours</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-xs" />
                {location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 pb-4">
        <p className="text-gray-800 leading-relaxed">{description}</p>
      </div>

      {/* Image + Skeleton */}
      {img && (
        <div className="px-6 pb-4">
          {!loadedImages[id] && (
            <div className="w-full h-[300px] rounded-lg bg-gray-200 animate-pulse"></div>
          )}

          <Image
            src={`https://irisinformatics.net/studentyug/${img}`}
            width={600}
            height={400}
            alt="Post image"
            className={`w-full h-[500px] rounded-lg object-cover transition-opacity duration-500 ${
              loadedImages[id] ? "opacity-100" : "opacity-0"
            }`}
            onLoadingComplete={() =>
              setLoadedImages((prev) => ({ ...prev, [id]: true }))
            }
          />
        </div>
      )}

      {/* Actions */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">

            {/* ❤️ LIKE BUTTON */}
            <button
              ref={heartRef}
              onClick={likeMyPost}
              className={`flex items-center gap-2 relative transition-all ${
                isLiked ? "text-red-500" : "text-gray-600"
              }`}
            >
              <FaHeart className={`${isLiked ? "scale-125" : ""} transition-all`} />
              {like}
            </button>

            {/* 💬 COMMENT BUTTON */}
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500" onClick={() => setOpenCommentModal(true)}>
              <FaComment />
              {comment}
            </button>

            {/* 🔄 SHARE BUTTON */}
            <button className="flex items-center gap-2 text-gray-600 hover:text-green-500">
              <FaShare />
              3
            </button>
          </div>

          <div className="text-sm text-gray-500">{like} people liked this</div>
        </div>
      </div>
    </div>
    <CommentModal 
  postId={id} 
  isOpen={openCommentModal} 
  onClose={() => setOpenCommentModal(false)} 
  onCommentAdded={updateCommentCount}
/>

    </>
  );
}
