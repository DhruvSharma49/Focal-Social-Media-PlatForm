import { useState } from "react";
import { Heart, X, MoreHorizontal, Trash2 } from "lucide-react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const ProfilePostModal = ({ post, onClose, currentUser, setUserPosts }) => {
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const [animating, setAnimating] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const token = localStorage.getItem("token");

  if (!post) return null;

  const isLiked = post?.likes?.some(
    (id) => id?.toString() === currentUser?._id?.toString()
  );

  const updatePostState = (updatedPost) => {
    setUserPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );
  };

  const handleLike = async () => {
    try {
      const url = isLiked
        ? `/post/unlike/${post._id}`
        : `/post/like/${post._id}`;

      const { data } = await api.put(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      updatePostState(data);
    } catch (err) {
      console.log("Like error:", err.response?.data || err.message);
    }
  };

  const handleDoubleClick = async () => {
    if (!isLiked) {
      try {
        setAnimating(true);
        setTimeout(() => setAnimating(false), 600);

        const { data } = await api.put(`/post/like/${post._id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });

        updatePostState(data);
      } catch (err) {
        console.log("Double click error:", err.response?.data || err.message);
      }
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const { data } = await api.put(
        `/post/comment/${post._id}`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      updatePostState(data);
      setCommentText("");
    } catch (err) {
      console.log("Comment error:", err.response?.data || err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/post/delete/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserPosts((prev) => prev.filter((p) => p._id !== post._id));
      onClose();
    } catch (err) {
      console.log("Delete error:", err.response?.data || err.message);
    }
  };

  const isOwner = post?.postedBy?._id === currentUser?._id;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 w-[950px] h-[650px] rounded-2xl shadow-2xl flex overflow-hidden">
        
        {/* LEFT IMAGE */}
        <div
          className="w-1/2 bg-black relative flex items-center justify-center"
          onDoubleClick={handleDoubleClick}
        >
          <img
            src={post?.image}
            className="max-h-full object-contain"
            alt=""
          />

          {animating && (
            <Heart className="absolute w-28 h-28 text-white fill-white animate-ping" />
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 flex flex-col">

          {/* HEADER */}
          <div className="flex justify-between items-center px-5 py-4 relative">
            <div className="flex items-center gap-3">
              <img
                src={post?.postedBy?.avatarUrl}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-zinc-700"
                alt=""
              />
              <span
                onClick={() =>
                  navigate(`/profile/${post?.postedBy?._id}`)
                }
                className="font-semibold cursor-pointer hover:opacity-70 transition"
              >
                {post?.postedBy?.username}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* 3-dot menu only for owner */}
              {isOwner && (
                <div className="relative">
                  <MoreHorizontal
                    className="cursor-pointer hover:opacity-70 transition"
                    onClick={() => setShowMenu(!showMenu)}
                  />
                  {showMenu && (
                    <div className="absolute right-0 top-6 bg-white dark:bg-zinc-800 shadow-lg rounded-md p-2 z-10">
                      <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 px-3 py-1 hover:bg-red-500 hover:text-white rounded-md text-sm"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              )}

              <X
                className="cursor-pointer hover:rotate-90 transition duration-300"
                size={22}
                onClick={onClose}
              />
            </div>
          </div>

          {/* CAPTION */}
          {post?.caption && (
            <div className="px-5 pb-4 text-sm border-b border-gray-200 dark:border-zinc-700">
              <span className="text-gray-700 dark:text-gray-300">
                {post?.caption}
              </span>
            </div>
          )}

          {/* COMMENTS */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {post?.comments?.length > 0 ? (
              post.comments.map((c) => (
                <div key={c._id} className="text-sm">
                  <span
                    onClick={() =>
                      navigate(`/profile/${c?.postedBy?._id}`)
                    }
                    className="font-semibold mr-2 cursor-pointer hover:opacity-70"
                  >
                    {c?.postedBy?.username}
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    {c?.text}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">
                No comments yet.
              </p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="border-t border-gray-200 dark:border-zinc-700 px-5 py-4">
            <div className="flex items-center gap-4 mb-3">
              <Heart
                onClick={handleLike}
                className={`cursor-pointer transition duration-200 transform ${
                  isLiked
                    ? "fill-red-500 text-red-500 scale-110"
                    : "text-gray-700 dark:text-gray-300 hover:scale-110"
                }`}
              />
              <span className="font-semibold text-sm">
                {post?.likes?.length || 0} likes
              </span>
            </div>

            <form onSubmit={handleComment} className="flex gap-3">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 outline-none text-sm bg-transparent"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />

              <button
                type="submit"
                disabled={!commentText.trim()}
                className="text-blue-500 font-semibold text-sm disabled:opacity-40"
              >
                Post
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePostModal;
