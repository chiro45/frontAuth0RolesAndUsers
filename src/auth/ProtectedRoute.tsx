import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useShallow } from "zustand/shallow";

interface Props {
  children: ReactNode;
  allowedRoles: string[];
}

const VITE_AUTH0_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE;

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { isAuthenticated, user, getAccessTokenSilently } =
    useAuth0();

  const { setRol, setToken } = useAuthStore(
    useShallow((state) => ({
      setToken: state.setToken,
      setRol: state.setRol,
    }))
  );
  const handleToken = async () => {
    const data = await getAccessTokenSilently();

    setToken(data);
    if (user) {
      const rol = user[`${VITE_AUTH0_AUDIENCE}/roles`]?.[0];

      if (rol) {
        setRol(rol);
      }
    }
  };
  useEffect(() => {
    handleToken();
  }, []);

  

  if (!isAuthenticated || !user) return <Navigate to="/" />;

  const rol = user[`${VITE_AUTH0_AUDIENCE}/roles`]?.[0];

  if (!allowedRoles.includes(rol)) return <Navigate to="/" />;

  return <>{children}</>;
};
