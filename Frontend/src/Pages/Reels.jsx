import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Music,
  Volume2,
  VolumeX,
} from "lucide-react";
import { reels } from "../data/mockData";

const Reels = () => {
  const [muted, setMuted] = useState(true);
  const [likedReels, setLikedReels] = useState([]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const toggleLike = (reelId) => {
    setLikedReels((prev) =>
      prev.includes(reelId)
        ? prev.filter((id) => id !== reelId)
        : [...prev, reelId]
    );
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-[84px] xl:left-[262px] flex items-center justify-center bg-background overflow-hidden">
      {/* COMING SOON OVERLAY */}
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 text-white text-3xl font-bold">
        Coming Soon
      </div>

      <div className="relative h-full max-h-[900px] w-full max-w-[420px] snap-y snap-mandatory overflow-y-scroll scrollbar-hide hide-scrollbar">
        {reels.map((reel) => (
          <div
            key={reel.id}
            className="relative h-full w-full snap-start flex-shrink-0"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-secondary">
              <img
                src={reel.videoThumbnail}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
            </div>

            {/* Mute Button */}
            <button
              onClick={() => setMuted(!muted)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center"
            >
              {muted ? (
                <VolumeX className="w-4 h-4 text-foreground" />
              ) : (
                <Volume2 className="w-4 h-4 text-foreground" />
              )}
            </button>

            {/* Side Actions */}
            <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5">
              <button
                onClick={() => toggleLike(reel.id)}
                className="flex flex-col items-center gap-1"
              >
                <Heart
                  className={`w-7 h-7 ${
                    likedReels.includes(reel.id)
                      ? "fill-red-500 text-red-500"
                      : "text-foreground"
                  }`}
                />
                <span className="text-xs text-foreground">
                  {formatNumber(reel.likes)}
                </span>
              </button>

              <button className="flex flex-col items-center gap-1">
                <MessageCircle className="w-7 h-7 text-foreground" />
                <span className="text-xs text-foreground">
                  {formatNumber(reel.comments)}
                </span>
              </button>

              <button className="flex flex-col items-center gap-1">
                <Send className="w-7 h-7 text-foreground" />
                <span className="text-xs text-foreground">
                  {formatNumber(reel.shares)}
                </span>
              </button>

              <button>
                <Bookmark className="w-7 h-7 text-foreground" />
              </button>

              <button>
                <MoreHorizontal className="w-7 h-7 text-foreground" />
              </button>

              {/* Audio Icon */}
              <div className="w-8 h-8 rounded-lg border border-foreground overflow-hidden mt-2">
                <img
                  src={reel.userAvatar}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-4 left-3 right-16 text-foreground">
              <div className="flex items-center gap-2 mb-3">
                <img
                  src={reel.userAvatar}
                  alt={reel.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-semibold text-sm">{reel.username}</span>
                {reel.isVerified && (
                  <svg
                    className="w-3 h-3 text-primary"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z" />
                  </svg>
                )}
                <button className="ml-2 px-4 py-1 border border-foreground rounded-lg text-sm font-semibold">
                  Follow
                </button>
              </div>

              <p className="text-sm mb-2 line-clamp-2">{reel.caption}</p>

              <div className="flex items-center gap-2 text-sm">
                <Music className="w-3 h-3" />
                <span className="truncate">{reel.audio}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reels;