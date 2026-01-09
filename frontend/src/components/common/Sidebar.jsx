import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  ShoppingBagIcon,
  FolderIcon,
  CurrencyDollarIcon,
  UserIcon,
  Cog6ToothIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen, onClose, role = 'seller' }) => {
  const location = useLocation();

  const sellerMenuItems = [
    { path: '/seller/dashboard', label: 'Dashboard', icon: HomeIcon },
    { path: '/seller/products', label: 'Products', icon: ShoppingBagIcon },
    { path: '/seller/orders', label: 'Orders', icon: FolderIcon },
    { path: '/seller/earnings', label: 'Earnings', icon: CurrencyDollarIcon },
    { path: '/seller/profile', label: 'Profile & Settings', icon: Cog6ToothIcon },
  ];

  const adminMenuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: HomeIcon },
    { path: '/admin/users', label: 'Manage Users', icon: UserIcon },
    { path: '/admin/sellers', label: 'Manage Sellers', icon: UserIcon },
    { path: '/admin/products', label: 'Manage Products', icon: ShoppingBagIcon },
    { path: '/admin/orders', label: 'Manage Orders', icon: FolderIcon },
    { path: '/admin/categories', label: 'Categories', icon: FolderIcon },
    { path: '/admin/reports', label: 'Reports', icon: FolderIcon },
    { path: '/admin/profile', label: 'Profile', icon: UserIcon },
  ];

  const menuItems = role === 'seller' ? sellerMenuItems : adminMenuItems;

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">
            {role === 'seller' ? 'Seller Panel' : 'Admin Panel'}
          </h2>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      active
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
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
