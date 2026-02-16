import Stories from "../components/Stories";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useSelector } from "react-redux";

const Feed = () => {
  const token = useSelector((state) => state.auth.token);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/post/feed", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data.posts);
      } catch (err) {
        console.error(err);
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
          <Post
            key={post._id}
            username={post.postedBy.username}
            userAvatar={post.postedBy.avatarUrl}
            postImage={post.image}
            likes={post.likes.length}
            caption={post.caption}
            timeAgo={"2h"}
          />
        ))
      )}
    </div>
  );
};

export default Feed;
