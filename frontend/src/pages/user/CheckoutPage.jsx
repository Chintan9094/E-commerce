import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPinIcon, TruckIcon } from "@heroicons/react/24/outline";
import Button from "../../components/common/Button";
import { getMyAddresses } from "../../services/address.service";
import { getMyCart } from "../../services/cart.service";
import { toast } from "react-toastify";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../../services/payment.service";
import { placeOrder } from "../../services/order.service";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [paymentType, setPaymentType] = useState("online");

  useEffect(() => {
    fetchAddresses();
    fetchCart();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await getMyAddresses();
      const data = res.data.addresses || [];
      setAddresses(data);

      const defaultAddr = data.find((a) => a.isDefault);
      if (defaultAddr) setSelectedAddress(defaultAddr._id);
      else if (data.length > 0) setSelectedAddress(data[0]._id);
    } catch (err) {
      console.error("Address fetch error:", err);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await getMyCart();
      setCartItems(res.data?.cart.items || []);
    } catch (err) {
      console.error("Cart fetch error:", err);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const shipping = subtotal > 5000 ? 0 : 99;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select address");
      return;
    }

    try {
      const orderRes = await placeOrder({ addressId: selectedAddress, paymentMethod: paymentType });
      const order = orderRes.data.order;
      const orderId = order._id;

    if (paymentType === "cod") {
      toast.success("Order placed successfully");
      navigate("/user/order-success", {
        state: { orderId },
      });
      return;
    }

      const paymentRes = await createRazorpayOrder(orderId);
      const paymentData = paymentRes.data;

      const options = {
        key: paymentData.key,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: "ShopHub",
        description: "Order Payment",
        order_id: paymentData.razorpayOrderId,

        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },

        handler: async function (response) {
          try {
            const verifyRes = await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId,
            });

            if (verifyRes.data.success) {
              toast.success("Payment successful");
              navigate("/user/order-success",{
                state: { orderId }
              });
            } else {
              toast.error("Payment verification failed");
            }
          } catch {
            toast.error("Verification error");
          }
        },

        theme: { color: "#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Order failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <MapPinIcon className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold">Delivery Address</h2>
            </div>

            <div className="space-y-4">
              {addresses.map((address) => (
                <label
                  key={address._id}
                  className={`flex p-4 border-2 rounded-lg cursor-pointer ${
                    selectedAddress === address._id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    checked={selectedAddress === address._id}
                    onChange={() => setSelectedAddress(address._id)}
                    className="mt-1 mr-3"
                  />
                  <div>
                    <h3 className="font-semibold">{address.name}</h3>
                    <p className="text-sm text-gray-600">{address.address}</p>
                    <p className="text-sm text-gray-600">
                      {address.city}, {address.state}
                    </p>
                  </div>
                </label>
              ))}
              <div className="mt-4">
                <Link to="/user/addresses" state={{ from: "checkout" }}>
                  <Button variant="outline" size="sm">
                    + Add New Address
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Payment Option</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setPaymentType("online")}
                className={`p-5 border-2 rounded-lg cursor-pointer text-center ${
                  paymentType === "online"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                Online Payment
                <p className="text-sm text-gray-500 mt-1">
                  Card / Netbanking / Wallet via Razorpay
                </p>
              </div>

              <div
                onClick={() => setPaymentType("cod")}
                className={`p-5 border-2 rounded-lg cursor-pointer text-center ${
                  paymentType === "cod"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                Cash on Delivery
                <p className="text-sm text-gray-500 mt-1">
                  Pay when order arrives
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow sticky top-24">
          <div className="flex items-center mb-4">
            <TruckIcon className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold">Order Summary</h2>
          </div>

          <div className="space-y-2 mb-4">
            {cartItems.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>{item.product.name}</span>
                <span>₹{item.product.price * item.quantity}</span>
              </div>

            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (GST) 18%</span>
                <span>₹{tax}</span>
              </div>
            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-bold">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <Button onClick={handlePlaceOrder} className="w-full mt-6">
            {paymentType === "cod" ? "Place Order" : "Pay & Place Order"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
