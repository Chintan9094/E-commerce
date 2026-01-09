import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HeartIcon, ShoppingCartIcon, StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import Button from '../../components/common/Button';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = {
    id: id,
    name: 'Wireless Headphones - Premium Edition',
    price: 2999,
    originalPrice: 3999,
    images: [
      'https://via.placeholder.com/600x600?text=Headphone+1',
      'https://via.placeholder.com/600x600?text=Headphone+2',
      'https://via.placeholder.com/600x600?text=Headphone+3',
      'https://via.placeholder.com/600x600?text=Headphone+4',
    ],
    rating: 4.5,
    reviews: 120,
    brand: 'TechBrand',
    description: 'Premium wireless headphones with noise cancellation, 30-hour battery life, and crystal clear sound quality. Perfect for music lovers and professionals.',
    features: [
      'Active Noise Cancellation',
      '30 Hour Battery Life',
      'Quick Charge (5 min = 3 hours)',
      'Wireless Range: 30 feet',
      'Comfortable Over-Ear Design',
      'Bluetooth 5.0',
    ],
    stock: 50,
    inStock: true,
  };

  const reviews = [
    {
      id: 1,
      user: 'John Doe',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excellent sound quality and very comfortable to wear for long hours.',
    },
    {
      id: 2,
      user: 'Jane Smith',
      rating: 4,
      date: '2024-01-10',
      comment: 'Great product, battery lasts really long as advertised.',
    },
    {
      id: 3,
      user: 'Mike Johnson',
      rating: 5,
      date: '2024-01-05',
      comment: 'Best headphones I have ever purchased. Highly recommend!',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm mb-6">
        <Link to="/user" className="text-gray-500 hover:text-gray-700">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/user/products" className="text-gray-500 hover:text-gray-700">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                }`}
              >
                <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-blue-600 font-semibold mb-2">{product.brand}</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-2">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-xl text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span className="text-green-600 font-semibold">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
              </span>
            </div>
            <p className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Key Features</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-2">Quantity</label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-6 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="primary"
              size="lg"
              className="flex-1 flex items-center justify-center"
              disabled={!product.inStock}
            >
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              {isWishlisted ? (
                <HeartIcon className="w-5 h-5 text-red-500" />
              ) : (
                <HeartOutlineIcon className="w-5 h-5" />
              )}
            </Button>
          </div>

          <div className="mt-6">
            <Link to="/user/checkout">
              <Button variant="success" size="lg" className="w-full" disabled={!product.inStock}>
                Buy Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold">{review.user}</h4>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-600 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
