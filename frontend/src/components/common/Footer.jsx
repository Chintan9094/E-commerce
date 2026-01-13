import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">ShopHub</h3>
            <p className="text-sm">
              Your one-stop shop for all your needs. Quality products, great prices, fast delivery.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/user" className="hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/user/products" className="hover:text-white">Products</Link>
              </li>
              <li>
                <Link to="/user/about" className="hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/user/contact" className="hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/user/help" className="hover:text-white">Help Center</Link>
              </li>
              <li>
                <Link to="/user/returns" className="hover:text-white">Returns</Link>
              </li>
              <li>
                <Link to="/user/shipping" className="hover:text-white">Shipping Info</Link>
              </li>
              <li>
                <Link to="/user/faq" className="hover:text-white">FAQ</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: chintandesai249@gmail.com</li>
              <li>Phone: +91 7600686067</li>
              <li>
                <div className="flex space-x-4 mt-4">
                  <a href="https://github.com/Chintan9094" className="hover:text-white">GitHub</a>
                  <a href="https://www.linkedin.com/in/chintan-rabari-a54a712b9/" className="hover:text-white">LinkedIn</a>
                  <a href="https://x.com/@Chintandesai94" className="hover:text-white">Twitter</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
