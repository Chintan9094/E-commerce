import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { createProduct } from "../../services/product.service";
import { toast } from 'react-toastify'

const AddProductPage = () => {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    brand: "",
    stock: "",
    sku: "",
    images: "",
  });

  const fileInputRef = useRef();
  const [images, setImages] = useState([]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const previewImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages(previewImages);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("originalPrice", formData.originalPrice);
    data.append("category", formData.category);
    data.append("brand", formData.brand);
    data.append("stock", formData.stock);
    data.append("sku", formData.sku);

    if (images && images.length > 0) {
      data.append("image", images[0].file);
    }
    const res = await createProduct(data);
    toast.success(res.data.message || "Product added successfully!");

    setFormData({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      category: "",
      brand: "",
      stock: "",
      sku: "",
      images: "",
    });

    setImages([]);

  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};
  return (
    <div>
      <Link
        to="/seller/products"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back to Products
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 lg:p-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <Input
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
              required
            />
          </div>

          <Input
            label="Price (₹)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter selling price"
            required
          />

          <Input
            label="Original Price (₹)"
            name="originalPrice"
            type="number"
            value={formData.originalPrice}
            onChange={handleChange}
            placeholder="Enter original price"
            required
          />

          <Input
            label="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category name"
            required
          />

          <Input
            label="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter brand name"
            required
          />

          <Input
            label="Stock Quantity"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock quantity"
            required
          />

          <Input
            label="SKU (Stock Keeping Unit)"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="Enter SKU"
            required
          />

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <p className="text-gray-600 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500 mb-4">
                PNG, JPG, GIF up to 10MB
              </p>

              <Button
                variant="outline"
                type="button"
                onClick={handleButtonClick}
              >
                Upload Images
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4">
              {images.map((img, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={img.url}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mt-8">
          <Button type="submit" variant="primary" size="lg" className="w-[50%]">
            Add Product
          </Button>
          <Link to="/seller/products" className="w-[50%]">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="w-full"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
