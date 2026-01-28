import { useEffect, useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { getProfile, updateProfile } from "../../services/auth.service";
import { toast } from "react-toastify";

const SellerProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [shopData, setShopData] = useState({
    name: "",
    shopName: "",
    email: "",
    phone: "",
    gstNo: "",
    dob: "",
    gender: "",
  });

  const [originalData, setOriginalData] = useState({
    name: "",
    shopName: "",
    email: "",
    phone: "",
    gstNo: "",
    dob: "",
    gender: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await getProfile();
        setShopData(res.data.user);
        console.log(res.data.user);
        setOriginalData(res.data.user);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    setShopData({ ...shopData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile(shopData);
      setShopData(res.data.user);
      setOriginalData(res.data.user);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Seller Profile</h1>

      <div className="bg-white rounded-lg shadow-md p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Shop Information
          </h2>
          {!isEditing && (
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Name"
              name="name"
              value={shopData.name}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />

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

            <Input
              label="GSTIN"
              name="gstNo"
              value={shopData.gstNo}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <Input
              label="Date of Birth"
              name="dob"
              type="date"
              value={shopData.dob ? shopData.dob.split("T")[0] : ""}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={shopData.gender}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {isEditing && (
            <div className="flex space-x-4 mt-6">
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setShopData(originalData);
                  setIsEditing(false);
                }}
              >
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
