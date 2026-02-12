// import { useState, useEffect } from "react";
// import {
//   Settings,
//   Grid3X3,
//   Bookmark,
//   UserSquare,
//   Heart,
//   MessageCircle,
// } from "lucide-react";
// import api from "../utils/api";
// import { useSelector } from "react-redux";
// import EditProfile from "./EditProfile";
// import { useParams } from "react-router-dom";

// const Profile = () => {
//   const [activeTab, setActiveTab] = useState("posts");
//   const [userData, setUserData] = useState(null);
//   const [userPosts, setUserPosts] = useState([]);
//   const [showEdit, setShowEdit] = useState(false);

//   const { user, token } = useSelector((state) => state.auth);

//   // useEffect(() => {
//   //   const fetchUserProfile = async () => {
//   //     try {
//   //       const res = await api.get(`/interact/user/${user._id}`, {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       });
//   //       setUserData(res.data.user);
//   //       setUserPosts(res.data.posts);
//   //     } catch (err) {
//   //       console.error("Failed to fetch profile", err.response?.data || err);
//   //     }
//   //   };
//   //   if (user?._id && token) fetchUserProfile();
//   // }, [user, token]);

//   const { id } = useParams();

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const userIdToFetch = id || user._id;
//         // agar /profile/:id open hai - dusra banda
//         // agar /profile open hai - khud ka profile

//         const res = await api.get(`/interact/user/${userIdToFetch}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setUserData(res.data.user);
//         setUserPosts(res.data.posts);
//       } catch (err) {
//         console.error("Profile fetch error:", err.response?.data || err);
//       }
//     };

//     if (token && user) fetchUserProfile();
//   }, [id, user, token]);

//   if (showEdit)
//     return (
//       <EditProfile userData={userData} onBack={() => setShowEdit(false)} />
//     );

//   if (!userData)
//     return <div className="text-center py-20">Loading profile...</div>;

//   const tabs = [
//     { id: "posts", icon: Grid3X3, label: "POSTS" },
//     { id: "saved", icon: Bookmark, label: "SAVED" },
//     { id: "tagged", icon: UserSquare, label: "TAGGED" },
//   ];

//   const getTabContent = () => {
//     switch (activeTab) {
//       case "posts":
//         return userPosts;
//       default:
//         return [];
//     }
//   };

//   const formatNumber = (num) => {
//     if (!num) return 0;
//     if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
//     if (num >= 1000) return (num / 1000).toFixed(1) + "K";
//     return num.toString();
//   };

//   return (
//     <div className="max-w-[935px] mx-auto px-4 py-8">
//       {/* Profile Header */}
//       <div className="flex flex-col md:flex-row gap-8 mb-10">
//         <div className="flex justify-center md:justify-start">
//           <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
//             <img
//               src={userData.avatarUrl}
//               alt={userData.username}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>

//         <div className="flex-1">
//           <div className="flex flex-col md:flex-row items-center gap-4 mb-5">
//             <h1 className="text-xl font-normal">{userData.username}</h1>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setShowEdit(true)}
//                 className="px-4 py-1.5 bg-secondary rounded-lg text-sm font-semibold hover:bg-accent"
//               >
//                 Edit profile
//               </button>

//               <button className="p-1.5 hover:bg-accent rounded-lg">
//                 <Settings className="w-6 h-6" />
//               </button>
//             </div>
//           </div>

//           <div className="flex justify-center md:justify-start gap-10 mb-5">
//             <div>
//               <span className="font-semibold">{userPosts.length}</span> posts
//             </div>
//             <div>
//               <span className="font-semibold">
//                 {formatNumber(userData.followersCount)}
//               </span>{" "}
//               followers
//             </div>
//             <div>
//               <span className="font-semibold">
//                 {formatNumber(userData.following.length)}
//               </span>{" "}
//               following
//             </div>
//           </div>

