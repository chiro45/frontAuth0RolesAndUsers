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

export const AppRouter = () => {
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
        <Route
          path="/post-login"
          element={
            <ProtectedRoute allowedRoles={["Cliente", "Administrador"]}>
              <PostLogin />
            </ProtectedRoute>
          }
        />
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
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
};
