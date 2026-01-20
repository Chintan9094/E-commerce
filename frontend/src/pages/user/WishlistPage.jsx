import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import Button from "../../components/common/Button";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(data);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlistItems.filter(item => item._id !== id);
    setWishlistItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));

    window.dispatchEvent(new Event("wishlistUpdated"));
    
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <HeartOutlineIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-600 mb-8">Start adding items you love!</p>
        <Link to="/user/products">
          <Button variant="primary">Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group relative"
          >
            <button
              onClick={() => removeFromWishlist(item._id)}
              className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
            >
              <HeartIcon className="w-5 h-5 text-red-500" />
            </button>

            <Link to={`/user/product/${item._id}`}>
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {item.name}
                </h3>

                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xl font-bold text-gray-900">
                    ₹{item.price}
                  </span>

                  {item.originalPrice && (
                    <>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{item.originalPrice}
                      </span>
                      <span className="text-sm text-green-600 font-semibold">
                        {Math.round(
                          ((item.originalPrice - item.price) /
                            item.originalPrice) *
                            100
                        )}
                        % off
                      </span>
                    </>
                  )}
                </div>

                <p
                  className={`text-sm mb-3 ${
                    item.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </Link>

            <div className="px-4 pb-4">
              <Button
                variant="primary"
                size="sm"
                className="w-full flex items-center justify-center"
                disabled={item.stock <= 0}
              >
                <ShoppingCartIcon className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
