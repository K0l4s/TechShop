import React, { useEffect, useState } from "react";
import { userInformationService } from "../../services/UserProfileService";

interface ProfileData {
  username: string;   // Sử dụng username cho Họ tên
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
  const [updating, setUpdating] = useState(false);

  // Dùng TEST_USER_ID = 5 (cố định)
  const TEST_USER_ID = 5;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Gọi API GET profile với userId = 5
        const response = await userInformationService.getMyProfile();
        console.log("Profile response:", response);
        // Theo Documenter, response chứa trường user chứa thông tin
        setFormData({
          username: response?.user?.username || "",
          email: response?.user?.email || "",
          phone: response?.user?.phone || "",
        });
      } catch (error) {
        console.error("Không thể tải thông tin người dùng:", error);
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
    setUpdating(true);
    try {
      // Gửi payload gồm username, email và phone. Nếu muốn không cập nhật email, bạn có thể bỏ nó đi.
      const response = await userInformationService.updateMyProfile(formData);
      console.log("Cập nhật thành công:", response);
      // Sau khi cập nhật, bạn có thể reload lại profile nếu cần.
    } catch (error) {
      console.error("Cập nhật thông tin người dùng thất bại:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Đang tải thông tin người dùng...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-3 text-gray-800">Thông tin tài khoản</h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div>
          <label className="block font-bold text-sm text-gray-700">Họ tên</label>
          {/* Cho phép sửa Họ tên (username) */}
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
          {/* Nếu bạn muốn cố định Email không cho sửa, giữ disabled */}
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
          disabled={updating}
          className="w-full bg-green-600 text-white py-2 rounded-md mt-2 hover:bg-green-700 transition"
        >
          {updating ? "Đang cập nhật..." : "Cập nhật"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
