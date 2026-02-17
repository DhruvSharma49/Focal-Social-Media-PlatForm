import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { addNotification } from "../redux/slices/notificationSlice"; 
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { useForm } from "react-hook-form";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    try {
      //1. LOGIN
      const res = await api.post("/user/login", data);

      const { token, user } = res.data;

      dispatch(loginSuccess({ token, user }));

      //  2. FETCH NOTIFICATIONS AFTER LOGIN
      const notifRes = await api.get("/interact/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      notifRes.data.notifications.forEach((n) => {
        dispatch(
          addNotification({
            _id: n._id,
            type: n.type,
            message: "sent you a follow request",
            user: n.from,
          }),
        );
      });

      //  3. THEN NAVIGATE
      navigate("/profile");
    } catch (err) {
      console.error("Login failed", err.response?.data || err);
    }
  };

  return (
    <div className="w-[350px] text-white mx-auto mt-20">
      <form
        onSubmit={handleSubmit(submit)}
        className="px-12 py-8 bg-gray-900 rounded-lg"
      >
        <h1 className="text-4xl text-center font-serif mb-8">Focal</h1>

        <input
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          className="w-full mb-1 px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded"
        />
        {errors.email && (
          <p className="text-xs text-red-500 mb-2">{errors.email.message}</p>
        )}

        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="Password"
          className="w-full mb-1 px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded"
        />
        {errors.password && (
          <p className="text-xs text-red-500 mb-3">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-[#4cb5f9] text-black py-1.5 rounded text-sm font-semibold"
        >
          Log in
        </button>

        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-black" />
          <span className="px-4 text-xs text-gray-500 font-semibold">OR</span>
          <div className="flex-1 h-px bg-black" />
        </div>

        <p className="text-center text-sm text-[#385185] font-semibold">
          Log in with Facebook
        </p>
      </form>

      <div className="mt-3 py-4 text-center text-sm">
        Don&apos;t have an account?
        <Link to="/signup" className="text-[#0095f6] font-semibold ml-1">
          Sign up
        </Link>
      </div>
    </div>
  );
}
