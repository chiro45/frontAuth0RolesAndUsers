import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Header.module.css";
import { Button } from "../Button/Button";
export const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  return (
    <div className={styles.containerHeader}>
      <div className={styles.containerContent}>
        <h4>App auth0</h4>
        <div className={styles.containerLoginAndLogout}>
          {!isAuthenticated ? (
            <Button
              onClickFn={() => {
                loginWithRedirect();
              }}
              text="Iniciar sesión"
            />
          ) : (
            <>
              <p>Usuario: {user?.name}</p>
              <Button
                onClickFn={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
                text="Cerrar sesión"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
