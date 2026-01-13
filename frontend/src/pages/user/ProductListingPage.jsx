import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FunnelIcon } from "@heroicons/react/24/outline";
import {
  getProducts,
  getProductsByQuery,
} from "../../services/product.service";

const ProductListingPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [productData, setProductData] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const updateQuery = (key, value) => {
    const params = new URLSearchParams(location.search);

    if (value) params.set(key, value);
    else params.delete(key);

    navigate(`/user/products?${params.toString()}`);
  };

  useEffect(() => {
    const paramsObj = Object.fromEntries(new URLSearchParams(location.search));

    const fetchProducts = async () => {
      try {
        let res;

        if (Object.keys(paramsObj).length === 0) {
          res = await getProducts();
        } else {
          res = await getProductsByQuery(paramsObj);
        }

        setProductData(res.data.products);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [location.search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>

        <div className="flex items-center space-x-4">
          <select
            onChange={(e) => updateQuery("sort", e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Sort</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center px-4 py-2 border rounded-lg"
          >
            <FunnelIcon className="w-5 h-5 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        <aside
          className={`${
            showFilters ? "block" : "hidden"
          } lg:block w-56 bg-white p-4 rounded-lg shadow-md sticky top-24 self-start`}
        >
          <h3 className="font-semibold text-lg mb-4">Filters</h3>

          <div className="mb-6">
            <h4 className="font-medium mb-3">Price</h4>

            {["0-1000", "1000-5000", "5000-10000"].map((range) => (
              <label key={range} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    e.target.checked
                      ? updateQuery("price", range)
                      : updateQuery("price", null)
                  }
                  className="mr-2"
                />
                <span>₹{range.replace("-", " - ₹")}</span>
              </label>
            ))}
          </div>

          <div>
            <h4 className="font-medium mb-3">Rating</h4>

            {[4, 3, 2].map((val) => (
              <label key={val} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    e.target.checked
                      ? updateQuery("rating", String(val))
                      : updateQuery("rating", null)
                  }
                  className="mr-2"
                />
                <span>{val}★ & above</span>
              </label>
            ))}
          </div>
        </aside>

        <div className="flex-1">
          <p className="mb-4 text-gray-600">
            Showing {productData.length} products
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productData.map((product) => (
              <Link
                key={product._id}
                to={`/user/product/${product._id}`}
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
                      {product.averageRating} ({product.numReviews})
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
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % off
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
