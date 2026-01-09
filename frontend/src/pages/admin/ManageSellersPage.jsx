import { EyeIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ManageSellersPage = () => {
  const sellers = [
    {
      id: 1,
      shopName: 'Tech Store',
      owner: 'John Seller',
      email: 'john@techstore.com',
      phone: '+91 9876543210',
      products: 45,
      orders: 128,
      status: 'Approved',
      joinedDate: '2023-01-15',
    },
    {
      id: 2,
      shopName: 'Fashion Hub',
      owner: 'Jane Fashion',
      email: 'jane@fashionhub.com',
      phone: '+91 9876543211',
      products: 32,
      orders: 89,
      status: 'Pending',
      joinedDate: '2024-01-10',
    },
    {
      id: 3,
      shopName: 'Sports World',
      owner: 'Mike Sports',
      email: 'mike@sportsworld.com',
      phone: '+91 9876543212',
      products: 28,
      orders: 56,
      status: 'Approved',
      joinedDate: '2023-05-20',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Sellers</h1>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search sellers..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Sort By</option>
            <option value="name">Shop Name</option>
            <option value="joined">Joined Date</option>
            <option value="products">Products</option>
          </select>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
            Apply Filters
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shop</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sellers.map((seller) => (
                <tr key={seller.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{seller.shopName}</p>
                      <p className="text-sm text-gray-500">{seller.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{seller.owner}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{seller.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{seller.products}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{seller.orders}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      seller.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      seller.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {seller.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <EyeIcon className="w-5 h-5" />
                      </button>
                      {seller.status === 'Pending' && (
                        <>
                          <button className="text-green-600 hover:text-green-700">
                            <CheckIcon className="w-5 h-5" />
                          </button>
                          <button className="text-red-600 hover:text-red-700">
                            <XMarkIcon className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      <button className="text-red-600 hover:text-red-700">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing 1 to {sellers.length} of {sellers.length} sellers
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSellersPage;
