import { Link } from "react-router-dom";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 w-full bg-white border-t flex justify-around py-2">
      <Link to="/">🏠</Link>
      <Link to="/search">🔍</Link>
      <Link to="/create">➕</Link>
      <Link to="/reels">🎥</Link>
      <Link to="/profile">👤</Link>
    </div>
  );
};

export default BottomNav;
