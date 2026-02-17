import { useEffect, useState, useMemo } from "react";
import StoryRing from "./StoryRing";
import StoryViewer from "./StoryViewers";
import { useSelector } from "react-redux";
import api from "../utils/api";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [selectedUserStories, setSelectedUserStories] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.user);

  // Fetch stories
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await api.get("/createstory/story", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStories(res.data.stories);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) fetchStories();
  }, [token]);

  // Upload story
  const handleAddStory = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("storyPic", file);

    try {
      const res = await api.post("/createstory/story", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setStories((prev) => [res.data.story, ...prev]);

      e.target.value = null; // ✅ IMPORTANT FIX
    } catch (err) {
      console.error("Story upload failed:", err);
    }
  };

  //  Step 1: Filter private accounts safely
  const visibleStories = stories.filter((story) => {
    if (!story.userId) return false;

    // Apni story hamesha show ho
    if (story.userId._id === currentUser?._id) return true;

    // Public account
    if (story.userId.accountType === "public") return true;

    // Private account → only follower
    return story.userId.followers?.includes(currentUser?._id);
  });

  //  Step 2: Group by user (Ek user = ek circle)
  const groupedStories = useMemo(() => {
    const map = {};

    visibleStories.forEach((story) => {
      const uid = story.userId._id;

      if (!map[uid]) {
        map[uid] = {
          user: story.userId,
          stories: [],
        };
      }

      map[uid].stories.push(story);
    });

    return Object.values(map);
  }, [visibleStories]);

  console.log(stories);

  return (
    <>
      <div className="flex gap-4 overflow-x-auto py-4 px-2">
        {/* Add Story */}
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <label htmlFor="addStoryInput">
            <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-dashed border-gray-400">
              <span className="text-3xl text-gray-400">+</span>
            </div>
          </label>

          <input
            id="addStoryInput"
            type="file"
            accept="image/*"
            onChange={handleAddStory}
            className="hidden"
          />

          <span className="text-xs truncate max-w-[64px]">Your Story</span>
        </div>

        {/* Story Circles */}
        {groupedStories.map((group) => (
          <div
            key={group.user._id}
            onClick={() => setSelectedUserStories(group)}
          >
            <StoryRing
              username={group.user.username}
              imageUrl={
                group.user.avatarUrl ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              seen={false}
            />
          </div>
        ))}
      </div>

      {/* Viewer */}
      {selectedUserStories && (
        <StoryViewer
          isOpen={!!selectedUserStories}
          onClose={() => setSelectedUserStories(null)}
          stories={selectedUserStories.stories}
        />
      )}
    </>
  );
};

export default Stories;
