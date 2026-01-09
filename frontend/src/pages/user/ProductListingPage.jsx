import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FunnelIcon } from '@heroicons/react/24/outline';

const ProductListingPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 2999,
      originalPrice: 3999,
      image: 'https://via.placeholder.com/300x300?text=Headphones',
      rating: 4.5,
      reviews: 120,
      brand: 'TechBrand'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 8999,
      originalPrice: 12999,
      image: 'https://via.placeholder.com/300x300?text=Smart+Watch',
      rating: 4.8,
      reviews: 89,
      brand: 'TechBrand'
    },
    {
      id: 3,
      name: 'Laptop Backpack',
      price: 1499,
      originalPrice: 1999,
      image: 'https://via.placeholder.com/300x300?text=Backpack',
      rating: 4.3,
      reviews: 156,
      brand: 'FashionBrand'
    },
    {
      id: 4,
      name: 'Bluetooth Speaker',
      price: 2499,
      originalPrice: 3499,
      image: 'https://via.placeholder.com/300x300?text=Speaker',
      rating: 4.6,
      reviews: 203,
      brand: 'TechBrand'
    },
    {
      id: 5,
      name: 'Running Shoes',
      price: 3499,
      originalPrice: 4999,
      image: 'https://via.placeholder.com/300x300?text=Shoes',
      rating: 4.7,
      reviews: 342,
      brand: 'SportBrand'
    },
    {
      id: 6,
      name: 'Gaming Mouse',
      price: 1999,
      originalPrice: 2999,
      image: 'https://via.placeholder.com/300x300?text=Mouse',
      rating: 4.4,
      reviews: 278,
      brand: 'TechBrand'
    },
    {
      id: 7,
      name: 'Coffee Maker',
      price: 5499,
      originalPrice: 7999,
      image: 'https://via.placeholder.com/300x300?text=Coffee',
      rating: 4.9,
      reviews: 156,
      brand: 'HomeBrand'
    },
    {
      id: 8,
      name: 'Yoga Mat',
      price: 999,
      originalPrice: 1499,
      image: 'https://via.placeholder.com/300x300?text=Yoga+Mat',
      rating: 4.2,
      reviews: 189,
      brand: 'SportBrand'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="popular">Sort by: Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="newest">Newest</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FunnelIcon className="w-5 h-5 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        <aside
          className={`${
            showFilters ? 'block' : 'hidden'
          } lg:block w-64 shrink-0 bg-white p-6 rounded-lg shadow-md h-fit sticky top-24`}
        >
          <h3 className="font-semibold text-lg mb-4">Filters</h3>

          <div className="mb-6">
            <h4 className="font-medium mb-3">Price Range</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>₹0 - ₹1000</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>₹1000 - ₹5000</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>₹5000 - ₹10000</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Above ₹10000</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-3">Brand</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>TechBrand</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>FashionBrand</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>SportBrand</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>HomeBrand</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-3">Rating</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>4★ & above</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>3★ & above</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>2★ & above</span>
              </label>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Apply Filters
          </button>
        </aside>

        <div className="flex-1">
          <div className="mb-4 text-sm text-gray-600">
            Showing {products.length} products
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
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
                  <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
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

          <div className="mt-8 flex justify-center space-x-2">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Previous</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">2</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">3</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
