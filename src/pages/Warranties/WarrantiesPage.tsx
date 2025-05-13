import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  TextField,
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
  IconButton,
} from '@mui/material';
import { LuScanEye } from 'react-icons/lu';
import MainNavbar from '../../components/Navbar/MainNavbar';
import {
  Warranty,
  UserService,
  Pageable,
} from '../../services/UserService';

const PAGE_SIZE_OPTIONS = [5, 10, 20];
const STATUSES = ['ALL', 'ACTIVE', 'EXPIRED', 'CANCELLED'];

const WarrantiesPage: React.FC = () => {
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchCode, setSearchCode] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [productFilter, setProductFilter] = useState<number | ''>('');
  const [aboutToExpire, setAboutToExpire] = useState(false);
  const [expiredList, setExpiredList] = useState(false);
  const [selectedWarranty, setSelectedWarranty] = useState<Warranty | null>(null);
  const [newWarranty, setNewWarranty] = useState<{
    userId: number;
    productId: number;
    status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
    endDate: string;
  }>({ userId: 0, productId: 0, status: 'ACTIVE', endDate: '' });
  const [editEndDate, setEditEndDate] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load data based on filters
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      // search by code
      if (searchCode) {
        const w = await UserService.getWarrantyByCode(searchCode);
        setWarranties([w]);
        setTotalPages(1);
      }
      // about to expire
      else if (aboutToExpire) {
        const pageData = await UserService.getAboutToExpire(page, size);
        setWarranties(pageData.content);
        setTotalPages(pageData.totalPages);
      }
      // expired list
      else if (expiredList) {
        const pageData = await UserService.getExpired(page, size);
        setWarranties(pageData.content);
        setTotalPages(pageData.totalPages);
      }
      // by product
      else if (productFilter !== '') {
        const list = await UserService.getWarrantiesByProduct(Number(productFilter));
        setWarranties(list);
        setTotalPages(1);
      }
      // by status
      else if (statusFilter !== 'ALL') {
        const pageData = await UserService.getWarrantiesByStatus(
          statusFilter as 'ACTIVE' | 'EXPIRED' | 'CANCELLED',
          page,
          size
        );
        setWarranties(pageData.content);
        setTotalPages(pageData.totalPages);
      }
      // default
      else {
        const pageData = await UserService.getWarranties(page, size);
        setWarranties(pageData.content);
        setTotalPages(pageData.totalPages);
      }
    } catch (e) {
      console.error(e);
      setError('Không tải được dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, size, statusFilter, productFilter, aboutToExpire, expiredList, searchCode]);

  // CRUD actions
  const handleCreate = async () => {
    await UserService.createWarranty(newWarranty);
    loadData();
  };

  const handleUpdate = async () => {
    if (!selectedWarranty) return;
    await UserService.updateWarranty(selectedWarranty.id, { endDate: editEndDate });
    setSelectedWarranty(null);
    loadData();
  };

  const handleCancel = async (id: number) => {
    await UserService.cancelWarranty(id, 'Người dùng hủy');
    loadData();
  };

  const handleChangeStatus = async (w: Warranty) => {
    const newStatus = w.status === 'ACTIVE' ? 'EXPIRED' : 'ACTIVE';
    await UserService.updateStatus(w.id, newStatus);
    loadData();
  };

  const handleDelete = async (id: number) => {
    await UserService.deleteWarranty(id);
    loadData();
  };

  return (
    <div className="min-h-screen bg-white">
      <MainNavbar />
      <div className="max-w-7xl mx-auto p-6">
        <Typography variant="h5" gutterBottom>
          Quản lý Bảo hành
        </Typography>

        {/* Filters & Search */}
        <Box className="flex flex-wrap gap-4 mb-4">
          <TextField
            label="WCODE"
            size="small"
            value={searchCode}
            onChange={e => { setSearchCode(e.target.value); setPage(0); }}
          />
          <FormControl size="small">
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={statusFilter}
              label="Trạng thái"
              onChange={e => { setStatusFilter(e.target.value); setPage(0); }}
            >
              {STATUSES.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField
            type="number"
            label="Product ID"
            size="small"
            value={productFilter}
            onChange={e => { setProductFilter(e.target.value === '' ? '' : Number(e.target.value)); setPage(0); }}
          />
          <Button
            variant={aboutToExpire ? 'contained' : 'outlined'}
            onClick={() => { setAboutToExpire(true); setExpiredList(false); setPage(0); }}
          >
            Sắp hết hạn
          </Button>
          <Button
            variant={expiredList ? 'contained' : 'outlined'}
            onClick={() => { setExpiredList(true); setAboutToExpire(false); setPage(0); }}
          >
            Đã hết hạn
          </Button>
        </Box>

        {/* Create form */}
        <Paper className="p-4 mb-6">
          <Typography variant="h6">Tạo mới bảo hành</Typography>
          <Box className="flex flex-wrap gap-4 mt-2">
            <TextField
              label="User ID"
              size="small"
              type="number"
              value={newWarranty.userId}
              onChange={e => setNewWarranty({ ...newWarranty, userId: Number(e.target.value) })}
            />
            <TextField
              label="Product ID"
              size="small"
              type="number"
              value={newWarranty.productId}
              onChange={e => setNewWarranty({ ...newWarranty, productId: Number(e.target.value) })}
            />
            <TextField
              label="End Date"
              size="small"
              type="datetime-local"
              value={newWarranty.endDate}
              onChange={e => setNewWarranty({ ...newWarranty, endDate: e.target.value })}
            />
            <Button variant="contained" onClick={handleCreate}>Tạo</Button>
          </Box>
        </Paper>

        {/* Table list */}
        <Paper className="p-4">
          {error && <Typography color="error" className="mb-2">{error}</Typography>}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>WCODE</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Start</TableCell>
                <TableCell>End</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={8} align="center">Đang tải...</TableCell></TableRow>
              ) : warranties.length === 0 ? (
                <TableRow><TableCell colSpan={8} align="center">Không có bản ghi</TableCell></TableRow>
              ) : (
                warranties.map(w => (
                  <TableRow key={w.id}>
                    <TableCell>{w.id}</TableCell>
                    <TableCell>{w.wcode}</TableCell>
                    <TableCell>{w.userName}</TableCell>
                    <TableCell>{w.productName}</TableCell>
                    <TableCell>{w.status}</TableCell>
                    <TableCell>{new Date(w.startDate).toLocaleString('vi-VN')}</TableCell>
                    <TableCell>{new Date(w.endDate).toLocaleString('vi-VN')}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => setSelectedWarranty(w)}><LuScanEye /></IconButton>
                      <Button size="small" onClick={() => handleChangeStatus(w)}>
                        {w.status === 'ACTIVE' ? 'Set Expired' : 'Set Active'}
                      </Button>
                      <Button size="small" color="error" onClick={() => handleCancel(w.id)}>Hủy</Button>
                      <Button size="small" color="secondary" onClick={() => handleDelete(w.id)}>Xóa</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <Box className="flex justify-between items-center mt-4">
            <Box>
              <Button disabled={page === 0} onClick={() => setPage(p => p - 1)}>Trước</Button>
              <Button disabled={page + 1 >= totalPages} onClick={() => setPage(p => p + 1)}>Sau</Button>
            </Box>
            <FormControl size="small">
              <Select
                value={size}
                onChange={e => { setSize(Number(e.target.value)); setPage(0); }}
              >
                {PAGE_SIZE_OPTIONS.map(opt => <MenuItem key={opt} value={opt}>{opt}/page</MenuItem>)}
              </Select>
            </FormControl>
            <Typography>Trang {page + 1} / {totalPages}</Typography>
          </Box>
        </Paper>

        {/* Detail Modal */}
        {selectedWarranty && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <Paper className="p-6 w-96">
              <Typography variant="h6" gutterBottom>Chi tiết Bảo hành</Typography>
              <Typography><strong>WCODE:</strong> {selectedWarranty.wcode}</Typography>
              <Typography><strong>User:</strong> {selectedWarranty.userName} ({selectedWarranty.userEmail})</Typography>
              <Typography><strong>Product:</strong> {selectedWarranty.productName}</Typography>
              <Typography><strong>Status:</strong> {selectedWarranty.status}</Typography>
              <Typography><strong>Start:</strong> {new Date(selectedWarranty.startDate).toLocaleString('vi-VN')}</Typography>
              <Typography><strong>End:</strong> {new Date(selectedWarranty.endDate).toLocaleString('vi-VN')}</Typography>
              {selectedWarranty.cancellationReason && (
                <Typography><strong>Reason:</strong> {selectedWarranty.cancellationReason}</Typography>
              )}
              <Box className="mt-4 flex flex-wrap gap-2">
                <TextField
                  label="Chỉnh End Date"
                  type="datetime-local"
                  size="small"
                  value={editEndDate}
                  onChange={e => setEditEndDate(e.target.value)}
                />
                <Button variant="contained" onClick={handleUpdate}>Cập nhật</Button>
                <Button variant="outlined" onClick={() => setSelectedWarranty(null)}>Đóng</Button>
              </Box>
            </Paper>
          </div>
        )}
      </div>
    </div>
);
}

export default WarrantiesPage