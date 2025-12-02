import { useEffect, useState } from "react";
import { getAllProducts } from "../services/products.js";
import { useNavigate } from "react-router-dom";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

export default function Products() {
  const [products, setProducts] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res.data.products))
      .catch(() => setProducts([]));
  }, []);

  if (!products) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-3xl">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-10">

      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-3 text-lg mb-6 hover:text-indigo-400 transition"
      >
        <ArrowUturnLeftIcon className="w-7 h-7" />
        <span>Back to Home</span>
      </button>

      <h2 className="text-3xl font-bold mb-8 text-center tracking-wide">
        Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-2xl text-gray-400">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg p-5 
                         hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />

              <h4 className="text-lg font-semibold mb-1">{p.name}</h4>
              <p className="text-indigo-400 font-bold text-xl">₹ {p.price}</p>

              <button
                onClick={() => navigate(`/product/${p._id}`)}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
