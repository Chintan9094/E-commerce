import {
  UsersIcon,
  ShoppingBagIcon,
  FolderIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const stats = [
    {
      name: 'Total Users',
      value: '12,543',
      change: '+8.2%',
      changeType: 'positive',
      icon: UsersIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Sellers',
      value: '1,234',
      change: '+12.5%',
      changeType: 'positive',
      icon: BuildingStorefrontIcon,
      color: 'bg-green-500',
    },
    {
      name: 'Total Products',
      value: '45,678',
      change: '+5.3%',
      changeType: 'positive',
      icon: ShoppingBagIcon,
      color: 'bg-yellow-500',
    },
    {
      name: 'Total Orders',
      value: '89,012',
      change: '+15.7%',
      changeType: 'positive',
      icon: FolderIcon,
      color: 'bg-purple-500',
    },
    {
      name: 'Total Revenue',
      value: '₹12.5Cr',
      change: '+20.1%',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'bg-indigo-500',
    },
    {
      name: 'Pending Reviews',
      value: '234',
      change: '-3.2%',
      changeType: 'negative',
      icon: UserGroupIcon,
      color: 'bg-red-500',
    },
  ];

  const recentActivities = [
    { id: 1, type: 'New User', description: 'John Doe registered', time: '2 minutes ago' },
    { id: 2, type: 'New Order', description: 'Order #ORD123456 placed', time: '15 minutes ago' },
    { id: 3, type: 'New Seller', description: 'Tech Store registered', time: '1 hour ago' },
    { id: 4, type: 'Product Added', description: 'Wireless Headphones added', time: '2 hours ago' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
          <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue Chart</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart visualization would appear here</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b last:border-0">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.type}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
