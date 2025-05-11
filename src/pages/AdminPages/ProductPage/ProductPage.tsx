import { useState, useEffect } from "react";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import VariantsAttribute from "./VariantsAttribute";
import { ProductService } from "../../../services/ProductService";
import { Product } from "../../../models/Product";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showDeleteProduct, setShowDeleteProduct] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
        // Gọi API soft-delete
        await ProductService.softDeleteProduct(selectedProduct.id);

        // Cập nhật danh sách sản phẩm (không loại bỏ khỏi danh sách)
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === selectedProduct.id
              ? { ...product, active: false }
              : product
          )
        );
        handleCloseDeleteProduct();
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };
  const handleRestore = async (productId: number) => {
    try {
      await ProductService.restoreProduct(productId);
      const updatedProducts = await ProductService.fetchProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Lỗi khi phục hồi sản phẩm:", error);
    }
  };

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };
  const handleCloseDetail = () => {
    setShowProductDetail(false);
    setSelectedProduct(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Danh Sách Sản Phẩm</h1>
        <button
          onClick={handleAddProduct}
          className="bg-white text-black px-4 py-2 rounded-lg border border-gray-600 font-bold hover:bg-gray-200 transition duration-300"
        >
          Thêm Sản Phẩm
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
          token="your-token-value"
        />
      )}
      {showDeleteProduct && selectedProduct && (
        <DeleteProduct
          handleClose={handleCloseDeleteProduct}
          handleDelete={handleConfirmDeleteProduct}
        />
      )}
      {showProductDetail && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg relative">
            <button
              onClick={handleCloseDetail}
              className="absolute top-2 right-4 text-xl font-bold text-gray-600 hover:text-red-500"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
              Chi Tiết Sản Phẩm
            </h2>
            <VariantsAttribute product={selectedProduct} />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Tên Sản Phẩm</th>
              <th className="py-2 px-4 border">Mô Tả</th>
              <th className="py-2 px-4 border">Giá</th>
              <th className="py-2 px-4 border">Giá KM</th>
              <th className="py-2 px-4 border">Số Lượng</th>
              <th className="py-2 px-4 border">Trạng Thái</th>
              <th className="py-2 px-4 border">Thương Hiệu</th>
              <th className="py-2 px-4 border">Danh Mục</th>
              <th className="py-2 px-4 border">Thao Tác</th>
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
                <td className="py-2 px-4 border">
                  {product.active ? (
                    <span className="text-green-500">Còn Hàng</span>
                  ) : (
                    <span className="text-red-500">Hết Hàng</span>
                  )}
                </td>
                <td className="py-2 px-4 border">{product.brandId} </td>
                <td className="py-2 px-4 border">{product.categoryId}</td>
                <td className="py-2 px-4 border text-center">
                  <div className="flex justify-center gap-2">
                    {product.active ? (
                      <>
                        <button
                          onClick={() => handleViewDetail(product)}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          Chi Tiết
                        </button>
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Xóa
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleRestore(product.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Phục hồi
                      </button>
                    )}
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
