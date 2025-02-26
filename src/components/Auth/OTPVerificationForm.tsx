import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OTPVerificationForm = () => {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp === "123456") {
      toast.success("Xác thực thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      toast.error("Mã OTP không đúng!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto text-center p-6 border rounded-lg shadow-md bg-white">
      <ToastContainer /> {/* Thêm ToastContainer vào đây */}
      
      {/* Input OTP */}
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Nhập mã OTP"
        className="w-full border border-gray-300 p-3 rounded text-lg text-center mb-4"
      />

      <p className="text-blue-600 mb-4">Nhập mã OTP đã được gửi đến Email của bạn</p>

      {/* Nút Xác nhận */}
      <button
        className="w-full bg-green-500 text-white py-3 text-lg font-bold rounded"
        onClick={handleVerify}
      >
        Xác nhận
      </button>
    </div>
  );
};

export default OTPVerificationForm;
