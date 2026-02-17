import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../utils/api";
import Stories from "../components/Stories";
import FeedPost from "../components/FeedPost";

const Feed = () => {
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.user);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/post/feed", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data.posts);
      } catch (err) {
        console.error("Feed fetch error:", err);
      }
    };
    fetchPosts();
  }, [token]);

  return (
    <div className="flex flex-col gap-4 max-w-[470px] mx-auto">
      <Stories />
      {posts.length === 0 ? (
        <div className="text-center mt-10 text-gray-500">
          <p>No posts to show</p>
          <p>Follow people to see their posts</p>
        </div>
      ) : (
        posts.map((post) => (
          <FeedPost
            key={post._id}
            post={post}
            currentUser={currentUser}
            setPosts={setPosts}
          />
        ))
      )}
    </div>
  );
};

export default Feed;
