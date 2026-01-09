import { Link } from 'react-router-dom';
import { EyeIcon } from '@heroicons/react/24/outline';

const MyOrdersPage = () => {
  const orders = [
    {
      id: 'ORD123456',
      date: '2024-01-15',
      status: 'Delivered',
      total: 14996,
      items: [
        { name: 'Wireless Headphones', quantity: 2 },
        { name: 'Smart Watch', quantity: 1 },
      ],
    },
    {
      id: 'ORD123455',
      date: '2024-01-10',
      status: 'Shipped',
      total: 5499,
      items: [{ name: 'Coffee Maker', quantity: 1 }],
    },
    {
      id: 'ORD123454',
      date: '2024-01-05',
      status: 'Processing',
      total: 3499,
      items: [{ name: 'Running Shoes', quantity: 1 }],
    },
    {
      id: 'ORD123453',
      date: '2023-12-28',
      status: 'Cancelled',
      total: 1999,
      items: [{ name: 'Gaming Mouse', quantity: 1 }],
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                <p className="text-sm text-gray-500">Placed on {order.date}</p>
              </div>
              <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <Link to={`/user/orders/${order.id}`}>
                  <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                    <EyeIcon className="w-5 h-5 mr-1" />
                    View Details
                  </button>
                </Link>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="space-y-2 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} x {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-gray-600">Total Amount</span>
                <span className="text-xl font-bold text-gray-900">
                  ₹{order.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-8">Start shopping to see your orders here!</p>
          <Link to="/user/products">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Browse Products
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
