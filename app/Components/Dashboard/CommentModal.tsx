"use client";

import { FaTimes } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface CommentModalProps {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
  onCommentAdded: () => void;
}

export default function CommentModal({ postId, isOpen, onClose ,onCommentAdded }: CommentModalProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const commentsRef = useRef<HTMLDivElement | null>(null); // ⭐ TOP SCROLL TARGET

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData.user_id);
    }

    if (isOpen) loadComments();
  }, [isOpen]);

  // ⭐ Scroll to TOP
  function scrollToTop() {
    setTimeout(() => {
      if (commentsRef.current) {
        commentsRef.current.scrollTop = 0;
      }
    }, 10);
  }

  async function loadComments() {
    try {
      const res = await axios.get(
        `https://irisinformatics.net/studentyug/wb/posts_comments?post_id=${postId}`
      );

      setComments(res.data.data || []);

      // ⭐ Scroll to TOP on load
      scrollToTop();
    } catch (e) {
      console.log(e);
    }
  }

  async function addComment() {
    if (!newComment.trim()) return;

    const user = localStorage.getItem("user");
    let userID;

    if (user) {
      const userData = JSON.parse(user);
      userID = userData.user_id;
    }

    try {
      const formData = new FormData();
      formData.append("user_id", userID);
      formData.append("post_id", postId);
      formData.append("comments", newComment);

      await axios.post(
        "https://irisinformatics.net/studentyug/wb/posts_add_comments",
        formData
      );

      setNewComment("");

      loadComments();

      // ⭐ Always scroll to TOP after adding
      scrollToTop();
      onCommentAdded();
    } catch (e) {
      console.log(e);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-5 relative animate-fadeIn">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <FaTimes size={22} />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-900 text-center">
          Comments
        </h2>

        {/* COMMENTS LIST */}
        <div
          ref={commentsRef}
          className="max-h-72 overflow-y-auto space-y-3 mb-4 p-2 scrollbar-thin"
        >
          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">No comments yet.</p>
          ) : (
            comments.map((c, i) => {
              const isUser = String(c.user_id) === String(currentUser);

              return (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded-xl shadow-sm ${
                    isUser
                      ? "bg-blue-100 border border-blue-300"
                      : "bg-gray-100"
                  }`}
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">
                    {c.first_name?.charAt(0)?.toUpperCase()}
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">
                      {c.first_name} {isUser && "(You)"}
                    </p>
                    <p className="text-gray-700">{c.comments}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ADD COMMENT */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <button
            onClick={addComment}
            className="bg-[#204b73] hover:bg-[#204b73] text-white px-4 py-2 rounded-full transition font-medium"
          >
            Send
          </button>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #c4c4c4;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
