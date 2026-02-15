import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../utils/api";
import ProfilePostModal from "../components/ProfilePostModal";
import { exploreImages } from "../data/mockData"; // Default mock data

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let backendPosts = [];

        if (token) {
          const res = await api.get("/post/randomposts", {
            headers: { Authorization: `Bearer ${token}` },
          });
          backendPosts = res.data.posts || [];
        }

        // Merge backend posts + mock data
        const combinedPosts = [...backendPosts, ...exploreImages];

        setPosts(combinedPosts);
      } catch (err) {
        console.error("Error fetching backend posts:", err);
        // Agar backend fail ho jaye to sirf mock data
        setPosts(exploreImages);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh] text-gray-500">
        Loading posts...
      </div>
    );

  return (
    <div className="max-w-[935px] mx-auto px-4 py-4">
      {/* Grid */}
      <div className="grid grid-cols-4 gap-2">
        {posts.map((post) => (
          <div
            key={post._id || post.id}
            className="relative aspect-square cursor-pointer group rounded-md overflow-hidden"
            onClick={() => setSelectedPost(post)}
          >
            <img
              src={post.image || post.imageUrl}
              alt={post.caption || "Post"}
              className="w-full h-full object-cover"
            />

            {post.isVideo && (
              <div className="absolute top-1 right-1">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
            )}

            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-md">
              <div className="flex items-center gap-1 text-white font-semibold text-xs">
                ❤️ {post.likes?.length || 0}
              </div>
              <div className="flex items-center gap-1 text-white font-semibold text-xs">
                💬 {post.comments?.length || 0}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPost && (
        <ProfilePostModal
          post={posts.find(
            (p) => (p._id || p.id) === (selectedPost._id || selectedPost.id)
          )}
          onClose={() => setSelectedPost(null)}
          currentUser={user}
          setUserPosts={setPosts}
        />
      )}
    </div>
  );
};

export default Explore;
