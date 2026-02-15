// import Stories from "./Stories";
// import Post from "./Post";
// import { posts } from "../data/mockData";

// const Feed = () => {
//   return (
//     <div className="max-w-[470px] mx-auto">
//       <Stories />
//       <div className="flex flex-col gap-4 mt-2">
//         {posts.map((post) => (
//           <Post
//             key={post.id}
//             username={post.username}
//             userAvatar={post.userAvatar}
//             postImage={post.images[0]}
//             likes={post.likes}
//             caption={post.caption}
//             timeAgo={post.timeAgo}
//             isVerified={post.isVerified}
//             audioLabel={post.audioLabel}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Feed;
import Stories from "./Stories";
import Post from "./Post";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useSelector } from "react-redux";

const Feed = () => {
  const token = useSelector((state) => state.auth.token);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/post/randomposts", {
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
      {posts.map((post) => (
        <Post
          key={post._id}
          username={post.postedBy.username}
          userAvatar={post.postedBy.avatarUrl}
          postImage={post.image}
          likes={post.likes.length}
          caption={post.caption}
          timeAgo={"2h"} // temp
        />
      ))}
    </div>
  );
};

export default Feed;
