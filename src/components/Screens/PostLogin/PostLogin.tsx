import { useAuth0 } from "@auth0/auth0-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { postLogin } from "../../../http";
import styles from "./PostLogin.module.css";
import { useAuthStore } from "../../../store/useAuthStore";
import { useShallow } from "zustand/shallow";

export const PostLogin = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  // Valores iniciales sacados de user o vacío si no existe
  const [formValues, setFormValues] = useState({
    email: user?.email || "",
    name: user?.given_name || "",
    nickName: user?.nickname || "",
    connection: "google-oauth2",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const { setRol, setToken } = useAuthStore(
    useShallow((state) => ({
      setToken: state.setToken,
      setRol: state.setRol,
    }))
  );
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await postLogin(
        user?.sub!,
        formValues.email,
        formValues.name,
        formValues?.nickName
      );
      const newToken = await getAccessTokenSilently();
      setToken(newToken);
      setRol("Cliente");
      navigate("/cliente");
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.containerPostLogin}>
      <h2>Completa tu registro de cliente</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Usuario creado con éxito!</p>}
      <form className={styles.containerFormPostLogin} onSubmit={handleSubmit}>
        <div className={styles.containerInputs}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.containerInputs}>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.containerInputs}>
          <label>NickName:</label>
          <input
            type="text"
            name="nickName"
            required
            value={formValues.nickName}
            onChange={handleChange}
          />
        </div>

        {/* connection y roles no se editan, van fijos */}
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Crear Usuario"}
        </button>
      </form>
    </div>
  );
};
