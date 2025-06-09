import { FC, useState } from "react";
import styles from "../Tables.module.css";
import Swal from "sweetalert2";
import interceptorApiClient from "../../../../interceptors/axios.interceptor";
import { ModalUsers } from "../../modals/ModalUsers/ModalUsers";
import { IUser } from "../../../../types/Users";

interface Props {
  users: IUser[];
  handleGetUsers: () => Promise<void>;
}

export const UserTable: FC<Props> = ({ users, handleGetUsers }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const handleCreate = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleEdit = (user: IUser) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = (userId: string) => {
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
        await interceptorApiClient.delete(`/api/admin/users/deleteUserById`, {
          data: {
            auth0Id: userId,
          },
        });
        handleGetUsers();
      }
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };
  return (
    <>
      <div className={styles.tableContainer}>
        <div className={styles.createContainer}>
          <button className={styles.createButton} onClick={handleCreate}>
            Crear Usuario
          </button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Nombre</th>
              <th>Nick</th>
              <th>Rol</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const roleName = user.roles.map((r) => r.name).join(", ");
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.userEmail}</td>
                  <td>{user.name}</td>
                  <td>{user.nickName}</td>
                  <td>{roleName}</td>
                  <td>{user.deleted ? "Inactivo" : "Activo"}</td>
                  <td className={styles.actions}>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEdit(user)}
                    >
                      Editar
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(user.auth0Id!)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showModal && (
        <ModalUsers
          handleCloseModal={handleCloseModal}
          selectedUser={selectedUser}
          handleGetUsers={handleGetUsers}
        />
      )}
    </>
  );
};
