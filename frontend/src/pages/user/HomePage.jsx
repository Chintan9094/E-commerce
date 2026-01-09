import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  const categories = [
    { id: 1, name: 'Electronics', image: '📱', count: 150 },
    { id: 2, name: 'Fashion', image: '👕', count: 200 },
    { id: 3, name: 'Home & Kitchen', image: '🏠', count: 120 },
    { id: 4, name: 'Books', image: '📚', count: 80 },
    { id: 5, name: 'Sports', image: '⚽', count: 90 },
    { id: 6, name: 'Toys', image: '🧸', count: 60 },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 2999,
      originalPrice: 3999,
      image: 'https://via.placeholder.com/300x300?text=Headphones',
      rating: 4.5,
      reviews: 120
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 8999,
      originalPrice: 12999,
      image: 'https://via.placeholder.com/300x300?text=Smart+Watch',
      rating: 4.8,
      reviews: 89
    },
    {
      id: 3,
      name: 'Laptop Backpack',
      price: 1499,
      originalPrice: 1999,
      image: 'https://via.placeholder.com/300x300?text=Backpack',
      rating: 4.3,
      reviews: 156
    },
    {
      id: 4,
      name: 'Bluetooth Speaker',
      price: 2499,
      originalPrice: 3499,
      image: 'https://via.placeholder.com/300x300?text=Speaker',
      rating: 4.6,
      reviews: 203
    },
  ];

  return (
    <div>
      <section className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to ShopHub
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover amazing products at unbeatable prices
            </p>
            <Link
              to="/user/products"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Shop Now
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to="/user/products"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
              >
                <div className="text-4xl mb-2">{category.image}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{category.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link
              to="/user/products"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
            >
              View All
              <ArrowRightIcon className="ml-1 w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/user/product/${product.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-green-600 font-semibold">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
