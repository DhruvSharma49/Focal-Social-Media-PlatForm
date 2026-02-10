import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    await api.post("/user/signup", data);
    navigate("/login");
  };

  return (
    <div className="w-[350px] text-white">
      <div className=" px-10 py-8">
        <h1 className="text-4xl text-center font-serif mb-4">Instagram</h1>

        <p className="text-center text-gray-500 text-sm font-semibold mb-4 " >
          Sign up to see photos and videos from your friends.
        </p>

        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Full Name"
          className="w-full mb-1 px-3 py-2 text-sm bg-gray-800  border border-gray-600"
        />
        {errors.name && (
          <p className="text-xs text-red-500 mb-2">{errors.name.message}</p>
        )}

        <input
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          className="w-full mb-1 px-3 py-2 text-sm  bg-gray-800  border border-gray-600"
        />
        {errors.email && (
          <p className="text-xs text-red-500 mb-2">{errors.email.message}</p>
        )}

        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeholder="Password"
          className="w-full mb-1 px-3 py-2 text-sm  bg-gray-800  border border-gray-600"
        />
        {errors.password && (
          <p className="text-xs text-red-500 mb-3">
            {errors.password.message}
          </p>
        )}

        <button
          onClick={handleSubmit(submit)}
          className="w-full bg-[#4cb5f9] text-black py-1.5 rounded text-sm font-semibold"
        >
          Sign up
        </button>
      </div>

      <div className=" mt-3 py-4 text-center text-sm">
        Have an account?
        <Link to="/login" className="text-[#0095f6] font-semibold ml-1">
          Log in
        </Link>
      </div>
    </div>
  );
}
