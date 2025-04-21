import LoginForm from "../../components/Auth/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Header */}
      <header className="absolute top-4 left-6 flex items-center">
        <img className="w-14 h-14" src="/image/logo.png" alt="logo" />
        <h1 className="text-2xl font-bold text-blue-600 ml-2">TECHGROUP</h1>
      </header>

      {/* Nội dung chính */}
      <LoginForm />
    </div>
  );
};

export default LoginPage;
