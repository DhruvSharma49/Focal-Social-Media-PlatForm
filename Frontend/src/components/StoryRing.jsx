const sizeClasses = {
  sm: {
    ring: "w-10 h-10",
    image: "w-9 h-9",
    inner: "p-0.5",
  },
  md: {
    ring: "w-16 h-16",
    image: "w-14 h-14",
    inner: "p-[3px]",
  },
  lg: {
    ring: "w-[66px] h-[66px]",
    image: "w-[58px] h-[58px]",
    inner: "p-[3px]",
  },
};

const StoryRing = ({ imageUrl, username, seen = false, size = "lg" }) => {
  const sizes = sizeClasses[size] || sizeClasses.lg; // fallback safety

  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer">
      <div className={`${seen ? "story-ring-seen" : "story-ring"} ${sizes.ring}`}>
        <div className={`bg-background rounded-full ${sizes.inner} w-full h-full`}>
          <img
            src={imageUrl}
            alt={username}
            className={`${sizes.image} rounded-full object-cover`}
          />
        </div>
      </div>

      <span className="text-xs text-foreground max-w-[66px] truncate">
        {username}
      </span>
    </div>
  );
};

export default StoryRing;
