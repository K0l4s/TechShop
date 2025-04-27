import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { authenticateApi } from "../../services/AuthenticationService";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await authenticateApi.login({ email, password });
  
      // Trước tiên, điều hướng sang trang chủ
      navigate("/");
  
      // Sau đó, reload trang để đảm bảo mọi component đọc được userId mới từ localStorage
      window.location.reload();
    } catch (error) {
      console.error("🚨 Đăng nhập thất bại:", error);
      alert("Email hoặc mật khẩu không đúng!");
    }
  };
  

  return (
    <div className="w-full max-w-2xl text-center">
      <h2 className="text-4xl font-bold text-red-600 mb-8">
        ĐĂNG NHẬP HOẶC TẠO TÀI KHOẢN
      </h2>
      <div className="w-full max-w-lg mx-auto">
        <div className="mb-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-4 text-lg rounded outline-none"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-4 text-lg rounded outline-none"
          />
        </div>
        <button
          className="w-full bg-red-600 text-white py-4 text-xl font-bold rounded"
          onClick={handleLogin}
        >
          Đăng Nhập
        </button>
      </div>
      <p className="text-red-600 mt-4 text-lg cursor-pointer" onClick={() => navigate("/forgotpassword")}>
        Quên mật khẩu?
      </p>
      <p className="mt-6 text-lg">Hoặc đăng nhập bằng:</p>
      <div className="flex justify-center gap-6 mt-4">
        <button className="p-3 bg-gray-100 rounded-full">
          <FcGoogle size={40} />
        </button>
        <button className="p-3 bg-gray-100 rounded-full">
          <FaFacebook size={40} color="#1877F2" />
        </button>
      </div>
      <p className="mt-6 text-lg text-blue-600 cursor-pointer" onClick={() => navigate("/register")}>
        Bạn chưa có tài khoản? <span className="font-bold">Đăng ký ngay!</span>
      </p>
    </div>
  );
};

export default LoginForm;