//           <div>
//             <h2 className="font-semibold">{userData.fullName}</h2>
//             <p className="text-sm whitespace-pre-line">{userData.bio}</p>
//             {userData.website && (
//               <a
//                 href={userData.website}
//                 className="text-sm text-primary font-semibold hover:underline"
//               >
//                 {userData.website}
//               </a>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="border-t border-divider">
//         <div className="flex justify-center gap-12">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-1 py-4 text-xs tracking-wider border-t ${
//                 activeTab === tab.id
//                   ? "border-foreground text-foreground"
//                   : "border-transparent text-muted-foreground"
//               }`}
//             >
//               <tab.icon className="w-3 h-3" />
//               <span>{tab.label}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Posts */}
//       <div className="grid grid-cols-3 gap-1">
//         {getTabContent().map((post) => (
//           <div key={post._id} className="relative aspect-square group">
//             <img src={post.pic} alt="" className="w-full h-full object-cover" />
//             <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-6">
//               <div className="flex items-center gap-2 text-white font-semibold">
//                 <Heart className="w-5 h-5 fill-white" />
//                 <span>{post.likes.length}</span>
//               </div>
//               <div className="flex items-center gap-2 text-white font-semibold">
//                 <MessageCircle className="w-5 h-5 fill-white" />
//                 <span>{post.comments.length}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {getTabContent().length === 0 && (
//         <div className="py-16 text-center text-muted-foreground">
//           No posts yet
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;



import { useState, useEffect } from "react";
import {
  Settings,
  Grid3X3,
  Bookmark,
  UserSquare,
  Heart,
  MessageCircle,
} from "lucide-react";
import api from "../utils/api";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userIdToFetch = id || user._id;

        const res = await api.get(`/interact/user/${userIdToFetch}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(res.data.user);
        setUserPosts(res.data.posts);
      } catch (err) {
        console.error("Profile fetch error:", err.response?.data || err);
      }
    };

    if (token && user) fetchUserProfile();
  }, [id, user, token]);

  if (showEdit)
    return (
      <EditProfile userData={userData} onBack={() => setShowEdit(false)} />
    );

  if (!userData)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 dark:text-gray-400">
        Loading profile...
      </div>
    );

  const tabs = [
    { id: "posts", icon: Grid3X3, label: "POSTS" },
    { id: "saved", icon: Bookmark, label: "SAVED" },
    { id: "tagged", icon: UserSquare, label: "TAGGED" },
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case "posts":
        return userPosts;
      default:
        return [];
    }
  };

  const formatNumber = (num) => {
    if (!num) return 0;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-10 text-black dark:text-white transition-colors duration-300">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row gap-10 mb-14">
        
        {/* Avatar */}
        <div className="flex justify-center md:justify-start">
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-full p-[3px] bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500">
            <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-zinc-900">
              <img
                src={userData.avatarUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt={userData.username}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1">
          {/* Username + Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <h1 className="text-2xl font-semibold tracking-wide">
              {userData.username}
            </h1>

            {!id && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowEdit(true)}
                  className="px-5 py-2 bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 rounded-xl text-sm font-medium transition"
                >
                  Edit Profile
                </button>

                <button
                  onClick={() => navigate("/settings")}
                  className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-800 transition"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex justify-center md:justify-start gap-8 md:gap-12 mb-6 text-sm md:text-base">
            <div>
              <span className="font-semibold text-lg">
                {formatNumber(userPosts.length)}
              </span>{" "}
              posts
            </div>
            <div>
              <span className="font-semibold text-lg">
                {formatNumber(userData.followersCount)}
              </span>{" "}
              followers
            </div>
            <div>
              <span className="font-semibold text-lg">
                {formatNumber(userData.following?.length)}
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

      {/* ================= TABS ================= */}
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

      
    {/* ================= TAB CONTENT ================= */}
{getTabContent().length > 0 ? (
  <div className="grid grid-cols-3 gap-2 mt-4">
    {getTabContent().map((post) => (
      <div
        key={post._id}
        className="relative aspect-square overflow-hidden group rounded-md"
      >
        <img
          src={post.pic}
          alt=""
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-8 transition">
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
) : (
  <div className="py-24 flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400">
    
    {activeTab === "posts" && (
      <>
        <Grid3X3 className="w-12 h-12 mb-4 opacity-40" />
        <h3 className="text-xl font-semibold mb-2">No Posts Yet</h3>
        <p className="text-sm">
          When you share photos, they will appear on your profile.
        </p>
      </>
    )}

    {activeTab === "saved" && (
      <>
        <Bookmark className="w-12 h-12 mb-4 opacity-40" />
        <h3 className="text-xl font-semibold mb-2">No Saved Posts</h3>
        <p className="text-sm">
          Save posts to view them later. Only you can see what you've saved.
        </p>
      </>
    )}

    {activeTab === "tagged" && (
      <>
        <UserSquare className="w-12 h-12 mb-4 opacity-40" />
        <h3 className="text-xl font-semibold mb-2">No Tagged Posts</h3>
        <p className="text-sm">
          When people tag you in posts, they'll appear here.
        </p>
      </>
    )}

  </div>
)}

    </div>
  );
};

export default Profile;
