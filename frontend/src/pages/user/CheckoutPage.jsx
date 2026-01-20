import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPinIcon,
  CreditCardIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { getMyAddresses } from "../../services/address.service";
import { getMyCart } from "../../services/cart.service";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchAddresses();
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

  useEffect(() => {
    fetchAddresses();
    fetchCart();
  }, []);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <MapPinIcon className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">
                Delivery Address
              </h2>
            </div>

            <div className="space-y-4 mb-4">
              {addresses.map((address) => (
                <label
                  key={address._id}
                  className={`flex items-start p-4 border-2 rounded-lg cursor-pointer ${
                    selectedAddress === address._id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    value={address._id}
                    checked={selectedAddress === address._id}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    className="mt-1 mr-3"
                  />

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{address.name}</h3>
                      {address.isDefault && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{address.address}</p>
                    <p className="text-gray-600 text-sm">
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Phone: {address.phone}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            <Link to="/user/addresses">
              <Button variant="outline" size="sm">
                Add New Address
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <CreditCardIcon className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">
                Payment Method
              </h2>
            </div>

            <div className="space-y-3">
              <label
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${
                  paymentMethod === "card"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <h3 className="font-semibold">Credit/Debit Card</h3>
                  <p className="text-sm text-gray-600">
                    Pay securely with your card
                  </p>
                </div>
              </label>

              <label
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${
                  paymentMethod === "upi"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <h3 className="font-semibold">UPI</h3>
                  <p className="text-sm text-gray-600">Pay using UPI apps</p>
                </div>
              </label>

              <label
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${
                  paymentMethod === "cod"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <h3 className="font-semibold">Cash on Delivery</h3>
                  <p className="text-sm text-gray-600">Pay when you receive</p>
                </div>
              </label>
            </div>

            {paymentMethod === "card" && (
              <div className="mt-6 space-y-4">
                <Input label="Card Number" placeholder="1234 5678 9012 3456" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Expiry Date" placeholder="MM/YY" />
                  <Input label="CVV" placeholder="123" type="password" />
                </div>
                <Input label="Cardholder Name" placeholder="John Doe" />
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <div className="flex items-center mb-4">
              <TruckIcon className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
            </div>

            <div className="space-y-3 mb-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-medium">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                 <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (GST) 18%</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              {subtotal < 5000 && (
                <div className="text-sm text-green-600">
                  Add ₹{(5000 - subtotal).toLocaleString()} more for free shipping!
                </div>
              )}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <Link to="/user/order-success" className="block">
              <Button variant="primary" size="lg" className="w-full">
                Place Order
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
