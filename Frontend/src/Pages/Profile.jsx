// import { useState, useEffect } from "react";
// import { Settings, Grid3X3, Bookmark, UserSquare } from "lucide-react";
// import api from "../utils/api";
// import { useSelector } from "react-redux";
// import EditProfile from "./EditProfile";
// import { useParams, useNavigate } from "react-router-dom";
// import ProfilePostGrid from "../components/ProfiletPostGrid";

// const Profile = () => {
//   const [activeTab, setActiveTab] = useState("posts");
//   const [userData, setUserData] = useState(null);
//   const [userPosts, setUserPosts] = useState([]);
//   const [showEdit, setShowEdit] = useState(false);
//   const [followStatus, setFollowStatus] = useState("none"); // none | requested | following

//   const { user, token } = useSelector((state) => state.auth);
//   const { id } = useParams();
//   const navigate = useNavigate();

// useEffect(() => {
//   const fetchUserProfile = async () => {
//     try {
//       let res;

//       if (id) {
//         // Visiting someone else's profile
//         res = await api.get(`/interact/otherprofile/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       } else {
//         // Visiting my own profile
//         res = await api.get(`/interact/myprofile`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       }

//       setUserData(res.data.user);
//       setUserPosts(res.data.posts);
//     } catch (err) {
//       console.error("Profile fetch error:", err.response?.data || err);
//     }
//   };

//   if (token && user) fetchUserProfile();
// }, [id, user, token]);


// useEffect(() => {
//   if (!userData || !user) return;

//   const isFollowing = userData.followers?.some(
//     (f) => f._id?.toString() === user._id.toString()
//   );

//   const isRequested = userData.followRequests?.some(
//     (r) => r.toString() === user._id.toString()
//   );

//   if (isFollowing) {
//     setFollowStatus("following");
//   } else if (isRequested) {
//     setFollowStatus("requested");
//   } else {
//     setFollowStatus("none");
//   }
// }, [userData, user]);


// // const handleFollow = async () => {
// //   try {
// //     const res = await api.put(
// //       "/interact/follow",
// //       { followId: userData._id },
// //       { headers: { Authorization: `Bearer ${token}` } }
// //     );

// //     if (res.data.status === "requested") {
// //       setFollowStatus("requested");
// //     } else if (res.data.status === "following") {
// //       setFollowStatus("following");
// //     } else {
// //       setFollowStatus("none");
// //     }
// //   } catch (err) {
// //     console.error(err);
// //   }
// // };


// const handleFollow = async () => {
//   try {
//     if (followStatus === "following") {
//       // UNFOLLOW
//       await api.put(
//         "/interact/unfollow",
//         { unfollowId: userData._id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setFollowStatus("none");
// setUserData((prev) => ({
//   ...prev,
//   followers: prev.followers.filter(
//     (f) => f._id.toString() !== user._id.toString()
//   ),
//   followersCount: prev.followersCount - 1,
// }));

//     } else {
//       // FOLLOW
//       const res = await api.put(
//         "/interact/follow",
//         { followId: userData._id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data.status === "requested") {
//         setFollowStatus("requested");
//       } else if (res.data.status === "following") {
//         setFollowStatus("following");
//         setUserData((prev) => ({
//           ...prev,
//           followers: [...prev.followers, { _id: user._id }],
//         }));
//       }
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };


//   if (showEdit)
//     return (
//       <EditProfile userData={userData} onBack={() => setShowEdit(false)} />
//     );

//   if (!userData)
//     return (
//       <div className="flex justify-center items-center h-[60vh] text-gray-500">
//         Loading profile...
//       </div>
//     );

//   const tabs = [
//     { id: "posts", icon: Grid3X3, label: "POSTS" },
//     { id: "saved", icon: Bookmark, label: "SAVED" },
//     { id: "tagged", icon: UserSquare, label: "TAGGED" },
//   ];

//   const formatNumber = (num) => {
//     if (!num) return 0;
//     if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
//     if (num >= 1000) return (num / 1000).toFixed(1) + "K";
//     return num.toString();
//   };

