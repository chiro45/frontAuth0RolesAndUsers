import { ChangeEvent, FC, FormEvent, useState } from "react";
import { WrapperModal } from "../WrapperModal/WrapperModal";
import styles from "./ModalRoles.module.css";
import interceptorApiClient from "../../../../interceptors/axios.interceptor";
import Swal from "sweetalert2";
import { IRole } from "../../../../types/Roles";

type Props = {
  handleCloseModal: VoidFunction;
  selectedRole?: IRole | null;
  handleGetRoles: () => Promise<void>;
};

export const ModalRoles: FC<Props> = ({
  handleCloseModal,
  selectedRole,
  handleGetRoles,
}) => {
  const [values, setValues] = useState({
    name: selectedRole?.name || "",
    description: selectedRole?.description || "",
  });

  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (selectedRole) {
        await interceptorApiClient.put<IRole>("/api/admin/roles/modifyRole", {
          id: selectedRole.id,
          description: values.description,
          name: values.name,
          auth0RoleId: selectedRole.auth0RoleId,
        });
        Swal.fire(
          "Rol actualizado",
          "El rol se actualizó correctamente",
          "success"
        );
      } else {
        await interceptorApiClient.post<IRole>("/api/admin/roles/createRole", {
          description: values.description,
          name: values.name,
        });
        Swal.fire("Rol creado", "El rol se creó correctamente", "success");
      }

      await handleGetRoles();
      handleCloseModal();
    } catch (error: any) {
      // El interceptor maneja errores, pero por si acaso:
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Ocurrió un error al guardar el rol.",
        "error"
      );
    }
  };

  return (
    <WrapperModal width={30}>
      <form className={styles.containerFormRoles} onSubmit={handleSubmit}>
        <h2>{selectedRole ? "Editar Rol" : "Crear Rol"}</h2>

        <div className={styles.containerInputs}>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleValue}
            required
          />
        </div>

        <div className={styles.containerInputs}>
          <label>Descripción:</label>
          <input
            type="text"
            name="description"
            value={values.description}
            onChange={handleValue}
            required
          />
        </div>

        <div className={styles.containerButtons}>
          <button type="button" onClick={handleCloseModal}>
            Cancelar
          </button>
          <button type="submit">
            {selectedRole ? "Guardar Cambios" : "Crear"}
          </button>
        </div>
      </form>
    </WrapperModal>
  );
};
