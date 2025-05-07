import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateApi } from "../../services/AuthenticationService";
import { RegisterRequest } from "../../models/Auth";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: "", email: "", password: "", confirmPassword: "" };

    if (!formData.username.trim()) {
      newErrors.username = "Tên người dùng không được để trống!";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống!";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống!";
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const requestData: RegisterRequest = {
        email: formData.email,
        password: formData.password,
        username: formData.username,
      };

      console.log("🚀 Gửi yêu cầu đăng ký:", requestData);
      const response = await authenticateApi.register(requestData);
      console.log("🎉 Phản hồi từ server:", response);

      if (response?.email) {
        localStorage.setItem("registeredEmail", formData.email);
        navigate("/otp-verification");
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Đăng ký thất bại! Vui lòng thử lại.",
        }));
      }
    } catch (error: any) {
      console.error("❌ Lỗi đăng ký:", error.response?.data || error.message);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: error.response?.data?.message || "Đăng ký thất bại!",
      }));
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-4">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Nhập tên người dùng"
          className="w-full border border-gray-300 p-3 text-lg rounded outline-none"
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
      </div>

      <div className="mb-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Nhập email"
          className="w-full border border-gray-300 p-3 text-lg rounded outline-none"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Nhập mật khẩu"
          className="w-full border border-gray-300 p-3 text-lg rounded outline-none"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <div className="mb-6">
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Nhập lại mật khẩu"
          className="w-full border border-gray-300 p-3 text-lg rounded outline-none"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
      </div>

      <button
        className="w-full bg-green-500 text-white py-3 text-xl font-bold rounded"
        onClick={handleRegister}
      >
        Đăng ký
      </button>
    </div>
  );
};

export default RegisterForm;
