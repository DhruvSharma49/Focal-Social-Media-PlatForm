
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FollowModal = ({ type, userId, isPrivate ,onClose}) => {
  const [list, setList] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchList = async () => {
  //     if (isPrivate) {
  //       // Private user, hide list
  //       setList([]);
  //       return;
  //     }

  //     try {
  //       const url = `/interact/otherprofile/${userId}`;
  //       const res = await api.get(url, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       if (type === "followers") setList(res.data.user.followers);
  //       else setList(res.data.user.following);
  //     } catch (err) {
  //       console.error("Follow list fetch error:", err.response?.data || err);
  //     }
  //   };

  //   if (userId) fetchList();
  // }, [type, userId, token, isPrivate]);


  useEffect(() => {
  const fetchList = async () => {
    if (isPrivate) {
      setList([]); // Hide for private
      return;
    }
    try {
      const res = await api.get(`/interact/otherprofile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (type === "followers") setList(res.data.user.followers);
      else setList(res.data.user.following);
    } catch (err) {
      console.error(err);
    }
  };
  if (userId) fetchList();
}, [type, userId, token, isPrivate]);


  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-zinc-900 w-[400px] max-h-[80vh] overflow-y-auto rounded-lg p-4">
           <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold capitalize">{type}</h2>
          <button onClick={onClose} className="text-xl font-bold">&times;</button>         </div>

        {list.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            {isPrivate ? "Private account" : `No ${type} yet`}
          </p>
        ) : (
          <ul>
            {list.map((u) => (
              <li
                key={u._id}
                className="flex items-center gap-3 p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-800 cursor-pointer"
                onClick={() => navigate(`/otherprofile/${u._id}`)}
              >
                <img
                  src={u.avatarUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt={u.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium">{u.username}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FollowModal;
