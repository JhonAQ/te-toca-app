import { createContext } from "react";

// Crear un contexto con valores por defecto
const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  currentTenantId: null,
  setAuthState: () => {},
  login: () => {},
  logout: () => {},
  setTenantId: () => {},
});

export default AuthContext;
