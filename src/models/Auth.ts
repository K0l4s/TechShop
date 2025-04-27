export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
  }
  
  export interface RegisterResponse {
    message: string;
    email: string;
    username: string;
    token?: string; 
  }

  export interface VerifyOTPRequest {
    email: string;
    code: string;
  }
  
  export interface VerifyOTPResponse {
    message: string;
  }

  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    // Thêm user để chứa thông tin của người dùng
    user?: {
    id: number;
    email: string;
    username?: string;
    // các thuộc tính khác nếu cần
    };
  }
  
  export interface MeResponse {
    success: boolean;
    message: string;
    body: {
      id: number;
      email: string;
      username?: string;
      // thêm các field khác nếu cần
    };
  }
  