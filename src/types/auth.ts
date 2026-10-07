export interface LoginFormValues {
  email: string;
  password: string;
  captchaAnswer: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success?: boolean;
  message?: string;
  token?: string;
}

export interface FieldErrors {
  email?: string;
  password?: string;
  captchaAnswer?: string;
  form?: string;
}