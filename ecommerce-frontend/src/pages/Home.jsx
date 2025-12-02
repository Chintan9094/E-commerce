import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAllProducts } from "../services/products";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, logoutUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts().then((res) => {
      setProducts(res.data.products.slice(0, 4)); 
    });
  }, []);

  const handleLogout = () => {

    fetch("http://localhost:4000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    logoutUser();        
    navigate("/login");  
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-12">

      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-wide">
          Welcome to <span className="text-indigo-500">E-Commerce Store</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-10">
          Shop premium products at the best prices. Experience fast delivery, safe payments, and top-quality service.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/products"
            className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-lg text-lg"
          >
            Shop Now
          </a>

          {/* {!user && (
            <a
              href="/login"
              className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all shadow-lg text-lg"
            >
              Login
            </a>
          )}

          {user && (
            <button
              onClick={() => setShowPopup(true)}
              className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition-all shadow-lg text-lg"
            >
              Logout
            </button>
          )} */}
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {products.length > 0 ? (
            products.map((p) => (
              <div
                key={p._id}
                className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl shadow-xl p-5 
                           transition-all hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />

                <h4 className="text-lg font-semibold">{p.name}</h4>
                <p className="text-indigo-400 font-bold text-xl">₹ {p.price}</p>
              </div>
            ))
          ) : (

            [1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl shadow-xl p-5"
              >
                <div className="w-full h-40 bg-gray-700 rounded-md mb-4 animate-pulse" />
                <h4 className="text-lg font-semibold">Loading...</h4>
                <p className="text-indigo-400 font-bold text-xl">₹ —</p>
              </div>
            ))
          )}

        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-80 text-center shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-white">Confirm Logout</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to log out?</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-all"
              >
                Yes
              </button>

              <button
                onClick={() => setShowPopup(false)}
                className="px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
