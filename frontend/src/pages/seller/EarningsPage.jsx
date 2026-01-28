import { useEffect, useState } from "react";
import { getSellerEarnings } from "../../services/order.service";

const EarningsPage = () => {

  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSellerEarnings();
      setStats(res.data.stats);
      console.log(res.data.stats)
      setOrders(res.data.orders);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Earnings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-2">Total Earnings</p>
          <p className="text-2xl font-bold text-gray-900">₹{stats?.totalEarnings}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-2">This Month</p>
          <p className="text-2xl font-bold text-green-600">₹{stats?.thisMonth}</p>
          {/* <p className="text-xs text-green-600 mt-1">+16% from last month</p> */}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-2">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">₹{stats?.pending.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-2">Delivered Orders</p>
          <p className="text-2xl font-bold text-blue-600">{stats?.completedSales}</p>
        </div>
      </div>

      {/* <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Withdraw Earnings</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            placeholder="Enter amount"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Request Withdrawal
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Minimum withdrawal amount: ₹1000
        </p>
      </div> */}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Delivered Orders History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(order.paidAt || order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    Sale
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    #{order._id}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-green-600">
                    +₹{order.totalAmount.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Paid
                    </span>
                  </td>
                </tr>                                                     
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default EarningsPage;
