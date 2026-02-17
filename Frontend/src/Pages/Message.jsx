import { useState } from "react";
import { Edit, Phone, Video, Info, Image, Heart, Send } from "lucide-react";
import { conversations, currentUser } from "../data/mockData";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState("");

  const selected = conversations.find((c) => c.id === selectedConversation);

  return (
    <div className="ml-[60px] xl:ml-[160px] flex h-screen max-h-screen overflow-hidden relative bg-background">
      {/* Conversations List */}
      <div
        className={`w-full md:w-[397px] border-r border-divider flex flex-col ${
          selectedConversation ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-divider">
          <div className="flex items-center gap-1">
            <span className="font-bold text-lg">{currentUser.username}</span>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
          <Edit className="w-6 h-6 cursor-pointer action-icon" />
        </div>

        {/* Messages / Requests tabs */}
        <div className="flex px-6 py-3">
          <button className="font-bold text-sm">Messages</button>
          <button className="ml-auto text-sm text-muted-foreground">
            Requests
          </button>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`flex items-center gap-3 px-6 py-2 cursor-pointer hover:bg-accent transition-colors ${
                selectedConversation === conv.id ? "bg-accent" : ""
              }`}
            >
              <div className="relative">
                <img
                  src={conv.user.avatarUrl}
                  alt={conv.user.username}
                  className="w-14 h-14 rounded-full object-cover"
                />
                {conv.isActive && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className={`text-sm ${conv.unread ? "font-bold" : ""}`}>
                    {conv.user.fullName}
                  </span>
                  {conv.user.isVerified && (
                    <svg
                      className="w-3 h-3 text-primary"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z" />
                    </svg>
                  )}
                </div>
                <p
                  className={`text-sm truncate ${
                    conv.unread ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {conv.lastMessage} · {conv.time}
                </p>
              </div>
              {conv.unread && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div
        className={`flex-1 flex flex-col ${
          !selectedConversation ? "hidden md:flex" : "flex"
        } relative`}
      >
        {selected ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-divider">
              <div className="flex items-center gap-3">
                <button
                  className="md:hidden mr-2"
                  onClick={() => setSelectedConversation(null)}
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                  </svg>
                </button>
                <img
                  src={selected.user.avatarUrl}
                  alt={selected.user.username}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">
                      {selected.user.fullName}
                    </span>
                    {selected.user.isVerified && (
                      <svg
                        className="w-3 h-3 text-primary"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {selected.isActive
                      ? "Active now"
                      : `Active ${selected.time} ago`}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 cursor-pointer action-icon" />
                <Video className="w-6 h-6 cursor-pointer action-icon" />
                <Info className="w-6 h-6 cursor-pointer action-icon" />
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col items-center justify-center h-full text-center">
                <img
                  src={selected.user.avatarUrl}
                  alt={selected.user.username}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h3 className="font-bold text-lg">{selected.user.fullName}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {selected.user.username} · Instagram
                </p>
                <button className="px-4 py-1.5 bg-secondary rounded-lg text-sm font-semibold hover:bg-accent transition-colors">
                  View Profile
                </button>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-divider">
              <div className="flex items-center gap-3 bg-secondary rounded-full px-4 py-2">
                <button className="text-primary">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm"
                />
                {message ? (
                  <button className="text-primary font-semibold text-sm">
                    Send
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <Image className="w-6 h-6 cursor-pointer action-icon" />
                    <Heart className="w-6 h-6 cursor-pointer action-icon" />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-foreground flex items-center justify-center mb-4">
              <Send className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-semibold mb-1">Your messages</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Send a message to start a chat.
            </p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">
              Send message
            </button>
          </div>
        )}

        {/* Coming Soon Overlay */}
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center pointer-events-auto">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">Coming Soon</h1>
            <p className="text-lg">This feature will be available shortly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
