import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import ProfilePostModal from "./ProfilePostModal";

const ProfilePostGrid = ({ posts, currentUser, setUserPosts }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {posts.map((post) => (
          <div
            key={post._id}
            onClick={() => setSelectedPost(post)}
            className="relative aspect-square overflow-hidden group rounded-md cursor-pointer"
          >
            <img
              src={post.image}
              alt=""
              className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-8 transition">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Heart className="w-5 h-5 fill-white" />
                {post.likes.length}
              </div>
              <div className="flex items-center gap-2 text-white font-semibold">
                <MessageCircle className="w-5 h-5 fill-white" />
                {post.comments.length}
              </div>
            </div>
          </div>
        ))}
      </div>

 {selectedPost && (
  <ProfilePostModal
    post={posts.find(p => p._id === selectedPost._id)}

          onClose={() => setSelectedPost(null)}
          currentUser={currentUser}
          setUserPosts={setUserPosts}
        />
      )}
    </>
  );
};

export default ProfilePostGrid;





