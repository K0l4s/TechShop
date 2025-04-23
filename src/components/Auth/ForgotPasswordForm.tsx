import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateApi } from "../../services/AuthenticationService";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // Thêm trạng thái để lưu thông báo
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Gửi yêu cầu quên mật khẩu mà không cần OTP
      await authenticateApi.forgotPassword({ email });
      console.log("📨 Đã gửi yêu cầu đặt lại mật khẩu");

      // Thông báo thành công
      setMessage("Chúng tôi đã gửi một email tới bạn. Vui lòng kiểm tra hộp thư.");
      
      // Lưu email vào localStorage (nếu cần sử dụng sau này)
      localStorage.setItem("forgotEmail", email);

      // Sau khi gửi email, bạn có thể điều hướng đến trang khác nếu muốn
      // navigate("/check-email");

    } catch (err: any) {
      setError(err.response?.data?.message || "Gửi yêu cầu thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <label className="block">
        <span className="text-gray-700">Email</span>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-4 py-2"
        />
      </label>

      {message && <p className="text-blue-500 text-sm">{message}</p>} {/* Thông báo thành công */}

      {error && <p className="text-red-500 text-sm">{error}</p>} {/* Thông báo lỗi */}

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-3 text-xl font-bold rounded"
      >
        Gửi yêu cầu
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
