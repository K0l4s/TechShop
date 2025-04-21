export interface UserProfile {
  id: number;
  username: string;
  email: string;
  phone: string;
  firstname?: string;
  lastname?: string;
  avatar?: string;
  // Thêm các thuộc tính khác nếu cần
}

export interface GetUserProfileResponse {
  success: boolean;
  message?: string;
  user: UserProfile;
}

export interface UpdateUserProfileRequest {
  username?: string;
  email?: string;
  phone?: string;
  firstname?: string;
  lastname?: string;
  avatar?: string;
  // Thêm cho những trường khác nếu cần
}

export interface UpdateUserProfileResponse {
  success: boolean;
  message: string;
  user?: UserProfile;
}
