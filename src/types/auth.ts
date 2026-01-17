export interface registerBody {
  name: string;
  email: string;
  password: string;
}

export interface LoginBody {
  email?: string;
  password?: string;
  rememberMe?: boolean;
  type?: string;
  mobile?: string;
  captcha?: string;
}
