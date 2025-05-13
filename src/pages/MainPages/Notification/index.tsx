// components/NotificationList.tsx
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
  Badge,
  IconButton,
} from "@mui/material";
import { FaBell } from "react-icons/fa";
import MainNavbar from "../../../components/Navbar/MainNavbar";
import { Notification } from "../../../services/UserService";
import { UserService } from "../../../services/UserService";

const TYPES = ["ALL", "ORDER_UPDATE"]; // mở rộng nếu có thêm type khác

export default function NotificationList() {
  const [list, setList] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<string>("ALL");
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // load danh sách theo filter
  const loadList = async () => {
    setLoading(true);
    setError(null);
    try {
      let data: Notification[];
      if (filter === "ALL") {
        data = await UserService.getAllNotification();       // GET /notifications
      } else if (filter === "UNREAD") {
        data = await UserService.getUnreadNotifications();   // GET /notifications/unread
      } else {
        data = await UserService.getNotificationsByType(filter); // GET /notifications/type/...
      }
      setList(data);
    } catch (e) {
      console.error(e);
      setError("Không tải được thông báo");
    } finally {
      setLoading(false);
    }
  };

  // load số lượng chưa đọc
  const loadCount = async () => {
    try {
      const cnt = await UserService.getUnreadCount();       // GET /notifications/count
      setUnreadCount(cnt);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadList();
    loadCount();
  }, [filter]);

  // đánh dấu đọc
  const handleMarkRead = async (ids: number[]) => {
    await UserService.markNotificationsRead(ids);
    await loadList();
    await loadCount();
  };

  // đánh dấu tất cả đọc
  const handleMarkAllRead = async () => {
    await UserService.markAllNotificationsRead();
    await loadList();
    await loadCount();
  };

  // xóa 1 notification
  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa thông báo này?")) return;
    await UserService.deleteNotification(id);
    await loadList();
    await loadCount();
  };

  return (
    <div className="min-h-screen bg-white">
      <MainNavbar />
      <div className="max-w-5xl mx-auto p-4">
        <Box className="flex items-center justify-between mb-4">
          <Box className="flex items-center gap-2">
            <Badge badgeContent={unreadCount} color="error">
              <IconButton>
                <FaBell size={20} />
              </IconButton>
            </Badge>
            <Typography variant="h6">Thông báo</Typography>
          </Box>

          <Box className="flex gap-2">
            <Button
              variant="outlined"
              size="small"
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
            >
              Đánh dấu tất cả đã đọc
            </Button>

            <FormControl size="small">
              <InputLabel>Lọc</InputLabel>
              <Select
                label="Lọc"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="ALL">Tất cả</MenuItem>
                <MenuItem value="UNREAD">Chưa đọc</MenuItem>
                {TYPES.filter((t) => t !== "ALL").map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Paper className="p-4">
          {error && (
            <Typography color="error" className="mb-2">
              {error}
            </Typography>
          )}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Tiêu đề</TableCell>
                <TableCell>Nội dung</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : list.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Không có thông báo
                  </TableCell>
                </TableRow>
              ) : (
                list.map((n) => (
                  <TableRow key={n.id} selected={!n.read}>
                    <TableCell>{n.id}</TableCell>
                    <TableCell>{n.title}</TableCell>
                    <TableCell>{n.message}</TableCell>
                    <TableCell>{n.type}</TableCell>
                    <TableCell>
                      {new Date(n.createdAt).toLocaleString("vi-VN")}
                    </TableCell>
                    <TableCell>
                      {n.read ? "Đã đọc" : "Chưa đọc"}
                    </TableCell>
                    <TableCell>
                      {!n.read && (
                        <Button
                          size="small"
                          onClick={() => handleMarkRead([n.id])}
                        >
                          Đọc
                        </Button>
                      )}
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(n.id)}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
}
