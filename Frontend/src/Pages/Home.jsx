import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utilities/api";
import { authHeader } from "../utilities/authHeader";
import {
  setHomePosts,
  setStories,
  setLoading,
  setError,
} from "../redux/slices/postSlice";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import StoryBar from "../components/StoryBar";
import StoryViewer from "../components/StoryViewer";

export default function Home() {
  const dispatch = useDispatch();
  const { homePosts, stories, loading } = useSelector((s) => s.posts);
  const { user } = useSelector((s) => s.auth); // logged-in user
  const [activeStory, setActiveStory] = useState(null);

  const dummyUser = { username: "eloears", img: "https://via.placeholder.com/40" };
  const dummySuggestions = [
    { username: "kenoere", followedBy: "Followed by heyach2002 +7 more" },
    { username: "lofti232", followedBy: "Followed by kenoere +12 more" },
  ];

  useEffect(() => {
    const fetchHomeData = async () => {
      dispatch(setLoading(true));
      try {
        /* 1️⃣ POSTS */
        const postRes = await api.get("/post/allPosts", {
          headers: authHeader(),
        });
        dispatch(setHomePosts(postRes.data.posts || []));

        /* 2️⃣ LOGGED-IN USER STORIES */
        if (user?._id) {
          const storyRes = await api.get(`/story/${user._id}`, {
            headers: authHeader(),
          });

          // Instagram-style grouping (single circle per user)
          const grouped = [
            {
              user,
              stories: storyRes.data.stories || [],
            },
          ];

          dispatch(setStories(grouped));
        }
      } catch (err) {
        dispatch(setError(err));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchHomeData();
  }, [dispatch, user]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Navbar />

      {/* STORIES BAR */}
      <StoryBar onOpen={setActiveStory} />

      {/* STORY VIEWER */}
      {activeStory && (
        <StoryViewer
          data={activeStory}
          onClose={() => setActiveStory(null)}
        />
      )}

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div>Loading...</div>
          ) : homePosts.length === 0 ? (
            <div className="bg-black p-6 rounded text-gray-400">
              No posts to show
            </div>
          ) : (
            homePosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))
          )}
        </div>

        <Sidebar user={dummyUser} suggestions={dummySuggestions} />
      </div>
    </div>
  );
}
