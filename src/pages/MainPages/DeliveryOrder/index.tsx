import MainNavbar from "../../../components/Navbar/MainNavbar";
import { useState } from "react";
import {
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { FaHome } from "react-icons/fa";
import Button from "@mui/material/Button";
import { UserService } from "../../../services/UserService";

interface Variant {
  id: number;
  sku: string;
  variantName: string;
  price: number;
  stock: number;
}

interface Attribute {
  id: number;
  attName: string;
  attValue: string;
}

interface Image {
  id: number;
  imageUrl: string;
  altText: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  salePrice: number;
  stock: number;
  categoryId: number;
  categoryName: string;
  brandId: number;
  brandName: string;
  variants: Variant[];
  attributes: Attribute[];
  images: Image[];
  active: boolean;
}

export default function DeliveryOrder() {
  const [serialNumber, setSerialNumber] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!serialNumber.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await UserService.checkOrder(serialNumber)
      if (res) {
        setProduct(res);
      } else {
        setError("Không lấy được dữ liệu");
        setProduct(null);
      }
    } catch (err: any) {
      console.error(err);
      setError("Lỗi kết nối đến server");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <MainNavbar />
      <div className="max-w-4xl mx-auto p-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-600 mb-6">
          <FaHome size={18} />
          <span>&gt;</span>
          <span>Tra cứu sản phẩm</span>
        </div>

        <Paper className="p-6 mb-6">
          <h1 className="text-2xl font-bold text-center mb-8">
            TRA CỨU THÔNG TIN SẢN PHẨM
          </h1>

          <div className="flex gap-2 mb-4">
            <TextField
              fullWidth
              placeholder="Nhập ID hoặc SKU của sản phẩm"
              variant="outlined"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className="bg-gray-100"
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={loading}
              className="whitespace-nowrap"
            >
              {loading ? "Đang tải..." : "Tra cứu"}
            </Button>
          </div>

          {error && (
            <Typography color="error" className="mb-4">
              {error}
            </Typography>
          )}

          {product && (
            <>
              {/* Thông tin cơ bản */}
              <TableContainer component={Paper} className="border border-gray-200 mb-6">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="font-medium bg-gray-50">ID</TableCell>
                      <TableCell className="font-medium bg-gray-50">Tên</TableCell>
                      <TableCell className="font-medium bg-gray-50">Mô tả</TableCell>
                      <TableCell className="font-medium bg-gray-50">Giá</TableCell>
                      <TableCell className="font-medium bg-gray-50">Giá KM</TableCell>
                      <TableCell className="font-medium bg-gray-50">Tồn kho</TableCell>
                      <TableCell className="font-medium bg-gray-50">Danh mục</TableCell>
                      <TableCell className="font-medium bg-gray-50">Thương hiệu</TableCell>
                      <TableCell className="font-medium bg-gray-50">Active</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>{product.price.toLocaleString()}₫</TableCell>
                      <TableCell>{product.salePrice.toLocaleString()}₫</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.categoryName}</TableCell>
                      <TableCell>{product.brandName}</TableCell>
                      <TableCell>{product.active ? "✓" : "✗"}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Variants */}
              <Typography variant="h6" className="mb-2">
                Các biến thể (Variants)
              </Typography>
              <List dense>
                {product.variants.map((v) => (
                  <ListItem key={v.id}>
                    SKU: {v.sku} — {v.variantName} — Giá:{" "}
                    {v.price.toLocaleString()}₫ — Tồn kho: {v.stock}
                  </ListItem>
                ))}
              </List>
              <Divider className="my-4" />

              {/* Attributes */}
              <Typography variant="h6" className="mb-2">
                Thuộc tính (Attributes)
              </Typography>
              <List dense>
                {product.attributes.map((a) => (
                  <ListItem key={a.id}>
                    {a.attName}: {a.attValue}
                  </ListItem>
                ))}
              </List>
              <Divider className="my-4" />

              {/* Images */}
              <Typography variant="h6" className="mb-2">
                Hình ảnh
              </Typography>
              <div className="grid grid-cols-2 gap-4">
                {product.images.map((img) => (
                  <div key={img.id} className="border p-2">
                    <img
                      src={img.imageUrl}
                      alt={img.altText}
                      className="w-full h-auto"
                    />
                    <Typography variant="caption">{img.altText}</Typography>
                  </div>
                ))}
              </div>
            </>
          )}
        </Paper>
      </div>
    </div>
  );
}
