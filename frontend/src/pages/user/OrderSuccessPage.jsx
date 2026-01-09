import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Button from '../../components/common/Button';

const OrderSuccessPage = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-2">Thank you for your order</p>
        <p className="text-sm text-gray-500 mb-8">
          Your order ID is: <span className="font-semibold text-gray-900">#ORD123456</span>
        </p>
        <p className="text-gray-600 mb-8">
          You will receive an email confirmation shortly with order details and tracking information.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/user/orders">
            <Button variant="primary" size="lg">View Orders</Button>
          </Link>
          <Link to="/user/products">
            <Button variant="outline" size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
