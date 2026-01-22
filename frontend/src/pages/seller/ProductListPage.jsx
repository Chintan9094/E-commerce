import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import Button from "../../components/common/Button";
import { getMyProducts } from "../../services/product.service";
import { useEffect, useState } from "react";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const limit = 5;

  const fetchProducts = async () => {
    try {
      const { data } = await getMyProducts({ 
        search,
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
  }, [search, sort, page]);

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
            className="px-4 py-2 border rounded-lg"
          />

          <select
            value={sort}
            onChange={(e) => {
              setPage(1);
              setSort(e.target.value);
            }}
            className="px-4 py-2 border rounded-lg"
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3">SKU</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Sales</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
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
                      <TrashIcon className="w-5 h-5 text-red-600 cursor-pointer" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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