import { useState } from "react";
import api from "../utilities/api";

export default function PostCard({ post }) {
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      if (!liked) {
        await api.put(`/post/like/${post._id}`);
        setLikesCount((c) => c + 1);
      } else {
        await api.put(`/post/unlike/${post._id}`);
        setLikesCount((c) => Math.max(0, c - 1));
      }
      setLiked(!liked);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-black rounded shadow-sm overflow-hidden text-white">
      <div className="flex items-center gap-3 p-3 border-b">
        <img src="https://via.placeholder.com/40" alt="user" className="w-10 h-10 rounded-full object-cover" />
        <div className="font-medium">{post.postedBy?.name || "User"}</div>
      </div>

      <div className="w-full h-[420px] bg-black text-white">
        {post.photos ? (
          <img src={post.photos} alt={post.title} className="object-cover w-full h-full" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
        )}
      </div>

      <div className="p-3">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={handleLike} className="font-semibold">{liked ? "❤️" : "🤍"}</button>
          <div className="text-sm">{likesCount} likes</div>
        </div>
        <div className="text-sm"><span className="font-semibold mr-2">{post.postedBy?.name || "User"}</span>{post.body}</div>
      </div>
    </div>
  );
}
