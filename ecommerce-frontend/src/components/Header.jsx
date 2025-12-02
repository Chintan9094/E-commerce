import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        navigate("/login");
    };

    return (
        <header className="bg-gray-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                <Link to="/" className="text-xl font-bold text-indigo-400 hover:text-indigo-300">
                    LuxeCart
                </Link>

                <nav className="hidden md:flex space-x-8">
                    <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
                    <Link to="/products" className="hover:text-gray-300 transition-colors">Products</Link>
                    <Link to="/cart" className="hover:text-gray-300 transition-colors">Cart</Link>
                </nav>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link to="/profile" className="flex items-center gap-2 hover:text-indigo-300 transition-colors">
                                <span className="text-sm font-medium">{user.name}</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-gray-300 transition-colors">Login</Link>
                            <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm transition-colors">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
