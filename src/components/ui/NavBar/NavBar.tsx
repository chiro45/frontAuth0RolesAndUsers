import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthStore } from "../../../store/useAuthStore";

interface NavItem {
  path: string;
  label: string;
}

const roleBasedLinks: Record<string, NavItem[]> = {
  Cliente: [
    { path: "/", label: "Home" },
    { path: "/Cliente", label: "Cliente" },
  ],
  Cocinero: [
    { path: "/", label: "Home" },
    { path: "/Cocinero", label: "Cocinero" },
  ],
  Administrador: [
    { path: "/", label: "Home" },
    { path: "/Administrador", label: "Admin" },
    { path: "/Cliente", label: "Cliente" },
    { path: "/Cocinero", label: "Cocinero" },
  ],
};
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

export const NavBar = () => {
  const { user, isAuthenticated } = useAuth0();
  const rol =
    useAuthStore((state) => state.rol) ||
    (user && user[`${audience}/roles`]?.[0]);
    
  if (!isAuthenticated || !user) return null;

  const links = roleBasedLinks[rol] || [];

  return (
    <nav className={styles.navbar}>
      {links.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};
