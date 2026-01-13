"use client";

import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaHeart,
  FaComment,
 
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import confetti from "canvas-confetti";


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
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [like, setLike] = useState<number>(0);
  const [comment, setCommnet] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);

  const heartRef = useRef<HTMLButtonElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getLikeAndComment();
  }, []);

  async function getLikeAndComment() {
    const user = localStorage.getItem("user");
    const userID = user ? JSON.parse(user).user_id : "";

    try {
      const res = await axios.get(
        `https://irisinformatics.net/studentyug/wb/count_liked_posts?post_id=${id}&user_id=${userID}`
      );

      setCommnet(res.data.data.total_comments);
      setLike(res.data.data.total_likes);
      setIsLiked(res.data.data.is_liked);
    } catch (e) {
      console.log(e);
    }
  }

  function runConfettiFromHeart() {
    if (!heartRef.current) return;

    const rect = heartRef.current.getBoundingClientRect();

    confetti({
      particleCount: 50,
      spread: 30,
      startVelocity: 10,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
    });
  }

  async function likeMyPost() {
    const user = localStorage.getItem("user");
    const userID = user ? JSON.parse(user).user_id : "";

    const oldLike = like;
    const oldLiked = isLiked;

    setIsLiked(!isLiked);
    setLike(isLiked ? like - 1 : like + 1);

    if (!isLiked) runConfettiFromHeart();

    try {
      const formData = new FormData();
      formData.append("user_id", userID);
      formData.append("post_id", id);

      await axios.post(
        "https://irisinformatics.net/studentyug/wb/posts_liked",
        formData
      );
    } catch (e) {
      setLike(oldLike);
      setIsLiked(oldLiked);
    }
  }

  function updateCommentCount() {
    setCommnet((prev) => prev + 1);
  }

  // ✅ SHARE TO WHATSAPP WITH SCREENSHOT
  // async function sharePostToWhatsApp() {
  //   if (!cardRef.current) return;
  
  //   try {
  //     const dataUrl = await toPng(cardRef.current, {
  //       cacheBust: true,
  //       pixelRatio: 2,
  //       backgroundColor: "#ffffff",
  //     });
  
  //     // Convert to blob
  //     const res = await fetch(dataUrl);
  //     const blob = await res.blob();
  
  //     const url = URL.createObjectURL(blob);
  
  //     // Download image
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "studentyug-post.png";
  //     a.click();
  
  //     // Open WhatsApp
  //     const text = encodeURIComponent(
  //       "🌱 Check out this post on Student Yug!"
  //     );
  //     window.open(`https://wa.me/?text=${text}`, "_blank");
  //   } catch (err) {
  //     console.error("Screenshot failed:", err);
  //   }
  // }
  

  return (
    <>
      <div
        ref={cardRef}
        className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4 flex items-center gap-2 sm:gap-3">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt={first_name}
            className="rounded-full w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0"
          />

          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-sm sm:text-base text-gray-900 truncate">{first_name}</h4>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
              <FaMapMarkerAlt className="flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-4 sm:px-6 pb-3 sm:pb-4">
          <p className="text-sm sm:text-base text-gray-800 break-words">{description}</p>
        </div>

        {/* Image */}
        {img && (
          <div className="px-4 sm:px-6 pb-3 sm:pb-4">
            {!loadedImages[id] && (
              <div className="h-[200px] sm:h-[300px] md:h-[400px] bg-gray-200 animate-pulse rounded-lg" />
            )}
            <Image
              src={`https://irisinformatics.net/studentyug/${img}`}
              width={600}
              height={400}
              alt="Post"
              className={`w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-lg object-cover transition-opacity ${
                loadedImages[id] ? "opacity-100" : "opacity-0"
              }`}
              onLoadingComplete={() =>
                setLoadedImages((p) => ({ ...p, [id]: true }))
              }
            />
          </div>
        )}

        {/* Actions */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
          <div className="flex gap-4 sm:gap-6">
            <button
              ref={heartRef}
              onClick={likeMyPost}
              className={`flex gap-1 sm:gap-2 items-center text-sm sm:text-base ${
                isLiked ? "text-red-500" : "text-gray-600"
              }`}
            >
              <FaHeart className="text-base sm:text-lg" />
              <span>{like}</span>
            </button>

            <button
              onClick={() => setOpenCommentModal(true)}
              className="flex gap-1 sm:gap-2 items-center text-sm sm:text-base text-gray-600"
            >
              <FaComment className="text-base sm:text-lg" />
              <span>{comment}</span>
            </button>
          </div>

          <div className="text-xs sm:text-sm text-gray-500">
            {like} {like === 1 ? 'person' : 'people'} liked this
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
