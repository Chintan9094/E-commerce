import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCartIcon,
  HeartIcon,
  UserIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { logoutUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";
import { getMyCart } from "../../services/cart.service";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log("Logout API error (ignoring)", error);
    } finally {
      setUser(null);
      navigate("/user/login", { replace: true });
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    navigate(`/user/products?search=${searchQuery}`);
    setSearchQuery("");
  };

  // ❤️ Wishlist sync (instant update)
  useEffect(() => {
    const updateWishlist = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(wishlist.length);
    };

    updateWishlist();

    window.addEventListener("wishlistUpdated", updateWishlist);

    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlist);
    };
  }, []);

  // 🛒 Cart sync (instant update from backend)
  useEffect(() => {
    const updateCart = async () => {
      try {
        const res = await getMyCart();
        const items = res.data?.cart?.items || [];
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      } catch (err) {
        console.log("Cart count error", err);
      }
    };

    updateCart();

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/user" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">ShopHub</span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="w-full relative flex">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="md:hidden text-gray-600 hover:text-gray-900">
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>

            {/* Wishlist */}
            <Link
              to="/user/wishlist"
              className="relative text-gray-600 hover:text-gray-900"
            >
              <HeartIcon className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/user/cart"
              className="relative text-gray-600 hover:text-gray-900"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/user/profile"
              className="text-gray-600 hover:text-gray-900"
            >
              <UserIcon className="w-6 h-6" />
            </Link>

            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link
                to="/user"
                className="px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Home
              </Link>
              <Link
                to="/user/products"
                className="px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Products
              </Link>
              <Link
                to="/user/orders"
                className="px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                My Orders
              </Link>
              <Link
                to="/user/wishlist"
                className="px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Wishlist
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
