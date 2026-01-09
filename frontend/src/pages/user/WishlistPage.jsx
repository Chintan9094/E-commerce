import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import Button from '../../components/common/Button';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      productId: 1,
      name: 'Wireless Headphones',
      price: 2999,
      originalPrice: 3999,
      image: 'https://via.placeholder.com/200x200?text=Headphones',
      inStock: true,
      isWishlisted: true,
    },
    {
      id: 2,
      productId: 2,
      name: 'Smart Watch',
      price: 8999,
      originalPrice: 12999,
      image: 'https://via.placeholder.com/200x200?text=Smart+Watch',
      inStock: true,
      isWishlisted: true,
    },
    {
      id: 3,
      productId: 3,
      name: 'Laptop Backpack',
      price: 1499,
      originalPrice: 1999,
      image: 'https://via.placeholder.com/200x200?text=Backpack',
      inStock: false,
      isWishlisted: true,
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <HeartOutlineIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-600 mb-8">Start adding items you love!</p>
        <Link to="/user/products">
          <Button variant="primary">Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group relative">
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
            >
              <HeartIcon className="w-5 h-5 text-red-500" />
            </button>

            <Link to={`/user/product/${item.productId}`}>
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {item.name}
                </h3>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xl font-bold text-gray-900">
                    ₹{item.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹{item.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-green-600 font-semibold">
                    {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                  </span>
                </div>
                <p className={`text-sm mb-3 ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {item.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </Link>

            <div className="px-4 pb-4">
              <Button
                variant="primary"
                size="sm"
                className="w-full flex items-center justify-center"
                disabled={!item.inStock}
              >
                <ShoppingCartIcon className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
