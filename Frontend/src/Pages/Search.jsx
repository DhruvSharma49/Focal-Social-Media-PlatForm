// import { useState, useEffect } from "react";
// import { Search as SearchIcon, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import api from "../utils/api";

// const Search = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [recentSearches, setRecentSearches] = useState([]);
//   const navigate = useNavigate();

//   // Redux se token
//   const token = useSelector((state) => state.auth.token);

//   useEffect(() => {
//     const recent = JSON.parse(localStorage.getItem("recentSearches")) || [];
//     setRecentSearches(recent);
//   }, []);

//   const handleSearch = async (q) => {
//     setQuery(q.trim());
//     if (!q.trim()) {
//       setResults([]);
//       return;
//     }

//     try {
//       const res = await api.get(
//         `/interact/searchusers?query=${encodeURIComponent(q.trim())}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // ✅ Token attach
//           },
//         },
//       );
//       setResults(res.data.users);
//     } catch (err) {
//       console.error("Search API error:", err);
//     }
//   };

//   const handleClickUser = (user) => {
//     const updated = [user, ...recentSearches.filter((u) => u._id !== user._id)];
//     setRecentSearches(updated);
//     localStorage.setItem("recentSearches", JSON.stringify(updated));
//     navigate(`/profile/${user._id}`);
//     setQuery("");
//     setResults([]);
//   };

//   const removeRecent = (id) => {
//     const filtered = recentSearches.filter((u) => u._id !== id);
//     setRecentSearches(filtered);
//     localStorage.setItem("recentSearches", JSON.stringify(filtered));
//   };

//   const clearAllRecent = () => {
//     setRecentSearches([]);
//     localStorage.removeItem("recentSearches");
//   };

//   return (
//     <div className="max-w-[600px] mx-auto px-4 py-6">
//       {/* Search Input */}
//       <div className="relative mb-6">
//         <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//         <input
//           type="text"
//           placeholder="Search by username or name"
//           value={query}
//           onChange={(e) => handleSearch(e.target.value)}
//           className="w-full bg-secondary rounded-lg py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-muted-foreground"
//         />
//         {query && (
//           <button
//             onClick={() => {
//               setQuery("");
//               setResults([]);
//             }}
//             className="absolute right-4 top-1/2 -translate-y-1/2"
//           >
//             <X className="w-4 h-4 text-muted-foreground" />
//           </button>
//         )}
//       </div>

//       {/* Results */}
//       {query ? (
//         <div className="flex flex-col">
//           {results.length > 0 ? (
//             results.map((user) => (
//               <div
//                 key={user._id}
//                 onClick={() => handleClickUser(user)}
//                 className="flex items-center gap-3 py-2 hover:bg-accent rounded-lg px-2 transition-colors cursor-pointer"
//               >
//                 {user.avatarUrl && (
//                   <img
//                     src={user.avatarUrl}
//                     alt={user.username}
//                     className="w-11 h-11 rounded-full object-cover"
//                   />
//                 )}
//                 <div className="flex-1">
//                   <span className="font-semibold text-sm">{user.username}</span>
//                   <span className="text-sm text-muted-foreground ml-1">
//                     {user.name}
//                   </span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-muted-foreground py-8">
//               No results found.
//             </p>
//           )}
//         </div>
//       ) : (
//         <div>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="font-semibold">Recent</h2>
//             {recentSearches.length > 0 && (
//               <button
//                 onClick={clearAllRecent}
//                 className="text-primary text-sm font-semibold hover:text-foreground transition-colors"
//               >
//                 Clear all
//               </button>
//             )}
//           </div>
//           {recentSearches.length > 0 ? (
//             <div className="flex flex-col">
//               {recentSearches.map((user) => (
//                 <div
//                   key={user._id}
//                   onClick={() => handleClickUser(user)}
//                   className="flex items-center gap-3 py-2 hover:bg-accent rounded-lg px-2 transition-colors cursor-pointer"
//                 >
//                   {user.avatarUrl && (
//                     <img
//                       src={user.avatarUrl}
//                       alt={user.username}
//                       className="w-11 h-11 rounded-full object-cover"
//                     />
//                   )}
//                   <div className="flex-1">
//                     <span className="font-semibold text-sm">
//                       {user.username}
//                     </span>
//                     <span className="text-sm text-muted-foreground ml-1">
//                       {user.name}
//                     </span>
//                   </div>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       removeRecent(user._id);
//                     }}
//                     className="p-1 hover:bg-secondary rounded-full transition-colors"
//                   >
//                     <X className="w-4 h-4 text-muted-foreground" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-muted-foreground py-8">
//               No recent searches.
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Search;




import { useState, useEffect } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../utils/api";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(recent);
  }, []);

  const handleSearch = async (q) => {
    setQuery(q.trimStart());
    if (!q.trim()) return setResults([]);

    try {
      const res = await api.get(
        `/interact/searchusers?query=${encodeURIComponent(q.trim())}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResults(res.data.users);
    } catch (err) {
      console.error("Search API error:", err);
    }
  };

  const handleClickUser = (user) => {
    const updated = [user, ...recentSearches.filter((u) => u._id !== user._id)];
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    navigate(`/profile/${user._id}`);
    setQuery("");
    setResults([]);
  };

  const removeRecent = (id) => {
    const filtered = recentSearches.filter((u) => u._id !== id);
    setRecentSearches(filtered);
    localStorage.setItem("recentSearches", JSON.stringify(filtered));
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <div className="max-w-[640px] mx-auto px-4 py-6">
      
      {/* GLASS SEARCH BAR */}
      <div className="sticky top-4 z-20 mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-2xl py-3 pl-10 pr-10 text-sm
            bg-white/70 dark:bg-zinc-900/70
            backdrop-blur-lg
            border border-black/10 dark:border-white/10
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* RESULTS */}
      {query ? (
        <div className="space-y-2">
          {results.length > 0 ? (
            results.map((user) => (
              <div
                key={user._id}
                onClick={() => handleClickUser(user)}
                className="flex items-center gap-4 p-3 rounded-xl cursor-pointer
                bg-white/60 dark:bg-zinc-900/60
                hover:bg-black/5 dark:hover:bg-white/10
                backdrop-blur-md border border-transparent hover:border-black/10 dark:hover:border-white/10
                transition"
              >
                <img
                  src={user.avatarUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt={user.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">{user.username}</p>
                  <p className="text-xs text-gray-500">{user.name}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-10">No results found</p>
          )}
        </div>
      ) : (
        <div>
          {/* RECENT HEADER */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Recent Searches</h2>
            {recentSearches.length > 0 && (
              <button
                onClick={clearAllRecent}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {recentSearches.length > 0 ? (
            <div className="space-y-2">
              {recentSearches.map((user) => (
                <div
                  key={user._id}
                  onClick={() => handleClickUser(user)}
                  className="flex items-center gap-4 p-3 rounded-xl cursor-pointer
                  bg-white/60 dark:bg-zinc-900/60
                  hover:bg-black/5 dark:hover:bg-white/10
                  backdrop-blur-md border border-transparent hover:border-black/10 dark:hover:border-white/10
                  transition"
                >
                  <img
                    src={user.avatarUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png" }
                    alt={user.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{user.username}</p>
                    <p className="text-xs text-gray-500">{user.name}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeRecent(user._id);
                    }}
                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-10">
              No recent searches
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;

