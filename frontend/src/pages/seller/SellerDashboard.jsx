import { Link } from 'react-router-dom';
import {
  ShoppingBagIcon,
  CurrencyDollarIcon,
  FolderIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import Button from '../../components/common/Button';

const SellerDashboard = () => {
  const stats = [
    {
      name: 'Total Products',
      value: '45',
      change: '+12%',
      changeType: 'positive',
      icon: ShoppingBagIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Orders',
      value: '128',
      change: '+8%',
      changeType: 'positive',
      icon: FolderIcon,
      color: 'bg-green-500',
    },
    {
      name: 'Total Earnings',
      value: '₹2,45,890',
      change: '+15%',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'bg-yellow-500',
    },
    {
      name: 'Pending Orders',
      value: '12',
      change: '-5%',
      changeType: 'negative',
      icon: ArrowTrendingUpIcon,
      color: 'bg-red-500',
    },
  ];

  const recentOrders = [
    { id: 'ORD001', customer: 'John Doe', product: 'Wireless Headphones', amount: 5998, status: 'Pending', date: '2024-01-15' },
    { id: 'ORD002', customer: 'Jane Smith', product: 'Smart Watch', amount: 8999, status: 'Shipped', date: '2024-01-14' },
    { id: 'ORD003', customer: 'Mike Johnson', product: 'Laptop Backpack', amount: 1499, status: 'Delivered', date: '2024-01-13' },
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sales: 45, revenue: '₹1,34,955', stock: 12 },
    { name: 'Smart Watch', sales: 32, revenue: '₹2,87,968', stock: 8 },
    { name: 'Laptop Backpack', sales: 28, revenue: '₹41,972', stock: 15 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <Link to="/seller/products/add">
              <Button variant="primary">
                <PlusIcon className="w-5 h-5 mr-2 inline" />
                Add Product
              </Button>
            </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm mt-2 ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <Link to="/seller/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Order ID</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Customer</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Amount</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3 text-sm text-gray-900">#{order.id}</td>
                    <td className="py-3 text-sm text-gray-600">{order.customer}</td>
                    <td className="py-3 text-sm font-medium text-gray-900">₹{order.amount.toLocaleString()}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <Link to={`/seller/orders/${order.id}`} className="text-blue-600 hover:text-blue-700">
                        <EyeIcon className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    {product.sales} sales • Revenue: {product.revenue}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                  <p className={`text-xs mt-1 ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                    {product.stock < 10 ? 'Low Stock' : 'In Stock'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
