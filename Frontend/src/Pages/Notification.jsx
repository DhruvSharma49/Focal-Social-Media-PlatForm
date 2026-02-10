import { notifications } from "../data/mockData";

const Notifications = () => {
  return (
    <div className="max-w-[600px] mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-6">Notifications</h1>

      {/* This Week */}
      <div className="mb-6">
        <h2 className="font-semibold text-sm mb-4">This Week</h2>
        <div className="flex flex-col">
          {notifications.slice(0, 3).map((notification) => (
            <div
              key={notification.id}
              className="flex items-center gap-3 py-2 hover:bg-accent rounded-lg px-2 transition-colors cursor-pointer"
            >
              <img
                src={notification.user.avatarUrl}
                alt={notification.user.username}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-semibold">{notification.user.username}</span>{" "}
                  {notification.content}{" "}
                  <span className="text-muted-foreground">{notification.time}</span>
                </p>
              </div>
              {notification.postImage && (
                <img
                  src={notification.postImage}
                  alt=""
                  className="w-11 h-11 object-cover"
                />
              )}
              {notification.type === "follow" && (
                <button className="px-4 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">
                  Follow
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* This Month */}
      <div className="mb-6">
        <h2 className="font-semibold text-sm mb-4">This Month</h2>
        <div className="flex flex-col">
          {notifications.slice(3).map((notification) => (
            <div
              key={notification.id}
              className="flex items-center gap-3 py-2 hover:bg-accent rounded-lg px-2 transition-colors cursor-pointer"
            >
              <img
                src={notification.user.avatarUrl}
                alt={notification.user.username}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-semibold">{notification.user.username}</span>{" "}
                  {notification.content}{" "}
                  <span className="text-muted-foreground">{notification.time}</span>
                </p>
              </div>
              {notification.postImage && (
                <img
                  src={notification.postImage}
                  alt=""
                  className="w-11 h-11 object-cover"
                />
              )}
              {notification.type === "follow" && (
                <button className="px-4 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">
                  Follow
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div>
        <h2 className="font-semibold text-sm mb-4">Suggestions for you</h2>
        <div className="flex flex-col">
          {notifications.slice(0, 3).map((notification) => (
            <div
              key={`suggestion-${notification.id}`}
              className="flex items-center gap-3 py-2 hover:bg-accent rounded-lg px-2 transition-colors cursor-pointer"
            >
              <img
                src={notification.user.avatarUrl}
                alt={notification.user.username}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{notification.user.username}</p>
                <p className="text-xs text-muted-foreground">Suggested for you</p>
              </div>
              <button className="px-4 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
