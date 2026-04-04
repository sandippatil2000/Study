export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface User {
  id: string;
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  avatar?: string;
  userInitial?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  loginWithSSO: (provider: string) => Promise<void>;
  logout: () => void;
}
