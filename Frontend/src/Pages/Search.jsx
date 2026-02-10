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

  // Redux se token
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(recent);
  }, []);

  const handleSearch = async (q) => {
    setQuery(q.trim());
    if (!q.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await api.get(
        `/interact/searchusers?query=${encodeURIComponent(q.trim())}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Token attach
          },
        },
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
    <div className="max-w-[600px] mx-auto px-4 py-6">
      {/* Search Input */}
      <div className="relative mb-6">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by username or name"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-secondary rounded-lg py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-muted-foreground"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Results */}
      {query ? (
        <div className="flex flex-col">
          {results.length > 0 ? (
            results.map((user) => (
              <div
                key={user._id}
                onClick={() => handleClickUser(user)}
                className="flex items-center gap-3 py-2 hover:bg-accent rounded-lg px-2 transition-colors cursor-pointer"
              >
                {user.avatarUrl && (
                  <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <span className="font-semibold text-sm">{user.username}</span>
                  <span className="text-sm text-muted-foreground ml-1">
                    {user.name}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No results found.
            </p>
          )}
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent</h2>
            {recentSearches.length > 0 && (
              <button
                onClick={clearAllRecent}
                className="text-primary text-sm font-semibold hover:text-foreground transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
          {recentSearches.length > 0 ? (
            <div className="flex flex-col">
              {recentSearches.map((user) => (
                <div
                  key={user._id}
                  onClick={() => handleClickUser(user)}
                  className="flex items-center gap-3 py-2 hover:bg-accent rounded-lg px-2 transition-colors cursor-pointer"
                >
                  {user.avatarUrl && (
                    <img
                      src={user.avatarUrl}
                      alt={user.username}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <span className="font-semibold text-sm">
                      {user.username}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeRecent(user._id);
                    }}
                    className="p-1 hover:bg-secondary rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No recent searches.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
