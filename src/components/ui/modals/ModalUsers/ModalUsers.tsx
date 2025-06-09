import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { WrapperModal } from "../WrapperModal/WrapperModal";
import interceptorApiClient from "../../../../interceptors/axios.interceptor";
import Swal from "sweetalert2";
import styles from "./ModalUsers.module.css";
import { IRole } from "../../../../types/Roles";
import { IUser } from "../../../../types/Users";

type Props = {
  handleCloseModal: VoidFunction;
  selectedUser?: any;
  handleGetUsers: () => Promise<void>;
};

type formValue = {
  email: string;
  name: string;
  nickName: string;
  password?: string;
  connection: string;
  roles: string[];
};
export const ModalUsers: FC<Props> = ({
  handleCloseModal,
  selectedUser,
  handleGetUsers,
}) => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [values, setValues] = useState<formValue>({
    email: selectedUser?.userEmail || "",
    name: selectedUser?.name || "",
    nickName: selectedUser?.nickName || "",
    connection: "Username-Password-Authentication",
    roles: selectedUser?.roles?.length
      ? [selectedUser.roles[0]?.auth0RoleId]
      : [""],
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await interceptorApiClient.get<IRole[]>(
          "/api/admin/roles"
        );
        setRoles(response.data);
      } catch (error) {
        Swal.fire("Error", "No se pudieron cargar los roles", "error");
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: name === "roles" ? [value] : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...values,
        roles: values.roles,
        id: selectedUser?.id,
        auth0Id: selectedUser?.auth0Id,
      };

      if (selectedUser) {
        if (!values.password) {
          delete payload.password;
        }

        await interceptorApiClient.put<IUser>(
          "/api/admin/users/modifyUser",
          payload
        );
        Swal.fire(
          "Usuario actualizado",
          "Se actualizó correctamente",
          "success"
        );
      } else {
        await interceptorApiClient.post<IUser>(
          "/api/admin/users/createUser",
          payload
        );
        Swal.fire("Usuario creado", "Se creó correctamente", "success");
      }

      await handleGetUsers();
      handleCloseModal();
    } catch (error: any) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Ocurrió un error",
        "error"
      );
    }
  };

  return (
    <WrapperModal width={40}>
      <form className={styles.containerFormUsers} onSubmit={handleSubmit}>
        <h2>{selectedUser ? "Editar Usuario" : "Crear Usuario"}</h2>

        <div className={styles.containerInputs}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.containerInputs}>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.containerInputs}>
          <label>Nickname:</label>
          <input
            type="text"
            name="nickName"
            value={values.nickName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.containerInputs}>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder={
              selectedUser ? "Dejar en blanco para no modificar" : ""
            }
            required={!selectedUser}
          />
        </div>

        <div className={styles.containerInputs}>
          <label>Rol:</label>
          <select
            name="roles"
            value={values.roles[0]}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar rol</option>
            {roles.map((role) => (
              <option key={role.id} value={role.auth0RoleId}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.containerButtons}>
          <button type="button" onClick={handleCloseModal}>
            Cancelar
          </button>
          <button type="submit">
            {selectedUser ? "Guardar Cambios" : "Crear"}
          </button>
        </div>
      </form>
    </WrapperModal>
  );
};
