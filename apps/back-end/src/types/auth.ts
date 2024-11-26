export interface IUser {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  permissions?: Record<string, boolean>;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  fullName?: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
