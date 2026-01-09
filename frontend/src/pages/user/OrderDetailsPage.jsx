import { useParams, Link } from 'react-router-dom';
import { MapPinIcon, TruckIcon } from '@heroicons/react/24/outline';

const OrderDetailsPage = () => {
  const { id } = useParams();

  const order = {
    id: id,
    date: '2024-01-15',
    status: 'Delivered',
    total: 14996,
    subtotal: 14996,
    shipping: 0,
    tax: 2699.28,
    address: {
      name: 'John Doe',
      phone: '+91 9876543210',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
    },
    items: [
      {
        id: 1,
        name: 'Wireless Headphones',
        quantity: 2,
        price: 2999,
        image: 'https://via.placeholder.com/100x100?text=Headphones',
      },
      {
        id: 2,
        name: 'Smart Watch',
        quantity: 1,
        price: 8999,
        image: 'https://via.placeholder.com/100x100?text=Smart+Watch',
      },
    ],
    tracking: [
      { status: 'Order Placed', date: '2024-01-15 10:00 AM', active: true },
      { status: 'Confirmed', date: '2024-01-15 10:30 AM', active: true },
      { status: 'Shipped', date: '2024-01-16 02:00 PM', active: true },
      { status: 'Out for Delivery', date: '2024-01-17 09:00 AM', active: true },
      { status: 'Delivered', date: '2024-01-17 03:30 PM', active: true },
    ],
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/user/orders" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
        ← Back to Orders
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order #{order.id}</h1>
            <p className="text-gray-600">Placed on {order.date}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)} mt-4 sm:mt-0 inline-block`}>
            {order.status}
          </span>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Order Tracking</h2>
          <div className="relative">
            {order.tracking.map((step, index) => (
              <div key={index} className="flex items-start mb-4">
                <div className={`shrink-0 w-4 h-4 rounded-full ${step.active ? 'bg-green-500' : 'bg-gray-300'} mt-1`}></div>
                <div className="ml-4 flex-1">
                  <p className={`font-medium ${step.active ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.status}
                  </p>
                  <p className={`text-sm ${step.active ? 'text-gray-600' : 'text-gray-400'}`}>
                    {step.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 pb-4 border-b last:border-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">₹{item.price.toLocaleString()} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <MapPinIcon className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold">Delivery Address</h2>
            </div>
            <div className="text-gray-600 text-sm">
              <p className="font-medium text-gray-900 mb-1">{order.address.name}</p>
              <p>{order.address.address}</p>
              <p>
                {order.address.city}, {order.address.state} - {order.address.pincode}
              </p>
              <p className="mt-2">Phone: {order.address.phone}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <TruckIcon className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold">Order Summary</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (GST)</span>
                <span>₹{order.tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
