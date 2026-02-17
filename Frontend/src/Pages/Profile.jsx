import { useState, useEffect } from "react";
import { Grid3X3, Bookmark, UserSquare } from "lucide-react";
import api from "../utils/api";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import ProfilePostGrid from "../components/UserPostGrid";
import FollowModal from "../components/FollowFollwersModel";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [followType, setFollowType] = useState("");

  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const fetchMyProfile = async () => {
    try {
      const res = await api.get(`/interact/myprofile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(res.data.user);
      setUserPosts(res.data.posts);
    } catch (err) {
      console.error("Profile fetch error:", err.response?.data || err);
    }
  };

  useEffect(() => {
    if (token && user) {
      setUserData(null);
      setUserPosts([]);
      fetchMyProfile();
    }
  }, [token, user]);

  if (showEdit)
    return (
      <EditProfile userData={userData} onBack={() => setShowEdit(false)} />
    );

  if (!userData)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        Loading profile...
      </div>
    );

  const tabs = [
    { id: "posts", icon: Grid3X3, label: "POSTS" },
    { id: "saved", icon: Bookmark, label: "SAVED" },
    { id: "tagged", icon: UserSquare, label: "TAGGED" },
  ];

  const formatNumber = (num) => {
    if (!num) return 0;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const followersCount =
    userData.followersCount ?? userData.followers?.length ?? 0;
  const followingCount =
    userData.followingCount ?? userData.following?.length ?? 0;

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-10 text-black dark:text-white">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row gap-10 mb-14">
        <div className="flex justify-center md:justify-start">
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-full p-[3px] bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500">
            <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-zinc-900">
              <img
                src={
                  userData.avatarUrl ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt={userData.username}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <h1 className="text-2xl font-semibold tracking-wide">
              {userData.username}
            </h1>
            <button
              onClick={() => setShowEdit(true)}
              className="px-5 py-2 rounded-xl text-sm font-medium bg-blue-500 text-white"
            >
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="flex justify-center md:justify-start gap-8 md:gap-12 mb-6 text-sm md:text-base">
            <div>
              <span className="font-semibold text-lg">
                {formatNumber(userPosts.length)}
              </span>{" "}
              posts
            </div>

            {/* Followers clickable */}
            <div
              className="cursor-pointer"
              onClick={() => {
                setFollowType("followers");
                setShowFollowModal(true);
              }}
            >
              <span className="font-semibold text-lg">
                {formatNumber(followersCount)}
              </span>{" "}
              followers
            </div>

            {/* Following clickable */}
            <div
              className="cursor-pointer"
              onClick={() => {
                setFollowType("following");
                setShowFollowModal(true);
              }}
            >
              <span className="font-semibold text-lg">
                {formatNumber(followingCount)}
              </span>{" "}
              following
            </div>
          </div>

          {/* Bio */}
          <div className="max-w-md space-y-1">
            <h2 className="font-semibold">{userData.fullName}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
              {userData.bio}
            </p>
            {userData.website && (
              <a
                href={userData.website}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-500 font-medium hover:underline"
              >
                {userData.website}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="border-t border-gray-300 dark:border-zinc-800">
        <div className="flex justify-center gap-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 text-xs tracking-widest border-t-2 transition ${
                activeTab === tab.id
                  ? "border-black dark:border-white font-semibold"
                  : "border-transparent text-gray-500 dark:text-gray-400"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* POSTS GRID */}
      {activeTab === "posts" &&
        (userPosts.length > 0 ? (
          <ProfilePostGrid
            posts={userPosts}
            currentUser={user}
            setUserPosts={setUserPosts}
          />
        ) : (
          <div className="py-24 flex flex-col items-center justify-center text-gray-500">
            <Grid3X3 className="w-12 h-12 mb-4 opacity-40" />
            <h3 className="text-xl font-semibold mb-2">No Posts Yet</h3>
            <p className="text-sm">
              When you share photos, they will appear on your profile.
            </p>
          </div>
        ))}

      {/* FOLLOW MODAL */}
      {showFollowModal && (
        <FollowModal
          type={followType}
          userId={userData._id}
          token={token}
          onClose={() => setShowFollowModal(false)}
        />
      )}
    </div>
  );
};

export default MyProfile;
