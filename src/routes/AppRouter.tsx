import { Routes, Route } from "react-router-dom";
import { Home } from "../components/Screens/Home";
import { LoginRedirect } from "../components/Screens/LoginRedirect";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { ClienteScreen } from "../components/Screens/ClienteScreen";
import { PostLogin } from "../components/Screens/PostLogin/PostLogin";
import { Admin } from "../components/Screens/Admin";
import { CallbackPage } from "../components/Screens/CallbackPage";
import { Cocinero } from "../components/Screens/Cocinero";
import { Header } from "../components/ui/Header/Header";
import { NavBar } from "../components/ui/NavBar/NavBar";
import { useAuth0 } from "@auth0/auth0-react";

export const AppRouter = () => {
  const { isLoading, getAccessTokenSilently } = useAuth0();

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

  return (
    <div
      style={{
        width: "100dvw",
        height: "100dvh",
      }}
    >
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-redirect" element={<LoginRedirect />} />

        <Route path="/callback" element={<CallbackPage />} />
        <Route
          path="/Cliente"
          element={
            <ProtectedRoute allowedRoles={["Cliente", "Administrador"]}>
              <ClienteScreen />
            </ProtectedRoute>
          }
        />
        <Route path="/post-login" element={<PostLogin />} />
        <Route
          path="/Cocinero"
          element={
            <ProtectedRoute allowedRoles={["Cocinero", "Administrador"]}>
              <Cocinero />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Administrador"
          element={
            <ProtectedRoute allowedRoles={["Administrador"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        {/* especificar pagina 404 volve a un sitio seguro */}
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
};
