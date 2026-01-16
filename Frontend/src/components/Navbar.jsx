import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Link } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between p-4 bg-black rounded-md shadow-sm text-white">
      <Link to="/home" className="text-xl font-bold">Instagram</Link>

      <div className="flex items-center gap-3">
        <Link to="/stories" className="text-sm">Stories</Link>
        <Link to="/profile" className="text-sm">Profile</Link>
        <button
          onClick={() => dispatch(logout())}
          className="px-3 py-1 text-sm bg-red-200 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
