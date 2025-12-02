import { useState, useContext } from "react";
import { loginUser } from "../services/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { loginUser: saveUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });

  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState(""); 

  const showMessage = (text, type) => {
    setMsg(text);
    setMsgType(type);

    setTimeout(() => {
      setMsg("");
      setMsgType("");
    }, 2000);
  };

  const handleLogin = async () => {
    try {
      const res = await loginUser(data);

      saveUser({
        user: res.data.user,
      });

      showMessage("Login Successful!", "success");

      setTimeout(() => navigate("/"), 1000);

    } catch (error) {
      showMessage(error.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-800 px-4">

      {msg && (
        <div className={`
          fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg
          text-white text-lg font-semibold animate-pulse
          ${msgType === "success" ? "bg-green-600" : "bg-red-600"}
        `}>
          {msg}
        </div>
      )}

      <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl p-8 w-full max-w-sm shadow-2xl">
        
        <h2 className="text-3xl font-bold text-center mb-6 text-white tracking-wide">
          Login
        </h2>

        <div className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md bg-gray-900 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md bg-gray-900 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 active:scale-95 transition-all duration-300 shadow-md"
          >
            Login
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?
          <a href="/register" className="text-indigo-400 ml-1 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
