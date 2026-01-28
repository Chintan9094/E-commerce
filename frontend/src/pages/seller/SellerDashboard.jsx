import { Link } from "react-router-dom";
import { ShoppingBagIcon, CurrencyDollarIcon, FolderIcon, ArrowTrendingUpIcon, PlusIcon, EyeIcon, } from "@heroicons/react/24/outline";
import Button from "../../components/common/Button";
import { useEffect, useState } from "react";
import { getMyOrders, getSellerDashboardStats } from "../../services/order.service";
import { getTopProducts } from "../../services/product.service";

const SellerDashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await getSellerDashboardStats();
        const formattedStats = [
          {
            name: "Total Products",
            value: data.stats.totalProducts,
            icon: ShoppingBagIcon,
            color: "bg-blue-500",
          },
          {
            name: "Total Orders",
            value: data.stats.totalOrders,
            icon: FolderIcon,
            color: "bg-green-500",
          },
          {
            name: "Total Earnings",
            value: `₹${data.stats.totalEarnings}`,
            icon: CurrencyDollarIcon,
            color: "bg-yellow-500",
          },
          {
            name: "Pending Orders",
            value: data.stats.pendingOrders,
            icon: ArrowTrendingUpIcon,
            color: "bg-red-500",
          },
        ];

        setStats(formattedStats);
      } catch (err) {
        console.error("Dashboard fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const res = await getMyOrders({ page: 1, limit: 5 });
        setRecentOrders(res.data.orders);
      } catch (error) {
        console.error("Error fetching recent orders:", error);
      }
    };
    fetchRecentOrders();
  }, []);

  const topProductsssss = [
    { name: "Wireless Headphones", sales: 45, revenue: "₹1,34,955", stock: 12 },
    { name: "Smart Watch", sales: 32, revenue: "₹2,87,968", stock: 8 },
    { name: "Laptop Backpack", sales: 28, revenue: "₹41,972", stock: 15 },
  ];

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await getTopProducts();
        setTopProducts(res.data.products);
        console.log(res.data.products)
      } catch (error) {
        console.error("Error fetching top products:", error);
      }
    };
    fetchTopProducts(); 
  }, []);

    if (loading) return <p>Dashboard loading...</p>;

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
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
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
            <Link
              to="/seller/orders"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-medium text-gray-600">
                    Order ID
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">
                    Customer
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">
                    Amount
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="py-3 text-sm text-gray-900">#{order._id}</td>
                    <td className="py-3 text-sm text-gray-600">
                      {order.user?.name}
                    </td>
                    <td className="py-3 text-sm font-medium text-gray-900">
                      ₹{order.totalAmount}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <Link
                        to={`/seller/orders/${order._id}`}
                        className="inline-flex items-center justify-center text-blue-600 hover:text-blue-700"
                      >
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
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{product?.name}</h3>
                  <p className="text-sm text-gray-600">
                    {product.sales} sales • Revenue: {product.revenue}
                  </p>
                </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      Stock: {product.stock}
                    </p>

                    <p
                      className={`text-xs mt-1 font-medium ${
                        product.stock === 0
                          ? "text-red-700"
                          : product.stock < 50
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    >
                      {product.stock === 0
                        ? "Out of Stock"
                        : product.stock < 50
                        ? "Low Stock"
                        : "In Stock"}
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
