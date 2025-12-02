import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateUser } from "../services/auth";

export default function Profile() {
  const { user, loginUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const showMessage = (text, type) => {
    setMsg(text);
    setMsgType(type);
    setTimeout(() => {
      setMsg("");
      setMsgType("");
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateUser(formData);
      if (data.success) {
        loginUser({ user: data.user });
        showMessage("Profile updated successfully!", "success");
      }
    } catch (error) {
      showMessage(error.response?.data?.message || "Update failed", "error");
    }
  };

  if (!user)
    return (
      <div className="text-white text-3xl text-center mt-20 animate-pulse">
        Loading Profile...
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-black via-gray-900 to-black px-6 py-12">

      <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-8 shadow-xl">

        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          My Profile
        </h2>

        {msg && (
          <div
            className={`
              mb-5 p-3 rounded-md text-center text-white font-medium 
              ${msgType === "success" ? "bg-green-600" : "bg-red-600"}
            `}
          >
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-gray-300 mb-1 text-sm">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 rounded-md bg-gray-900/60 border border-gray-700 text-white 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 text-sm">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-3 rounded-md bg-gray-900/60 border border-gray-700 text-white 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md text-lg font-semibold 
                       bg-indigo-600 hover:bg-indigo-700 
                       transition-all"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
