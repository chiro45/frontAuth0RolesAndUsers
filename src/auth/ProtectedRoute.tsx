import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface Props {
  children: ReactNode;
  allowedRoles: string[];
}

const VITE_AUTH0_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE;

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();

  const setToken = useAuthStore((state) => state.setToken);
  const handleToken = async () => {
    const data = await getAccessTokenSilently();
    console.log(data)
    setToken(data);
  };
  useEffect(() => {
    handleToken();
  }, []);

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50dvh",
        }}
      >
        <h2>Cargando...</h2>
      </div>
    );

  if (!isAuthenticated || !user) return <Navigate to="/" />;

  const rol = user[`${VITE_AUTH0_AUDIENCE}/roles`]?.[0];

  if (!allowedRoles.includes(rol)) return <Navigate to="/" />;

  return <>{children}</>;
};
