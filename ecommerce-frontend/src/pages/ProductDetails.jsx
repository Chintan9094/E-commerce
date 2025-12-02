import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetails } from "../services/products";
import { ArrowUturnLeftIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addItem } = useCart();
  const [product, setProduct] = useState(null);

  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("success");

  const showMessage = (text, type = "success") => {
    setMsg(text);
    setMsgType(type);

    setTimeout(() => {
      setMsg("");
    }, 2000);
  };

  useEffect(() => {
    getProductDetails(id).then((res) => setProduct(res.data.product));
  }, [id]);

  if (!product)
    return <div className="text-white p-10 text-center text-2xl">Loading...</div>;

  const totalItemsInCart = cart.reduce((a, b) => a + b.quantity, 0);

  const handleAddToCart = async () => {
    try {
      await addItem(product._id);
      showMessage("Item added to cart!", "success");
    } catch (error) {
      if (error.message === "UNAUTHORIZED" || error.response?.status === 401) {
        showMessage("Please login to add items to cart", "error");
        setTimeout(() => {
          if (window.location.pathname !== "/login") {
            navigate("/login");
          }
        }, 1500);
      } else {
        showMessage(
          error.message || "Failed to add item to cart. Please try again.",
          "error"
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black text-white px-8 py-10">

      {msg && (
        <div
          className={`
            fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg
            text-white text-lg font-semibold animate-pulse z-50
            ${msgType === "success" ? "bg-green-600" : "bg-red-600"}
          `}
        >
          {msg}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-3 text-lg hover:text-indigo-400 transition"
        >
          <ArrowUturnLeftIcon className="w-7 h-7" />
          Back
        </button>

        <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
          <ShoppingCartIcon className="w-9 h-9 hover:text-indigo-400 transition" />

          {totalItemsInCart > 0 && (
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
              {totalItemsInCart}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-md p-10 rounded-xl shadow-2xl border border-gray-700">

        <img
          src={product.image || null}
          alt={product.name}
          className="w-full h-72 object-cover rounded-lg mb-8 shadow-md"
        />

        <h2 className="text-4xl font-bold mb-3">{product.name}</h2>
        <p className="text-indigo-400 text-3xl font-semibold mb-4">₹ {product.price}</p>

        <p className="mb-2"><strong>Category:</strong> {product.category}</p>
        <p className="mb-6"><strong>Description:</strong> {product.description}</p>

        <button
          onClick={handleAddToCart}
          className="w-full mt-10 bg-indigo-600 hover:bg-indigo-700 py-4 rounded-lg text-xl font-semibold transition"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}
