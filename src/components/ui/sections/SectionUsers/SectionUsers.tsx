import { useCallback, useEffect, useState } from "react";
import { UserTable } from "../../tables/TableUsers/UserTable";
import interceptorApiClient from "../../../../interceptors/axios.interceptor";
import { IUser } from "../../../../types/Users";

export const SectionUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const handleGetUsers = useCallback(async () => {
    const response = await interceptorApiClient.get<IUser[]>(
      "/api/admin/users"
    );
    setUsers(response.data);
  }, []);

  useEffect(() => {
    handleGetUsers();
  }, []);
  return (
    <div>
      <UserTable users={users} handleGetUsers={handleGetUsers} />
    </div>
  );
};
