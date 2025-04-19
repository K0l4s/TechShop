import { useState, useEffect } from "react";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { ProductService } from "../../../services/ProductService";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  stock: number;
  active: boolean;
  categoryId: number;
  brandId: number;
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showDeleteProduct, setShowDeleteProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.fetchProducts();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = () => setShowAddProduct(true);
  const handleCloseAddProduct = () => setShowAddProduct(false);
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowEditProduct(true);
  };
  const handleCloseEditProduct = () => {
    setShowEditProduct(false);
    setSelectedProduct(null);
  };
  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteProduct(true);
  };
  const handleCloseDeleteProduct = () => {
    setShowDeleteProduct(false);
    setSelectedProduct(null);
  };

  const handleConfirmDeleteProduct = async () => {
    if (selectedProduct) {
      try {
        await ProductService.deleteProduct(selectedProduct.id);
        setProducts(products.filter((p) => p.id !== selectedProduct.id));
        setShowDeleteProduct(false);
        setSelectedProduct(null);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Danh Sách Sản Phẩm</h1>
        <button
          onClick={handleAddProduct}
          className="bg-white text-black px-4 py-2 rounded-lg border border-gray-600 font-bold hover:bg-gray-200 transition duration-300"
        >
          + Sản Phẩm
        </button>
      </div>

      {showAddProduct && (
        <AddProduct
          handleClose={handleCloseAddProduct}
          setProducts={setProducts}
        />
      )}
      {showEditProduct && selectedProduct && (
        <EditProduct
          handleClose={handleCloseEditProduct}
          product={selectedProduct}
          setProducts={setProducts}
        />
      )}
      {showDeleteProduct && selectedProduct && (
        <DeleteProduct
          handleClose={handleCloseDeleteProduct}
          handleDelete={handleConfirmDeleteProduct}
        />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border font-normal">ID</th>
              <th className="py-2 px-4 border font-normal">Tên Sản Phẩm</th>
              <th className="py-2 px-4 border font-normal">Mô Tả</th>
              <th className="py-2 px-4 border font-normal">Giá</th>
              <th className="py-2 px-4 border font-normal">Giá Khuyến Mãi</th>
              <th className="py-2 px-4 border font-normal">Số Lượng</th>
              <th className="py-2 px-4 border font-normal">Danh Mục</th>
              <th className="py-2 px-4 border font-normal">Thương Hiệu</th>
              <th className="py-2 px-4 border font-normal">Đang Bán</th>
              <th className="py-2 px-4 border font-normal">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border">{product.id}</td>
                <td className="py-2 px-4 border">{product.name}</td>
                <td className="py-2 px-4 border">{product.description}</td>
                <td className="py-2 px-4 border">
                  {product.price.toLocaleString("vi-VN")} VND
                </td>
                <td className="py-2 px-4 border">
                  {product.salePrice
                    ? product.salePrice.toLocaleString("vi-VN") + " VND"
                    : "Không"}
                </td>
                <td className="py-2 px-4 border">{product.stock}</td>
                <td className="py-2 px-4 border">{product.categoryId}</td>
                <td className="py-2 px-4 border">{product.brandId}</td>
                <td className="py-2 px-4 border">
                  {product.active ? "✅ Đang bán" : "❌ Ngừng bán"}
                </td>
                <td className="py-2 px-4 border text-center">
                  <div className="flex justify-center gap-6">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product)}
                      className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductPage;
