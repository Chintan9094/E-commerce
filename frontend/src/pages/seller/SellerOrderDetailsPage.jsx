import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Button from '../../components/common/Button';
import { useEffect, useState } from 'react';
import { getOrderById, updateOrderStatus } from '../../services/order.service';

const SellerOrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderById(id);
        setOrder(res.data.order);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };
    if (id) fetchOrder();
  }, [id]);

  const fetchUpdateOrderStatus = async (newStatus) => {
    try {
      const res = await updateOrderStatus(order._id, newStatus);
      setOrder(res.data.order);
      console.log(res.data.order)
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (!order) return <div>Loading...</div>;

  const subtotal = order.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 99;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  return (
    <div>
      <Link to="/seller/orders" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back to Orders
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order #{order._id}</h1>
          <p className="text-gray-600 mt-1">Placed on {order.date}</p>
        </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Product Details</h2>
            <div className="flex items-center space-x-4">
              <img
                src={order.items?.[0]?.product?.image}
                alt={order.items?.[0]?.product?.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{order.items?.[0]?.product?.name}</h3>
                <p className="text-sm text-gray-600">SKU: {order.items?.[0]?.product?.sku}</p>
                <p className="text-sm text-gray-600">Quantity: {order.items?.[0]?.quantity}</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  ₹{order.items?.[0]?.product?.price} each
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Name:</span> {order.user?.name}</p>
              <p><span className="font-medium">Email:</span> {order.user?.email}</p>
              <p><span className="font-medium">Phone:</span> {order.user?.phone}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
            <div className="text-sm text-gray-600">
              <p>{order.address?.address}</p>
              <p>
                {order.address?.city}, {order.address?.state} - {order.address?.pincode}
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
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>₹{order.tax}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{order.totalAmount}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p>
                <span className="font-medium">Payment Status:</span>{" "}
                {order.isPaid ? "Paid" : "Unpaid"}
              </p>
            </div>
          </div>

          {order.status === 'pending' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Update Status</h2>
              <div className="space-y-3">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => fetchUpdateOrderStatus('shipped')}
                >
                  Mark as Shipped
                </Button>
                <Button
                  variant="danger"
                  className="w-full"
                  onClick={() => fetchUpdateOrderStatus('cancelled')}
                >
                  Cancel Order
                </Button>
              </div>
            </div>
          )}

          {order.status === 'shipped' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Update Status</h2>
              <Button
                variant="success"
                className="w-full"
                onClick={() => fetchUpdateOrderStatus('delivered')}
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
