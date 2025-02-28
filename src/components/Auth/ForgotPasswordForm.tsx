import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const navigate = useNavigate(); // Hook điều hướng

  return (
    <div className="w-full max-w-md mx-auto text-center p-6 border rounded-lg shadow-md bg-white">
      {/* Input Email */}
      <input
        type="email"
        placeholder="Nhập email"
        className="w-full border border-gray-300 p-3 rounded text-lg text-center mb-4"
      />

      {/* Nút Đặt lại mật khẩu */}
      <button
        className="w-full bg-green-500 text-white py-3 text-lg font-bold rounded"
        onClick={() => navigate("/otp-verification")} 
      >
        Đặt lại mật khẩu
      </button>
    </div>
  );
};

export default ForgotPasswordForm;
