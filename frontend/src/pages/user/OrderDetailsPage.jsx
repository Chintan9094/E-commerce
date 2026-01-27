import { useParams, Link, useNavigate } from "react-router-dom";
import { MapPinIcon, TruckIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { getOrderById } from "../../services/order.service";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrders] = useState(null);
  const steps = ["pending", "shipped", "delivered", "cancelled"];
  const currentIndex = steps.indexOf(order?.status);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      const res = await getOrderById(id);
      setOrders(res.data.order);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (!order) return <div className="p-10">Loading...</div>;

  const subtotal = order.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 99;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/user/orders"
        className="text-blue-600 hover:text-blue-700 mb-4 inline-block"
      >
        ← Back to Orders
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Order #{order._id}
            </h1>
            <p className="text-gray-600">
              Placed on {new Date(order.createdAt).toLocaleDateString("en-IN")}
            </p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)} mt-4 sm:mt-0 inline-block`}
          >
            {order.status}
          </span>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Order Tracking</h2>

          <div className="relative">
            {steps.map((step, index) => {
              const historyItem = order.statusHistory?.find(
                (s) => s.status === step,
              );

              const isCompleted = index <= currentIndex;

              return (
                <div key={step} className="flex items-start mb-4">
                  <div
                    className={`shrink-0 w-4 h-4 rounded-full mt-1 ${
                      isCompleted ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>

                  <div className="ml-4 flex-1">
                    <p
                      className={`font-medium capitalize ${
                        isCompleted ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {step}
                    </p>

                    {historyItem ? (
                      <p className="text-sm text-gray-600">
                        {new Date(historyItem.date).toLocaleString("en-IN")}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400">Not updated yet</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => {
                const product = item.product;

                const image =
                  product?.image ||
                  product?.imageUrl ||
                  product?.images?.[0] ||
                  "https://via.placeholder.com/100";

                return (
                  <div
                    key={item._id}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-sm transition bg-gray-50"
                  >
                    <img
                      src={image}
                      alt={product?.name}
                      className="w-24 h-24 object-cover rounded-md border"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-base">
                        {product?.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Quantity:{" "}
                        <span className="font-medium text-gray-700">
                          {item.quantity}
                        </span>
                      </p>

                      {order.status === "delivered" && (
                        <button
                          onClick={() =>
                            navigate(`/user/product/${product._id}?review=true`)
                          }
                          className="mt-3 px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                        >
                          Leave Review
                        </button>
                      )}
                    </div>

                    <div className="text-right min-w-[100px]">
                      <p className="font-semibold text-gray-900 text-lg">
                        ₹{(product?.price * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        ₹{product?.price} each
                      </p>
                    </div>
                  </div>
                );
              })}
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
              <p className="font-medium text-gray-900 mb-1">
                {order.address.name}
              </p>
              <p>{order.address.address}</p>
              <p>
                {order.address.city}, {order.address.state} -{" "}
                {order.address.pincode}
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
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (GST) 18%</span>
                <span>₹{order.tax}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{order.totalAmount}</span>
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
