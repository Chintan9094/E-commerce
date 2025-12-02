import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

export default function Cart() {
  const { cart, removeItem } = useCart();
  const navigate = useNavigate();

  if (!cart) {
    return (
      <div className="text-white p-10 text-center text-2xl">
        Loading cart...
      </div>
    );
  }

  const totalPrice = cart.reduce((sum, item) => {
    if (!item?.product) return sum; 
    const price = item.product.price || 0;
    const qty = item.quantity || 1;
    return sum + price * qty;
  }, 0);

  const validItems = cart.filter((item) => item?.product);

  if (validItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-black via-gray-900 to-black text-white">

        <button
          onClick={() => navigate("/products")}
          className="mb-6 flex items-center gap-3 text-lg hover:text-indigo-400 transition"
        >
          <ArrowUturnLeftIcon className="w-7 h-7" />
          Back
        </button>

        <h1 className="text-4xl font-bold">Your Cart is Empty 🛒</h1>
      </div>
    );
  }

  // 🛒 Cart with items
  return (
    <div className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black text-white px-8 py-12">

      <div className="mb-8">
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-3 text-lg hover:text-indigo-400 transition"
        >
          <ArrowUturnLeftIcon className="w-8 h-8" />
          Back
        </button>
      </div>

      <h1 className="text-5xl font-extrabold mb-10 text-center">Your Cart</h1>

      <div className="max-w-3xl mx-auto space-y-6">

        {validItems.map((item) => (
          <div
            key={item.product._id}
            className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl shadow-xl p-6 flex justify-between items-start hover:shadow-2xl transition-all"
          >
            <div>
              <h2 className="text-2xl font-bold">{item.product.name}</h2>

              <p className="text-gray-300 mt-1">
                ₹ {item.product.price} × {item.quantity}
              </p>

              <button
                onClick={() => removeItem(item.product._id)}
                className="text-red-400 text-sm mt-3 hover:text-red-500"
              >
                Remove
              </button>
            </div>

            <p className="text-indigo-400 text-2xl font-bold">
              ₹ {item.product.price * item.quantity}
            </p>
          </div>
        ))}

        <div className="text-right text-3xl font-extrabold mt-10">
          Total: <span className="text-indigo-400">₹ {totalPrice}</span>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="w-full mt-8 py-4 rounded-xl text-2xl font-bold 
                     bg-linear-to-r from-indigo-600 to-purple-600 
                     hover:from-indigo-500 hover:to-purple-500 
                     transition-all duration-300 
                     shadow-[0_0_15px_rgba(99,102,241,0.7)] 
                     hover:shadow-[0_0_25px_rgba(139,92,246,0.9)]
                     active:scale-95"
        >
          Place Order
        </button>

      </div>
    </div>
  );
}
