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
import { useParams } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userIdToFetch = id || user._id;

        const res = await api.get(`/interact/user/${userIdToFetch}`);
        // 🔥 No headers needed. Cookie auto sent.

        setUserData(res.data.user);
        setUserPosts(res.data.posts);
      } catch (err) {
        console.error("Profile fetch error:", err.response?.data || err);
      }
    };

    if (user) fetchUserProfile();
  }, [id, user]);

  if (showEdit)
    return (
      <EditProfile userData={userData} onBack={() => setShowEdit(false)} />
    );

  if (!userData)
    return <div className="text-center py-20">Loading profile...</div>;

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
    <div className="max-w-[935px] mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="flex justify-center md:justify-start">
          <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
            <img
              src={userData.avatarUrl}
              alt={userData.username}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-5">
            <h1 className="text-xl font-normal">{userData.username}</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowEdit(true)}
                className="px-4 py-1.5 bg-secondary rounded-lg text-sm font-semibold hover:bg-accent"
              >
                Edit profile
              </button>

              <button className="p-1.5 hover:bg-accent rounded-lg">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex justify-center md:justify-start gap-10 mb-5">
            <div>
              <span className="font-semibold">{userPosts.length}</span> posts
            </div>
            <div>
              <span className="font-semibold">
                {formatNumber(userData.followersCount)}
              </span>{" "}
              followers
            </div>
            <div>
              <span className="font-semibold">
                {formatNumber(userData.following.length)}
              </span>{" "}
              following
            </div>
          </div>

          <div>
            <h2 className="font-semibold">{userData.fullName}</h2>
            <p className="text-sm whitespace-pre-line">{userData.bio}</p>
            {userData.website && (
              <a
                href={userData.website}
                className="text-sm text-primary font-semibold hover:underline"
              >
                {userData.website}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-divider">
        <div className="flex justify-center gap-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 py-4 text-xs tracking-wider border-t ${
                activeTab === tab.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              <tab.icon className="w-3 h-3" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1">
        {getTabContent().map((post) => (
          <div key={post._id} className="relative aspect-square group">
            <img src={post.pic} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Heart className="w-5 h-5 fill-white" />
                <span>{post.likes.length}</span>
              </div>
              <div className="flex items-center gap-2 text-white font-semibold">
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>{post.comments.length}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {getTabContent().length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          No posts yet
        </div>
      )}
    </div>
  );
};

export default Profile;

