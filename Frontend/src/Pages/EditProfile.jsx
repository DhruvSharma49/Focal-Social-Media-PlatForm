import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import api from "../utils/api";
import { useSelector } from "react-redux";

const EditProfile = ({ userData, onBack }) => {
  const { token } = useSelector((state) => state.auth);
  const [username, setUsername] = useState(userData.username);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      await api.put(
        "/interact/user/update-username",
        { username },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Username updated!");
      onBack();
      window.location.reload(); // profile refresh
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack}>
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-bold">Edit Profile</h1>
      </div>

      {/* Username Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-divider rounded-lg px-3 py-2 bg-secondary"
        />
        <p className="text-xs text-muted-foreground">
          Default username: <b>{userData.username}</b>
        </p>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-6 w-full bg-primary text-white py-2.5 rounded-lg font-semibold bg-blue-500"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default EditProfile;
