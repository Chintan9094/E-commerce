const EarningsPage = () => {
  const earnings = {
    totalEarnings: 245890,
    thisMonth: 45230,
    lastMonth: 38900,
    pending: 12500,
    available: 233390,
  };

  const transactions = [
    {
      id: 1,
      date: '2024-01-15',
      orderId: 'ORD001',
      amount: 5998,
      status: 'Completed',
      type: 'Sale',
    },
    {
      id: 2,
      date: '2024-01-14',
      orderId: 'ORD002',
      amount: 8999,
      status: 'Completed',
      type: 'Sale',
    },
    {
      id: 3,
      date: '2024-01-13',
      orderId: 'ORD003',
      amount: 1499,
      status: 'Pending',
      type: 'Sale',
    },
    {
      id: 4,
      date: '2024-01-12',
      orderId: 'Payout-001',
      amount: -50000,
      status: 'Completed',
      type: 'Withdrawal',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Earnings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-2">Total Earnings</p>
          <p className="text-2xl font-bold text-gray-900">₹{earnings.totalEarnings.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-2">This Month</p>
          <p className="text-2xl font-bold text-green-600">₹{earnings.thisMonth.toLocaleString()}</p>
          <p className="text-xs text-green-600 mt-1">+16% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-2">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">₹{earnings.pending.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-2">Available Balance</p>
          <p className="text-2xl font-bold text-blue-600">₹{earnings.available.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
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
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.type}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">#{transaction.orderId}</td>
                  <td className={`px-6 py-4 text-sm font-medium ${
                    transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
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
