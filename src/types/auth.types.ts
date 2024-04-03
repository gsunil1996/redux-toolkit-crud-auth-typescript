export type CheckTokenValidityData = {
  message: string;
};

export type UserData = {
  _id: string;
  username: string;
  email: string;
  __v: number;
};

export type LoginData = {
  user: UserData;
  token: string;
  refreshToken: string;
};

export type LoginProps = { email: string; password: string };

export type RegisterData = {
  user: UserData;
};

export type RegisterUserProps = {
  username: string;
  email: string;
  password: string;
};

export type RefreshData = {
  token: string;
};

export type AuthInitialState = {
  registerData: RegisterData | null;
  registerIsLoading: boolean;
  registerIsError: boolean;
  registerError: string;
  registerIsSuccess: boolean;

  loginData: LoginData | null;
  loginIsLoading: boolean;
  loginIsError: boolean;
  loginError: string;
  loginIsSuccess: boolean;

  refreshData: RefreshData | null;
  refreshIsLoading: boolean;
  refreshIsError: boolean;
  refreshError: string;
  refreshIsSuccess: boolean;

  checkTokenValidityData: CheckTokenValidityData | null;
  checkTokenValidityIsLoading: boolean;
  checkTokenValidityIsError: boolean;
  checkTokenValidityError: string;
  checkTokenValidityIsSuccess: boolean;
};
