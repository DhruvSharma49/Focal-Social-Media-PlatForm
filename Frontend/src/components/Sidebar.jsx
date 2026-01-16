export default function Sidebar({ user, suggestions }) {
  return (
    <aside className="hidden lg:block w-80">
      <div className="bg-black p-4 rounded shadow mb-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
          <img
            src={user.img || "https://via.placeholder.com/40"}
            alt="user"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-semibold">{user.username}</div>
            <div className="text-sm text-gray-500">Switch</div>
          </div>
        </div>
      </div>

      <div className="bg-black p-4 rounded shadow text-white">
        <div className="flex justify-between mb-3 text-gray-500 text-sm">Suggestions For You <span className="font-normal cursor-pointer">See All</span></div>
        {suggestions.map((s, idx) => (
          <div key={idx} className="flex justify-between items-center mb-3">
            <div>
              <div className="text-sm font-semibold">{s.username}</div>
              <div className="text-xs text-gray-400">{s.followedBy}</div>
            </div>
            <button className="text-blue-500 text-sm">Follow</button>
          </div>
        ))}
      </div>
    </aside>
  );
}
