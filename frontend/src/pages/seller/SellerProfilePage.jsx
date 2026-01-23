import { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const SellerProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [shopData, setShopData] = useState({
    shopName: 'Tech Store',
    email: 'seller@example.com',
    phone: '+91 9876543210',
    address: '123 Shop Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    gstin: 'GSTIN123456789',
    description: 'Your trusted tech store for all electronics needs.',
  });

  const handleChange = (e) => {
    setShopData({ ...shopData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Seller Profile</h1>

      <div className="bg-white rounded-lg shadow-md p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Shop Information</h2>
          {!isEditing && (
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input
                label="Shop Name"
                name="shopName"
                value={shopData.shopName}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <Input
              label="Email"
              name="email"
              type="email"
              value={shopData.email}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />

            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={shopData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />

            <div className="md:col-span-2">
              <Input
                label="Address"
                name="address"
                value={shopData.address}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <Input
              label="City"
              name="city"
              value={shopData.city}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />

            <Input
              label="State"
              name="state"
              value={shopData.state}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />

            <Input
              label="Pincode"
              name="pincode"
              value={shopData.pincode}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />

            <Input
              label="GSTIN"
              name="gstin"
              value={shopData.gstin}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shop Description
              </label>
              <textarea
                name="description"
                value={shopData.description}
                onChange={handleChange}
                disabled={!isEditing}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex space-x-4 mt-6">
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
              <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SellerProfilePage;
