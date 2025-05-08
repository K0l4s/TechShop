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
  }
  
  export interface ForgotPasswordRequest {
    email: string;
  }
  
  export interface ForgotPasswordResponse {}

  export interface ResetPasswordRequest {
    password: string;
    token: string;
  }

  