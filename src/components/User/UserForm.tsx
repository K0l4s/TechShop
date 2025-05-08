// src/components/User/UserForm.tsx

import React, { useState, useEffect } from "react";
import { ProfileService } from "../../services/UserProfileService"; // điều chỉnh đường dẫn nếu cần

const UserForm: React.FC = () => {
  // Lấy userId từ localStorage (nếu không có thì fallback giá trị 5)
  const storedUserId = localStorage.getItem("userId");
  const userId = storedUserId ? Number(storedUserId) : 5;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: ""
  });

  // Lấy thông tin profile khi component mount
  useEffect(() => {
    if (!userId) {
      console.error("Không tìm thấy user id hợp lệ");
      return;
    }

    const loadProfile = async () => {
      try {
        const profile = await ProfileService.getProfile(userId);
        if (!profile) {
          console.error("Profile is undefined - Kiểm tra lại response của API");
          return;
        }
        setFormData({
          username: profile.username || "",
          email: profile.email || "",
          phone: profile.phone || ""
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    loadProfile();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedProfile = await ProfileService.updateProfile(userId, formData);
      console.log("Profile updated successfully:", updatedProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-3 text-gray-800">Thông tin tài khoản</h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div>
          <label className="block font-bold text-sm text-gray-700">Username</label>
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
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
