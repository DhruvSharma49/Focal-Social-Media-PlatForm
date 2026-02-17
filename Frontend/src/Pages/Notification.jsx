import { useDispatch, useSelector } from "react-redux";
import { removeNotification } from "../redux/slices/notificationSlice";
import api from "../utils/api";

const Notifications = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const notifications = useSelector((state) => state.notifications.list);

  const handleApprove = async (notificationId, userId) => {
    const res = await api.put(
      `/privacy/approve/${userId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (res.data.deletedNotificationId) {
      dispatch(removeNotification(res.data.deletedNotificationId));
    }
  };

  const handleReject = async (userId) => {
    await api.put(
      `/privacy/reject/${userId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );

    dispatch(removeNotification(userId));
  };

  return (
    <div className="max-w-[600px] mx-auto px-4 py-6">
      <h1 className="text-xl  mb-6">Notifications</h1>

      {notifications.map((notification) => (
        <div
          key={notification._id}
          className="flex items-center gap-3 py-2 hover:bg-accent rounded-lg px-2 transition-colors"
        >
          <img
            src={notification.user.avatarUrl}
            alt={notification.user.username}
            className="w-11 h-11 rounded-full object-cover"
          />

          <div className="flex-1">
            <p className="text-sm">
              <span className="font-semibold">
                {notification.user.username}
              </span>{" "}
              {notification.message}
            </p>
          </div>

          {notification.type === "followRequest" && (
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-green-500 text-white text-xs rounded"
                onClick={() =>
                  handleApprove(notification._id, notification.user._id)
                }
              >
                Confirm
              </button>

              <button
                onClick={() => handleReject(notification.user._id)}
                className="px-3 py-1 bg-red-500 text-white text-xs rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
