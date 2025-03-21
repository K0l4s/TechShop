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
  