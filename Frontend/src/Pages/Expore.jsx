import { Search, Play } from "lucide-react";
import { useState } from "react";
import { exploreImages } from "../data/mockData";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-[935px] mx-auto px-4 py-4">
      {/* Search Bar */}
      <div className="relative mb-4 lg:hidden">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-secondary rounded-lg py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-muted-foreground"
        />
      </div>

      {/* Explore Grid */}
      <div className="grid grid-cols-3 gap-1">
        {exploreImages.map((item, index) => {
          // Create varied sizes for visual interest
          const isLarge = index % 5 === 0;
          
          return (
            <div
              key={item.id}
              className={`relative aspect-square cursor-pointer group ${
                isLarge ? "row-span-2 col-span-2" : ""
              }`}
            >
              <img
                src={item.imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
              
              {/* Video indicator */}
              {item.isVideo && (
                <div className="absolute top-2 right-2">
                  <Play className="w-5 h-5 text-foreground fill-foreground" />
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <svg className="w-5 h-5 fill-foreground" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span>2.5k</span>
                </div>
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <svg className="w-5 h-5 fill-foreground" viewBox="0 0 24 24">
                    <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/>
                  </svg>
                  <span>123</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Explore;
