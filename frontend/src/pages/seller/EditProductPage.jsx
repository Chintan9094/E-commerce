import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { getProductById, updateProduct } from "../../services/product.service";
import { toast } from "react-toastify";

const EditProductPage = () => {
  const { id } = useParams();
  const fileInputRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    brand: "",
    stock: "",
    sku: "",
    images: null,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getProductById(id);
        setFormData({
          name: data.product.name,
          description: data.product.description,
          price: data.product.price,
          originalPrice: data.product.originalPrice,
          category: data.product.category,
          brand: data.product.brand,
          stock: data.product.stock,
          sku: data.product.sku,
          image: null,
        });

        setPreview(data.product.image);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      for (let key in formData) {
        if (formData[key]) {
          data.append(key, formData[key]);
        }
      }

      await updateProduct(id, data);
      toast.success("Product updated successfully");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
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

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Product</h1>

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
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
          />

          <Input
            label="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter brand name"
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
              Product Image
            </label>

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
                Upload Image
              </Button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-32 h-32 object-cover mt-4 rounded"
              />
            )}
          </div>
        </div>

        <div className="flex space-x-4 mt-8">
          <Button type="submit" variant="primary" size="lg">
            Update Product
          </Button>
          <Link to="/seller/products">
            <Button type="button" variant="secondary" size="lg">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
