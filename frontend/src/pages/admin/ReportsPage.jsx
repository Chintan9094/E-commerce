const ReportsPage = () => {
  const reports = [
    {
      id: 1,
      name: 'Sales Report',
      description: 'Monthly sales report with revenue breakdown',
      date: '2024-01-15',
      type: 'Monthly',
    },
    {
      id: 2,
      name: 'User Growth Report',
      description: 'New user registrations and growth metrics',
      date: '2024-01-10',
      type: 'Weekly',
    },
    {
      id: 3,
      name: 'Product Performance Report',
      description: 'Top selling products and category analysis',
      date: '2024-01-05',
      type: 'Monthly',
    },
    {
      id: 4,
      name: 'Seller Performance Report',
      description: 'Seller statistics and earnings report',
      date: '2024-01-01',
      type: 'Monthly',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Reports</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Generate New Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select Report Type</option>
            <option value="sales">Sales Report</option>
            <option value="users">User Growth Report</option>
            <option value="products">Product Performance</option>
            <option value="sellers">Seller Performance</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select Period</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Generate Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Recent Reports</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {reports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-50 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                    {report.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                <p className="text-xs text-gray-500">Generated on: {report.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  View
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
