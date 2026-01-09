import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ShoppingBagIcon,
  FolderIcon,
  CurrencyDollarIcon,
  UserIcon,
  Cog6ToothIcon,
  XMarkIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { logoutUser } from '../../services/auth.service';
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ isOpen, onClose, role = "seller" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const sellerMenuItems = [
    { path: "/seller/dashboard", label: "Dashboard", icon: HomeIcon },
    { path: "/seller/products", label: "Products", icon: ShoppingBagIcon },
    { path: "/seller/orders", label: "Orders", icon: FolderIcon },
    { path: "/seller/earnings", label: "Earnings", icon: CurrencyDollarIcon },
    { path: "/seller/profile", label: "Profile & Settings", icon: Cog6ToothIcon },
    { action: "logout", label: "Logout", icon: ArrowLeftStartOnRectangleIcon },
  ];

  const adminMenuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: HomeIcon },
    { path: "/admin/users", label: "Manage Users", icon: UserIcon },
    { path: "/admin/sellers", label: "Manage Sellers", icon: UserIcon },
    { path: "/admin/products", label: "Manage Products", icon: ShoppingBagIcon },
    { path: "/admin/orders", label: "Manage Orders", icon: FolderIcon },
    { path: "/admin/categories", label: "Categories", icon: FolderIcon },
    { path: "/admin/reports", label: "Reports", icon: FolderIcon },
    { path: "/admin/profile", label: "Profile", icon: UserIcon },
    { action: "logout", label: "Logout", icon: ArrowLeftStartOnRectangleIcon },
  ];

  const menuItems = role === "seller" ? sellerMenuItems : adminMenuItems;

  const isActive = (path) => {
    return (
      location.pathname === path ||
      location.pathname.startsWith(path + "/")
    );
  };

const handleLogout = async () => {
  try {
    await logoutUser(); 
  } catch (error) {
    console.log("Logout API failed, ignoring");
  } finally {
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/auth/login", {
      replace: true,
    });
  }
};

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 text-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">
            {role === "seller" ? "Seller Panel" : "Admin Panel"}
          </h2>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            {menuItems.map((item, index) => {
              const Icon = item.icon;

              if (item.action === "logout") {
                return (
                  <li key={`logout-${index}`}>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              }

              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
