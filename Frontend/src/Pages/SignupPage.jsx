// import api from "../utilities/api";
// import { useNavigate, Link } from "react-router-dom";
// import { useState } from "react";

// export default function Signup() {
//   const [form, setForm] = useState({});
//   const navigate = useNavigate();

//   const submit = async () => {
//     await api.post("/user/signup", form);
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black">
//       <div className="w-[350px] border border-gray-700 p-8 bg-black">
//         <h1 className="text-4xl text-center text-white mb-4 font-serif">
//           Instagram
//         </h1>

//         {["name", "email", "password"].map((f) => (
//           <input
//             key={f}
//             placeholder={f}
//             type={f === "password" ? "password" : "text"}
//             className="w-full mb-2 px-3 py-2 bg-[#121212] border border-gray-700 text-white text-sm"
//             onChange={(e) => setForm({ ...form, [f]: e.target.value })}
//           />
//         ))}

//         <button
//           onClick={submit}
//           className="w-full bg-blue-500 text-white py-2 text-sm font-semibold rounded"
//         >
//           Sign up
//         </button>

//         <p className="text-center text-gray-400 text-sm mt-4">
//           Have an account?
//           <Link to="/login" className="text-blue-500 ml-1">
//             Log in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


import api from "../utilities/api";
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
