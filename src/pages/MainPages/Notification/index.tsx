import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Box,
} from "@mui/material";
import { FaHome } from "react-icons/fa";
import MainNavbar from "../../../components/Navbar/MainNavbar";
import { UserService } from "../../../services/UserService";

type ShippingMethod = {
  id: number;
  name: string;
  costPerKm: number;
};

type OrderItem = {
  id: number;
  productId: number;
  productName: string;
  productImage: string | null;
  productPrice: number;
  productSalePrice: number;
  quantity: number;
  unitPrice: number;
  reviewed: boolean;
};

type Order = {
  id: number;
  status: string;
  totalPrice: number;
  shippingFee: number;
  shippingAddr: string;
  shippingMethod: ShippingMethod;
  discountCode: string | null;
  createdAt: string;
  items: OrderItem[];
};

type OrdersResponse = {
  items: Order[];
  currentPage: number;
  totalPages: number;
};

export default function OrderList() {
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
     
      const res = await UserService.getAllNotification(status, page)

      if (res) {
        const body: OrdersResponse = res;
        setOrders(body.items);
        setTotalPages(body.totalPages);
      } else {
        setError("Không tải được đơn hàng");
      }
    } catch (err: any) {
      console.error(err);
      setError("Lỗi kết nối đến server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status, page]);

  return (
    <div className="min-h-screen bg-white">
      <MainNavbar />
      <div className="max-w-5xl mx-auto p-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-600 mb-6">
          <FaHome size={18} />
          <span>&gt;</span>
          <span>Đơn hàng</span>
        </div>

        <Paper className="p-6 mb-6">
          <Box className="flex flex-wrap items-center gap-4 mb-4">
            <FormControl variant="outlined" size="small">
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={status}
                onChange={(e) => {
                  setPage(0);
                  setStatus(e.target.value);
                }}
              >
                {[
                  "ALL",
                  "PENDING",
                  "CONFIRMED",
                  "PROCESSING",
                  "DELIVERING",
                  "DELIVERED",
                  "CANCELED",
                ].map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="body2">
              Trang {page + 1} / {totalPages}
            </Typography>

            <Box className="ml-auto flex gap-2">
              <Button
                variant="outlined"
                size="small"
                disabled={page <= 0 || loading}
                onClick={() => setPage((p) => p - 1)}
              >
                Trước
              </Button>
              <Button
                variant="outlined"
                size="small"
                disabled={page + 1 >= totalPages || loading}
                onClick={() => setPage((p) => p + 1)}
              >
                Sau
              </Button>
            </Box>
          </Box>

          {error && (
            <Typography color="error" className="mb-4">
              {error}
            </Typography>
          )}

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Phí ship</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Thời gian</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Không có đơn hàng
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell>{o.id}</TableCell>
                    <TableCell>{o.status}</TableCell>
                    <TableCell>
                      {o.totalPrice.toLocaleString()}₫
                    </TableCell>
                    <TableCell>
                      {o.shippingFee.toLocaleString()}₫
                    </TableCell>
                    <TableCell>{o.shippingAddr}</TableCell>
                    <TableCell>
                      {new Date(o.createdAt).toLocaleString("vi-VN")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Chi tiết items của đơn đầu tiên (ví dụ) */}
          {orders.length > 0 && (
            <Box className="mt-6">
              <Typography variant="h6" className="mb-2">
                Chi tiết đơn #{orders[0].id}
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Ảnh</TableCell>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell>Giá</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Thành tiền</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders[0].items.map((it) => (
                    <TableRow key={it.id}>
                      <TableCell>
                        {it.productImage ? (
                          <img
                            src={it.productImage}
                            alt={it.productName}
                            className="w-16 h-16 object-cover"
                          />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>{it.productName}</TableCell>
                      <TableCell>
                        {it.unitPrice.toLocaleString()}₫
                      </TableCell>
                      <TableCell>{it.quantity}</TableCell>
                      <TableCell>
                        {(it.unitPrice * it.quantity).toLocaleString()}₫
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </Paper>
      </div>
    </div>
  );
}
