import React, { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

const Post = ({
  username,
  userAvatar,
  postImage,
  likes,
  caption,
  timeAgo,
  isVerified = false,
  audioLabel,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [showHeart, setShowHeart] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleDoubleTap = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
  };

  return (
    <article className="pb-4 border-b border-divider">
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="story-ring w-9 h-9">
            <div className="bg-background rounded-full p-0.5 w-full h-full">
              <img src={userAvatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt={username} className="w-7 h-7 rounded-full object-cover" />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm">{username}</span>
            {isVerified && (
              <svg className="w-3 h-3 verified-badge" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"/>
              </svg>
            )}
            <span className="text-muted-foreground text-sm">• {timeAgo}</span>
          </div>
        </div>
        <MoreHorizontal className="w-5 h-5 action-icon" />
      </div>

      {audioLabel && <div className="text-xs text-muted-foreground mb-2">{audioLabel}</div>}

      <div className="rounded-sm overflow-hidden bg-secondary relative cursor-pointer" onDoubleClick={handleDoubleTap}>
        <img src={postImage} alt="Post" className="w-full aspect-square object-cover" />
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart className="w-24 h-24 text-white fill-white animate-ping" />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-4">
          <Heart
            className={`w-6 h-6 cursor-pointer transition-colors ${isLiked ? "fill-red-500 text-red-500" : "action-icon"}`}
            onClick={handleLike}
          />
          <MessageCircle className="w-6 h-6 action-icon" />
          <Send className="w-6 h-6 action-icon" />
        </div>
        <Bookmark
          className={`w-6 h-6 cursor-pointer transition-colors ${isSaved ? "fill-foreground" : "action-icon"}`}
          onClick={() => setIsSaved(!isSaved)}
        />
      </div>

      <div className="font-semibold text-sm mb-1">{likeCount.toLocaleString()} likes</div>

      <div className="text-sm">
        <span className="font-semibold">{username}</span>{" "}
        <span className="text-foreground">{caption}</span>
      </div>

      <button className="text-muted-foreground text-sm mt-1">View all comments</button>

      <div className="mt-2">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
        />
      </div>
    </article>
  );
};

export default Post;
