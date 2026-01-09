import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Button from '../../components/common/Button';

const SellerOrderDetailsPage = () => {
  const { id } = useParams();

  const order = {
    id: id,
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91 9876543210',
    },
    product: {
      name: 'Wireless Headphones',
      sku: 'WH-001',
      quantity: 2,
      price: 2999,
      image: 'https://via.placeholder.com/100x100?text=Headphones',
    },
    shipping: {
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
    },
    amount: {
      subtotal: 5998,
      shipping: 0,
      tax: 1079.64,
      total: 7077.64,
    },
    status: 'Pending',
    date: '2024-01-15',
    paymentMethod: 'Credit Card',
  };

  const updateOrderStatus = (newStatus) => {
    console.log('Update order status to', newStatus);
  };

  return (
    <div>
      <Link to="/seller/orders" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back to Orders
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order #{order.id}</h1>
          <p className="text-gray-600 mt-1">Placed on {order.date}</p>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Product Details</h2>
            <div className="flex items-center space-x-4">
              <img
                src={order.product.image}
                alt={order.product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{order.product.name}</h3>
                <p className="text-sm text-gray-600">SKU: {order.product.sku}</p>
                <p className="text-sm text-gray-600">Quantity: {order.product.quantity}</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  ₹{order.product.price.toLocaleString()} each
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Name:</span> {order.customer.name}</p>
              <p><span className="font-medium">Email:</span> {order.customer.email}</p>
              <p><span className="font-medium">Phone:</span> {order.customer.phone}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
            <div className="text-sm text-gray-600">
              <p>{order.shipping.address}</p>
              <p>
                {order.shipping.city}, {order.shipping.state} - {order.shipping.pincode}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{order.amount.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>₹{order.amount.tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{order.amount.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Payment Method:</span> {order.paymentMethod}
              </p>
            </div>
          </div>

          {order.status === 'Pending' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Update Status</h2>
              <div className="space-y-3">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => updateOrderStatus('Shipped')}
                >
                  Mark as Shipped
                </Button>
                <Button
                  variant="danger"
                  className="w-full"
                  onClick={() => updateOrderStatus('Cancelled')}
                >
                  Cancel Order
                </Button>
              </div>
            </div>
          )}

          {order.status === 'Shipped' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Update Status</h2>
              <Button
                variant="success"
                className="w-full"
                onClick={() => updateOrderStatus('Delivered')}
              >
                Mark as Delivered
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerOrderDetailsPage;
