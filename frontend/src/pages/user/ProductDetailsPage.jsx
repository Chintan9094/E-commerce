import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  HeartIcon,
  ShoppingCartIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import Button from "../../components/common/Button";
import { getProductById } from "../../services/product.service";
import { addToCart } from "../../services/cart.service";
import { toast } from "react-toastify";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!product) return <div className="p-10">Product not found</div>;

  const rating = product.averageRating || 0;
  const reviewsCount = product.numReviews || 0;
  const reviews = product.reviews || [];

  const addInCart = async (product) => {
    try {
      await addToCart(product._id, quantity);
  
      setCartItems(prev => {
        const exists = prev.find(item => item.product._id === product._id);
  
        if (exists) {
          return prev.map(item =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
  
        return [...prev, { product, quantity }];
      });
  
      setQuantity(1);
      toast.success(`${product.name} added to cart`);
  
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };  

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-sm mb-6">
        <Link to="/user" className="text-gray-500 hover:text-gray-700">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/user/products" className="text-gray-500 hover:text-gray-700">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div>
          <p className="text-blue-600 font-semibold mb-2 capitalize">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {rating.toFixed(1)} ({reviewsCount} reviews)
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-2">
              <span className="text-3xl font-bold">₹{product.price}</span>
              <span className="text-xl line-through text-gray-500">
                ₹{product.originalPrice}
              </span>
              <span className="text-green-600 font-semibold">
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100,
                )}
                % off
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-2">Quantity</label>
            <div className="flex items-center border rounded-lg w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2"
              >
                -
              </button>
              <span className="px-6">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button onClick={() => addInCart(product)} className="flex-1 flex items-center justify-center">
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>

            <Button
              variant="outline"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              {isWishlisted ? (
                <HeartIcon className="w-5 h-5 text-red-500" />
              ) : (
                <HeartOutlineIcon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        {reviews.map((review, index) => (
          <div key={index} className="border-b pb-6">
            <h4 className="font-semibold">{review.name}</h4>
            <p className="text-gray-600">{review.comment}</p>
            <p className="text-sm text-gray-400">
              {new Date(review.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
