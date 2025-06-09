import { FC, useState } from "react";
import styles from "../Tables.module.css";
import { ModalRoles } from "../../modals/ModalRoles/ModalRoles";
import Swal from "sweetalert2";
import interceptorApiClient from "../../../../interceptors/axios.interceptor";
import { IRole } from "../../../../types/Roles";

interface Props {
  roles: IRole[];
  handleGetRoles: () => Promise<void>;
}

export const RoleTable: FC<Props> = ({ roles, handleGetRoles }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<IRole | null>(null);

  const handleCreate = () => {
    setSelectedRole(null);
    setShowModal(true);
  };

  const handleEdit = (role: IRole) => {
    setSelectedRole(role);
    setShowModal(true);
  };

  const handleDelete = (roleId: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el rol permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await interceptorApiClient.delete(
          `/api/admin/roles/deleteRole?id=${roleId}`
        );
        handleGetRoles();
      }
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRole(null);
  };

  return (
    <>
      <div className={styles.tableContainer}>
        <div className={styles.createContainer}>
          <button className={styles.createButton} onClick={handleCreate}>
            Crear Rol
          </button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Auth0 Role ID</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>{role.id}</td>
                <td>{role.name}</td>
                <td>{role.description}</td>
                <td>{role.auth0RoleId}</td>
                <td>{role.deleted ? "Inactivo" : "Activo"}</td>
                <td className={styles.actions}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(role)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(role.auth0RoleId)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <ModalRoles
          handleCloseModal={handleCloseModal}
          selectedRole={selectedRole}
          handleGetRoles={handleGetRoles}
        />
      )}
    </>
  );
};
