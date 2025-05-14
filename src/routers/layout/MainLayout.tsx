import { Outlet } from "react-router-dom"
import MainNavbar from "../../components/Navbar/MainNavbar"


const MainLayout = () => {
  return (
    <div className="bg-gray-100">
    <MainNavbar/>
    <Outlet />
    (
    <footer className="bg-gray-100 text-gray-700 text-sm mt-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {/* Hỗ trợ Khách hàng */}
        <div>
          <h4 className="font-semibold mb-2">Hỗ trợ Khách hàng</h4>
          <ul className="space-y-1">
            <li>Thẻ ưu đãi</li>
            <li>Hướng dẫn mua online</li>
            <li>Ưu đãi dành cho Doanh nghiệp</li>
            <li>Chính sách trả góp</li>
            <li>Dịch vụ sửa chữa</li>
          </ul>
        </div>

        {/* Chính sách mua hàng */}
        <div>
          <h4 className="font-semibold mb-2">Chính sách mua hàng</h4>
          <ul className="space-y-1">
            <li>Điều kiện giao dịch chung</li>
            <li>Chính sách bảo hành</li>
            <li>Chính sách đổi trả</li>
            <li>Chính sách thanh toán</li>
            <li>Giao hàng và Lắp đặt tại nhà</li>
            <li>Dịch vụ lắp đặt và nâng cấp PC/Laptop</li>
            <li>Chính sách bảo mật thanh toán</li>
            <li>Quy định Đặt cọc và Giữ hàng</li>
          </ul>
        </div>

        {/* Thông tin Phong Vũ */}
        <div>
          <h4 className="font-semibold mb-2">Thông tin Phong Vũ</h4>
          <ul className="space-y-1">
            <li>Giới thiệu Phong Vũ</li>
            <li>Hệ thống cửa hàng</li>
            <li>Trung tâm bảo hành</li>
            <li>Chính sách bảo mật</li>
            <li>Tin công nghệ</li>
            <li>Hỏi đáp</li>
            <li>Tuyển dụng</li>
          </ul>
        </div>

        {/* Cộng đồng Phong Vũ */}
        <div>
          <h4 className="font-semibold mb-2">Cộng đồng Phong Vũ</h4>
          <ul className="space-y-1">
            <li>Gọi mua hàng (miễn phí) 18006867</li>
            <li>Gọi chăm sóc 18006865</li>
            <li>Facebook Phong Vũ</li>
            <li>Phong Vũ Media</li>
            <li>Phong Vũ Hội</li>
            <li>OA Phong Vũ (zalo)</li>
          </ul>
        </div>

        {/* Email liên hệ */}
        <div>
          <h4 className="font-semibold mb-2">Email liên hệ</h4>
          <ul className="space-y-1">
            <li>cs@phongvu.vn</li>
            <li>baogia@phongvu.vn</li>
            <li>hoptac@phongvu.vn</li>
          </ul>
        </div>

        {/* Phương thức thanh toán */}
        <div>
          <h4 className="font-semibold mb-2">Phương thức thanh toán</h4>
          <div className="space-y-1">
            <div>QR Code</div>
            <div>Tiền mặt</div>
            <div>Trả góp</div>
            <div>Internet Banking</div>
          </div>
        </div>
      </div>

      {/* Logo ngân hàng */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <p className="font-semibold mb-2">Danh sách các ngân hàng thanh toán online</p>
        <div className="flex flex-wrap gap-2">
          {Array(20).fill(null).map((_, i) => (
            <div key={i} className="w-10 h-6 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>

      {/* Thông tin công ty */}
      <div className="bg-gray-200 mt-4 text-xs text-gray-600 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <p>
            © 1997 - 2020 Công Ty Cổ Phần Thương Mại - Dịch Vụ Phong Vũ <br />
            Giấy chứng nhận đăng ký doanh nghiệp: 0304998358 do Sở KH-ĐT TP.HCM cấp lần đầu ngày 30 tháng 05 năm 2007
          </p>
          <p className="mt-2">
            <strong>Địa chỉ trụ sở chính:</strong> Tầng 5, Số 117-119-121 Nguyễn Du, Phường Bến Thành, Quận 1, Thành Phố Hồ Chí Minh
            <br />
            <strong>Văn phòng điều hành miền Bắc:</strong> Tầng 2, Số 47 Phố Thái Hà, Phường Trung Liệt, Quận Đống Đa, Thành phố Hà Nội
            <br />
            <strong>Văn phòng điều hành miền Nam:</strong> 677/2A Điện Biên Phủ, Phường 25, Quận Bình Thạnh, TP. Hồ Chí Minh
          </p>

          <div className="flex gap-4 mt-2">
            <div className="w-16 h-6 bg-blue-400 rounded text-white text-center">BCT</div>
            <div className="w-16 h-6 bg-green-500 rounded text-white text-center">DMCA</div>
          </div>
        </div>
      </div>
    </footer>
</div>
  )
}

export default MainLayout;