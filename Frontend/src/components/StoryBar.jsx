// import { useSelector } from "react-redux";

// export default function StoryBar() {
//   const stories = useSelector((state) => state.posts.stories);

//   return (
//     <div className="flex gap-4 overflow-x-auto py-4 px-2 border-b border-gray-700">
//       {stories.map((story) => (
//         <div key={story._id} className="text-center">
//           <img
//             src={story.mediaURL}
//             className="w-16 h-16 rounded-full border-2 border-pink-500 object-cover"
//           />
//           <p className="text-xs mt-1">Story</p>
//         </div>
//       ))}
//     </div>
//   );
// }


// import { useSelector } from "react-redux";

// export default function StoryBar({ onOpen }) {
//   const stories = useSelector((state) => state.posts.stories);

//   if (stories.length === 0) return null;

//   return (
//     <div className="flex gap-4 overflow-x-auto py-3 mb-4">
//       {stories.map((group) => (
//         <div
//           key={group.user._id}
//           onClick={() => onOpen(group)}
//           className="text-center cursor-pointer"
//         >
//           <img
//             src={group.user.profilePic || "https://via.placeholder.com/64"}
//             className="w-16 h-16 rounded-full border-2 border-pink-500"
//           />
//           <p className="text-xs mt-1">{group.user.name}</p>
//         </div>
//       ))}
//     </div>
//   );
// }


import React from "react";
import { useSelector } from "react-redux";
export default function StoryBar({ onOpen }) {
  const stories = useSelector((state) => state.posts.stories);
console.log(stories)
  if (!stories || stories.length === 0) return null;

  return (
    <div className="flex gap-4 overflow-x-auto py-4 px-2 border-b border-gray-700">
      {stories.map(({ user, stories: userStories }) => (
        <div key={user._id} className="text-center cursor-pointer" onClick={() => onOpen(userStories)}>
          <img
            src={user.img || "https://via.placeholder.com/50"}
            alt={user.username}
            className="w-16 h-16 rounded-full border-2 border-pink-500 object-cover"
          />
          <p className="text-xs mt-1">{user.username}</p>
        </div>
      ))}
    </div>
  );
}
