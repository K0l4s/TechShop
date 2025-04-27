import React, { useEffect, useState } from "react";
import { userInformationService } from "../../services/UserProfileService";

interface ProfileData {
  username: string;
  email: string;
  phone: string;
}

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<ProfileData>({
    username: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userInformationService.getMyProfile();
        console.log("Profile response:", response);
        setFormData({
          username: response?.user?.username || "",
          email: response?.user?.email || "",
          phone: response?.user?.phone || "",
        });
      } catch (error) {
        console.error("Không thể tải thông tin người dùng:", error);
        setErrorMsg("Lỗi khi tải thông tin người dùng.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await userInformationService.updateMyProfile(formData);
      console.log("Cập nhật thành công:", response);
    } catch (error) {
      console.error("Cập nhật thông tin người dùng thất bại:", error);
    }
  };

  if (loading) return <p>Đang tải thông tin người dùng...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-3 text-gray-800">Thông tin tài khoản</h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div>
          <label className="block font-bold text-sm text-gray-700">Họ tên</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block font-bold text-sm text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full border px-3 py-2 rounded-md bg-gray-200 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block font-bold text-sm text-gray-700">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md mt-2 hover:bg-green-700 transition"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default UserForm;
