import Stories from "./Stories";
import Post from "./Post";
import { posts } from "../data/mockData";

const Feed = () => {
  return (
    <div className="max-w-[470px] mx-auto">
      <Stories />
      <div className="flex flex-col gap-4 mt-2">
        {posts.map((post) => (
          <Post
            key={post.id}
            username={post.username}
            userAvatar={post.userAvatar}
            postImage={post.images[0]}
            likes={post.likes}
            caption={post.caption}
            timeAgo={post.timeAgo}
            isVerified={post.isVerified}
            audioLabel={post.audioLabel}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
