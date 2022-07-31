import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { AuthService, IAuthenticateArgs } from "../services";

const STORAGE_ACCESS_TOKEN = "accessToken";

type TAccessToken = string | null;

interface IAuthProviderProps {
  children: React.ReactNode;
}

interface IAuthProviderData {
  accessToken: TAccessToken;
  login(arg: IAuthenticateArgs): Promise<TAccessToken>;
  logout(): void;
  isAuthenticated: boolean;
}

const _getAccessToken = (): TAccessToken =>
  localStorage.getItem(STORAGE_ACCESS_TOKEN);
const _getIsAuthenticated = (accessToken: TAccessToken): boolean =>
  !!accessToken;
const initialAccessToken = _getAccessToken();

const AuthContext = createContext({} as IAuthProviderData);

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [accessToken, setAccessToken] = useState(initialAccessToken);
  const isAuthenticated = useMemo(
    () => _getIsAuthenticated(accessToken),
    [accessToken]
  );

  const logout = useCallback((): void => {
    setAccessToken(null);
    localStorage.removeItem(STORAGE_ACCESS_TOKEN);
  }, []);

  const login = useCallback(
    async (arg: IAuthenticateArgs): Promise<TAccessToken> => {
      const { accessToken } = await AuthService.authenticate(arg);
      setAccessToken(accessToken);
      localStorage.setItem(STORAGE_ACCESS_TOKEN, accessToken);
      return accessToken;
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
