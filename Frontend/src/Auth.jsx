import { useState } from "react";
import { signup, login } from "./utilities/api";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false); // false = Signup, true = Login
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await login({ email: form.email, password: form.password });
        localStorage.setItem("token", res.data.token);
        alert("Login Successful");
        navigate("/feed");
      } else {
        const res = await signup(form);
        alert(res.data.msg);
        setIsLogin(true); // Signup ke baad Login form dikha do
      }
    } catch (err) {
      alert(err.response?.data?.error || "Sorry,Please try agin later!!!!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-5 text-center">
          {isLogin ? "Login" : "Signup"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          type="submit"
          className={`w-full p-2 rounded text-white ${
            isLogin ? "bg-green-500" : "bg-blue-500"
          }`}
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <p className="mt-4 text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 cursor-pointer font-semibold"
          >
            {isLogin ? "Signup" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
}
