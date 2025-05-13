import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authenticateApi } from "../../services/AuthenticationService";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ Thêm trạng thái hiển thị thành công
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy token từ URL
  const getTokenFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get("token");
  };

  const token = getTokenFromUrl();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("Token không hợp lệ hoặc đã hết hạn");
      return;
    }

    if (password !== confirm) {
      setError("Mật khẩu không khớp");
      return;
    }

    try {
      await authenticateApi.resetPassword({ password, token });
      setSuccess("🎉 Đặt lại mật khẩu thành công! Đang chuyển hướng...");
      setError("");

      // ⏳ Chờ 3 giây rồi điều hướng
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Không thể đặt lại mật khẩu.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <input
        type="password"
        placeholder="Mật khẩu mới"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Nhập lại mật khẩu"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-3 text-xl font-bold rounded"
      >
        Xác nhận đổi mật khẩu
      </button>
    </form>
  );
};

export default ResetPasswordForm;
