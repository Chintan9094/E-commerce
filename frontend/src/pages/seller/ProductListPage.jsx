import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import Button from "../../components/common/Button";
import { deleteProduct, getMyProducts } from "../../services/product.service";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [sort, setSort] = useState("");

  const limit = 5;

  const fetchProducts = async () => {
    try {
      const { data } = await getMyProducts({ 
        search: debouncedSearch,
        sort,
        page,
        limit,
      });

      setProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, sort, page]);

  useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 1000);

  return () => clearTimeout(timer);
}, [search]);

  const totalPages = Math.ceil(total / limit);

  const getStatus = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock < 10) return "Low Stock";
    return "Active";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await deleteProduct(deleteId);

      toast.success(res.data.message || "Product deleted successfully!");

      setProducts((prev) => prev.filter((p) => p._id !== deleteId));
      setShowModal(false);
      setDeleteId(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
          <Link to="/seller/products/add">
            <Button variant="primary">
              <PlusIcon className="w-5 h-5 mr-2 inline" />
              Add Product
            </Button>
          </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />

          <select
            value={sort}
            onChange={(e) => {
              setPage(1);
              setSort(e.target.value);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Sort By</option>
            <option value="price-low">Price Low → High</option>
            <option value="price-high">Price High → Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3 text-left">SKU</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Stock</th>
                <th className="px-6 py-3 text-left">Sales</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {products.map((product) => {
                const status = getStatus(product.stock);

                return (
                  <tr key={product._id}>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded"
                      />
                      {product.name}
                    </td>

                    <td className="px-6 py-4">{product.sku || "-"}</td>
                    <td className="px-6 py-4">₹{product.price}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">{product.sales}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          status
                        )}`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="px-6 py-4 flex gap-2">
                      <Link to={`/seller/products/edit/${product._id}`}>
                        <PencilIcon className="w-5 h-5 text-blue-600" />
                      </Link>
                     <TrashIcon
                        onClick={() => openDeleteModal(product._id)}
                        className="w-5 h-5 text-red-600 cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {showModal && (
            <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-[320px] shadow-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Delete Product
                </h2>

                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this product?
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, total)} of {total} products
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>

            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={page === i + 1 ? "primary" : "outline"}
                size="sm"
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;