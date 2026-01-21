import { useEffect, useState } from "react";
import {
  MapPinIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getMyAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../../services/address.service";

const AddressManagementPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await getMyAddresses();
      setAddresses(res.data.addresses || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleOpenModal = (address = null) => {
    if (address) {
      setEditingAddress(address);
      setFormData({ ...address });
    } else {
      setEditingAddress(null);
      setFormData({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        isDefault: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingAddress) {
        const res = await updateAddress(editingAddress._id, formData);
        setAddresses((prev) =>
          prev.map((addr) =>
            addr._id === editingAddress._id ? res.data.address : addr,
          ),
        );
      } else {
        const res = await addAddress(formData);
        setAddresses((prev) => [...prev, res.data.address]);
      }

      handleCloseModal();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    try {
      await deleteAddress(deleteId);
      setAddresses((prev) => prev.filter((addr) => addr._id !== deleteId));
      closeDeleteModal();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {from && (
        <button
          onClick={() => {
            if (from === "checkout") navigate("/user/checkout");
            if (from === "profile") navigate("/user/profile");
          }}
          className="mb-4 text-blue-600 font-medium hover:underline"
        >
          ← Back to {from === "checkout" ? "Checkout" : "Profile"}
        </button>
      )}

      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Addresses</h1>
        <Button onClick={() => handleOpenModal()}>
          <PlusIcon className="w-5 h-5 mr-2 inline" />
          Add New Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address._id}
            className="bg-white p-6 border rounded-lg shadow"
          >
            <div className="flex justify-between mb-3">
              <div className="flex items-center">
                <MapPinIcon className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-semibold">{address.name}</h3>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleOpenModal(address)}>
                  <PencilIcon className="w-5 h-5 text-blue-600" />
                </button>
                <button onClick={() => openDeleteModal(address._id)}>
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>

            <p>{address.address}</p>
            <p>
              {address.city}, {address.state} - {address.pincode}
            </p>
            <p>Phone: {address.phone}</p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingAddress ? "Edit Address" : "Add Address"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <Input
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <Input
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <Input
            label="Pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />

          <div className="flex gap-4">
            <Button type="submit">{editingAddress ? "Update" : "Add"}</Button>
            <Button
              variant="secondary"
              type="button"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete Address"
      >
        <p className="mb-6">Are you sure you want to delete this address?</p>
        <div className="flex gap-4">
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AddressManagementPage;
