import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../utils/api";

const PrivacySettings = ({ onBack }) => {
  const { user, token } = useSelector(state => state.auth);
  const [accountType, setAccountType] = useState("public");
  const [showFollowers, setShowFollowers] = useState(true);

  useEffect(() => {
    const fetchPrivacy = async () => {
      const res = await api.get(`/interact/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAccountType(res.data.user.accountType);
      setShowFollowers(res.data.user.showFollowers);
    };
    if (user?._id) fetchPrivacy();
  }, [user, token]);

  const updateSetting = async (data) => {
    const res = await api.put(
      `/interact/user/privacy/${user._id}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setAccountType(res.data.user.accountType);
    setShowFollowers(res.data.user.showFollowers);
  };



  return (
    <div className="max-w-[600px] mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={onBack}>
        <ChevronLeft className="w-6 h-6" />
        <h1 className="text-xl font-bold">Account Privacy</h1>
      </div>

      {/* Public / Private */}
      <div className="bg-secondary rounded-lg p-4 flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold">Private Account</h2>
          <p className="text-sm text-muted-foreground">Only approved users can see content.</p>
        </div>
       {/* Private Account */}
<button
  onClick={() =>
    updateSetting({
      accountType: accountType === "public" ? "private" : "public"
    })
  }
  className={`w-10 h-6 rounded-full ${
    accountType === "private" ? "bg-green-500" : "bg-red-500"
  }`}
>
  <div className={`w-4 h-4 bg-white rounded-full ${
    accountType === "private" ? "translate-x-5" : "translate-x-1"
  }`} />
</button>

      </div>

      {/* Followers visibility */}
      <div className="bg-secondary rounded-lg p-4 flex justify-between items-center">
        <div>
          <h2 className="font-semibold">Show followers to others</h2>
        </div>
       {/* Show Followers */}
<button
  onClick={() =>
    updateSetting({ showFollowers: !showFollowers })
  }
  className={`w-10 h-6 rounded-full ${
    showFollowers ? "bg-green-500" : "bg-red-500"
  }`}
>
  <div className={`w-4 h-4 bg-white rounded-full ${
    showFollowers ? "translate-x-5" : "translate-x-1"
  }`} />
</button>

      </div>
    </div>
  );
};

export default PrivacySettings;