//   return (
//     <div className="max-w-[1000px] mx-auto px-4 py-10 text-black dark:text-white">
//       {/* ================= HEADER ================= */}
//       <div className="flex flex-col md:flex-row gap-10 mb-14">
//         {/* Avatar */}
//         <div className="flex justify-center md:justify-start">
//           <div className="w-36 h-36 md:w-44 md:h-44 rounded-full p-[3px] bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500">
//             <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-zinc-900">
//               <img
//                 src={
//                   userData.avatarUrl ||
//                   "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                 }
//                 alt={userData.username}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Info Section */}
//         <div className="flex-1">
//           {/* Username & Buttons */}
//           <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
//             <h1 className="text-2xl font-semibold tracking-wide">
//               {userData.username}
//             </h1>

//   {user && user._id !== userData._id && (

//   <button
//     onClick={handleFollow}
// className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
//   followStatus === "following"
//     ? "bg-red-500 text-white"
//     : followStatus === "requested"
//     ? "bg-yellow-400"
//     : "bg-blue-500 text-white"
// }`}

//   >
// {followStatus === "following"
//   ? "Unfollow"
//   : followStatus === "requested"
//   ? "Requested"
//   : "Follow"}

//   </button>
// )}

//           </div>

//           {/* Stats */}
//           <div className="flex justify-center md:justify-start gap-8 md:gap-12 mb-6 text-sm md:text-base">
//             <div>
//               <span className="font-semibold text-lg">
//                 {formatNumber(userPosts.length)}
//               </span>{" "}
//               posts
//             </div>
//             <div>
//               <span className="font-semibold text-lg">
//                 {formatNumber(userData.followersCount)}
//               </span>{" "}
//               followers
//             </div>
//             <div>
//               <span className="font-semibold text-lg">
//               {formatNumber(userData.followingCount)}

//               </span>{" "}
//               following
//             </div>
//           </div>

//           {/* Bio */}
//           <div className="max-w-md space-y-1">
//             <h2 className="font-semibold">{userData.fullName}</h2>
//             <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
//               {userData.bio}
//             </p>
//             {userData.website && (
//               <a
//                 href={userData.website}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-sm text-blue-500 font-medium hover:underline"
//               >
//                 {userData.website}
//               </a>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ================= TABS ================= */}
//       <div className="border-t border-gray-300 dark:border-zinc-800">
//         <div className="flex justify-center gap-12">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 py-4 text-xs tracking-widest border-t-2 transition ${
//                 activeTab === tab.id
//                   ? "border-black dark:border-white font-semibold"
//                   : "border-transparent text-gray-500 dark:text-gray-400"
//               }`}
//             >
//               <tab.icon className="w-4 h-4" />
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ================= POSTS GRID ================= */}
//       {activeTab === "posts" &&
//         (userPosts.length > 0 ? (
//           <ProfilePostGrid
//             posts={userPosts}
//             currentUser={user}
//             setUserPosts={setUserPosts}
//           />
//         ) : (
//           <div className="py-24 flex flex-col items-center justify-center text-gray-500">
//             <Grid3X3 className="w-12 h-12 mb-4 opacity-40" />
//             <h3 className="text-xl font-semibold mb-2">No Posts Yet</h3>
//             <p className="text-sm">
//               When you share photos, they will appear on your profile.
//             </p>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default Profile;





import { useState, useEffect } from "react";
import { Grid3X3, Bookmark, UserSquare } from "lucide-react";
import api from "../utils/api";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { useNavigate } from "react-router-dom";
import ProfilePostGrid from "../components/ProfiletPostGrid";

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [followStatus, setFollowStatus] = useState("none");

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
      // Reset state before fetch
      setUserData(null);
      setUserPosts([]);
    
      fetchMyProfile();
    }
  }, [token, user]);



  if (showEdit)
    return <EditProfile userData={userData} onBack={() => setShowEdit(false)} />;

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

// ✅ Ye 2 lines ADD karo
const followersCount = userData.followersCount ?? userData.followers?.length ?? 0;
const followingCount = userData.followingCount ?? userData.following?.length ?? 0;



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
              <span className="font-semibold text-lg">{formatNumber(userPosts.length)}</span>{" "}
              posts
            </div>
            <div>
              <span className="font-semibold text-lg">{formatNumber(followersCount)}</span>{" "}
              followers
            </div>
            <div>
              <span className="font-semibold text-lg">{formatNumber(followingCount)}</span>{" "}
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
    </div>
  );
};

export default MyProfile;
