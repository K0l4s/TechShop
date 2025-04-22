import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authenticateApi } from "../../services/AuthenticationService";
import { VerifyOTPRequest } from "../../models/Auth";

const OTPVerificationForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("registeredEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleVerify = async () => {
    try {
      const requestData: VerifyOTPRequest = { email, code: otp };
      const response = await authenticateApi.verifyOTP(requestData);

      if (response.message === "Verified code is successful") {
        toast.success("Xác thực thành công!", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        });

        setTimeout(() => {
          localStorage.removeItem("registeredEmail"); 
          navigate("/login");
        }, 2000);
      } else {
        toast.error("Mã code không đúng!", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi xác thực!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto text-center p-6 border rounded-lg shadow-md bg-white">
      <ToastContainer />

      <input
        type="email"
        value={email}
        readOnly
        className="w-full border border-gray-300 p-3 rounded text-lg text-center mb-4 bg-gray-200"
      />

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Nhập mã OTP"
        className="w-full border border-gray-300 p-3 rounded text-lg text-center mb-4"
      />

      <p className="text-blue-600 mb-4">Nhập mã code đã được gửi đến Email của bạn</p>

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
