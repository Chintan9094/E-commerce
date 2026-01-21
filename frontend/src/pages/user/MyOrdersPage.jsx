import { Link } from 'react-router-dom';
import { EyeIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { getMyOrders } from '../../services/order.service';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrders();
      setOrders(res.data.orders);
      console.log("Fetched orders:----->", res.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-700 ring-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-700 ring-blue-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 ring-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 ring-red-200';
      default:
        return 'bg-gray-100 text-gray-700 ring-gray-200';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order._id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ring-1 ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>

                  <Link to={`/user/orders/${order._id}`}>
                    <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-200 rounded-lg transition">
                      <EyeIcon className="w-4 h-4" />
                      View
                    </button>
                  </Link>
                </div>
              </div>

              <div className="mt-6 border-t pt-4 space-y-4">
                {order.items.map((item, index) => {
                  const image =
                    item.product?.image ||
                    item.product?.imageUrl ||
                    item.product?.images?.[0] ||
                    "https://via.placeholder.com/60";

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-4 bg-gray-50 p-3 rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={image}
                          alt={item.product?.name}
                          className="w-14 h-14 object-cover rounded-lg border"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {item.product?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </p>

                          {order.status === "delivered" && (
                            <Link to={`/user/product/${item.product?._id}?review=true`}>
                              <button className="mt-2 text-xs px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                Leave Review
                              </button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Amount</span>
                <span className="text-xl font-bold text-gray-900">
                  ₹{order.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="text-7xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No orders yet
            </h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Looks like you haven’t placed any orders yet. Start shopping and your orders will appear here.
            </p>

            <Link to="/user/products">
              <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow">
                Browse Products
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
