import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import api from "../utils/api";

const FeedPost = ({ post, currentUser, setPosts }) => {
  const token = localStorage.getItem("token");

  const [isLiked, setIsLiked] = useState(
    post.likes.some((id) => id.toString() === currentUser._id),
  );
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const updatePostState = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p)),
    );
    setComments(updatedPost.comments);
    setLikeCount(updatedPost.likes.length);
    setIsLiked(
      updatedPost.likes.some((id) => id.toString() === currentUser._id),
    );
  };

  // Like / Unlike
  const handleLike = async () => {
    try {
      const url = isLiked
        ? `/post/unlike/${post._id}`
        : `/post/like/${post._id}`;
      const { data } = await api.put(
        url,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      updatePostState(data);
    } catch (err) {
      console.error("Like error:", err.response?.data || err.message);
    }
  };

  // Double tap like
  const handleDoubleTap = async () => {
    if (!isLiked) {
      try {
        setShowHeart(true);
        setTimeout(() => setShowHeart(false), 1000);
        const { data } = await api.put(
          `/post/like/${post._id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        );
        updatePostState(data);
      } catch (err) {
        console.error(
          "Double tap like error:",
          err.response?.data || err.message,
        );
      }
    }
  };

  // Submit comment
  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const { data } = await api.put(
        `/post/comment/${post._id}`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setCommentText("");
      updatePostState(data);
      setShowComments(true); // automatically show new comment
    } catch (err) {
      console.error("Comment error:", err.response?.data || err.message);
    }
  };

  return (
    <article className="pb-4 border-b border-divider">
      {/* Header */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <img
            src={post.postedBy.avatarUrl}
            alt={post.postedBy.username}
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="font-semibold">{post.postedBy.username}</span>
        </div>
        <MoreHorizontal className="w-5 h-5 cursor-pointer" />
      </div>

      {/* Image */}
      <div className="relative cursor-pointer" onDoubleClick={handleDoubleTap}>
        <img
          src={post.image}
          alt="Post"
          className="w-full aspect-square object-cover"
        />
        {showHeart && (
          <Heart className="absolute w-24 h-24 text-white fill-white animate-ping inset-0 m-auto" />
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between py-3">
        <div className="flex gap-4">
          <Heart
            className={`w-6 h-6 cursor-pointer ${isLiked ? "fill-red-500 text-red-500" : ""}`}
            onClick={handleLike}
          />
          <MessageCircle
            className="w-6 h-6 cursor-pointer"
            onClick={() => setShowComments((prev) => !prev)}
          />
          <Send className="w-6 h-6 cursor-pointer" />
        </div>
   
      </div>

      {/* Likes */}
      <div className="font-semibold text-sm mb-1">
        {likeCount.toLocaleString()} likes
      </div>

      {/* Caption */}
      <div className="text-sm mb-1">
        <span className="font-semibold">{post.postedBy.username}</span>{" "}
        {post.caption}
      </div>

      {/* View all comments */}
      {comments.length > 0 && (
        <button
          className="text-muted-foreground text-sm mt-1"
          onClick={() => setShowComments((prev) => !prev)}
        >
          {showComments
            ? "Hide comments"
            : `View all comments (${comments.length})`}
        </button>
      )}

      {/* Comments list */}
      {showComments && (
        <div className="mt-2 space-y-2 max-h-40 overflow-y-auto text-sm">
          {comments.map((c) => (
            <div key={c._id}>
              <span className="font-semibold">{c.postedBy.username}</span>{" "}
              {c.text}
            </div>
          ))}
        </div>
      )}

      {/* Add comment */}
      <form onSubmit={handleComment} className="mt-2 flex gap-2">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={!commentText.trim()}
          className="text-blue-500 font-semibold text-sm disabled:opacity-40"
        >
          Post
        </button>
      </form>
    </article>
  );
};

export default FeedPost;
