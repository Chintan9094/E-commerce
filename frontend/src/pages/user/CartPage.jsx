import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import Button from '../../components/common/Button';
import { getMyCart, removeFromCart, updateCartQuantity } from '../../services/cart.service';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getMyCart()
        setCartItems(res.data?.cart.items || []);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false)
      }
    }
    fetchCart();
  }, []);

  if (loading) return <div className="p-10">Loading...</div>;

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
  
    try {
      await updateCartQuantity(productId, newQuantity);

      setCartItems(prev =>
        prev.map(item =>
          item.product._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error("Quantity update failed:", error);
    }
  };

  const removeItem = async (productId) => {
    try {
      await removeFromCart(productId);
  
      setCartItems(prev =>
        prev.filter(item => item.product._id !== productId)
      );
    } catch (error) {
      console.error("Remove item failed:", error);
    }
  };
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 99;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some products to get started!</p>
        <Link to="/user/products">
          <Button variant="primary">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row gap-4"
            >
              <Link to={`/user/product/${item.product.productId}`} className="shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full sm:w-32 h-32 object-cover rounded-lg"
                />
              </Link>

              <div className="flex-1">
                <Link to={`/user/product/${item.product.productId}`}>
                  <h3 className="font-semibold text-gray-900 hover:text-blue-600 mb-2">
                    {item.product.name}
                  </h3>
                </Link>
                <p className="text-xl font-bold text-gray-900 mb-4">
                  ₹{item.product.price}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100"
                      disabled={item.quantity >= item.stock}
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
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

            <Link to="/user/checkout" className="block">
              <Button variant="primary" size="lg" className="w-full">
                Proceed to Checkout
              </Button>
            </Link>

            <Link to="/user/products" className="block mt-4">
              <Button variant="outline" size="lg" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
