import OTPVerificationForm from "../../components/Auth/OTPVerificationForm";

const OTPVerificationPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Header */}
      <header className="absolute top-4 left-6 flex items-center">
        <img className="w-14 h-14" src="/image/logo.png" alt="logo" />
        <h1 className="text-2xl font-bold text-blue-600 ml-2">TECHGROUP</h1>
      </header>

      {/* Tiêu đề */}
      <h2 className="text-2xl font-bold text-red-600 mb-6">XÁC THỰC OTP</h2>

      {/* Form nhập OTP */}
      <OTPVerificationForm />
    </div>
  );
};

export default OTPVerificationPage;
