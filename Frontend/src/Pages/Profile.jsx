import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../utilities/api";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/interact/user/${id || "me"}`); // backend expects /interact/user/:id. If no id maybe current user, adjust backend if needed
        setUser(res.data.user);
        setPosts(res.data.posts || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Navbar />
      <div className="bg-white mt-6 p-6 rounded shadow">
        <div className="flex items-center gap-6">
          <img src="https://via.placeholder.com/120" alt="profile" className="w-24 h-24 rounded-full object-cover" />
          <div>
            <div className="text-xl font-semibold">{user?.name || "User"}</div>
            <div className="text-sm text-gray-500">{user?.email}</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {posts.length === 0 && <div className="text-gray-500">No posts</div>}
          {posts.map((p) => (
            <div key={p._id} className="h-48 bg-gray-200 overflow-hidden">
              {p.photos ? <img src={p.photos} alt={p.title} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full">No image</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
