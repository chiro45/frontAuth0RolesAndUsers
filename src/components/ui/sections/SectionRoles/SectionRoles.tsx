import { useCallback, useEffect, useState } from "react";
import { RoleTable } from "../../tables/TableRoles/TableRoles";
import interceptorApiClient from "../../../../interceptors/axios.interceptor";
import { IRole } from "../../../../types/Roles";

export const SectionRoles = () => {
  const [roles, setRoles] = useState<IRole[]>([]);

  const handleGetRoles = useCallback(async () => {
    const response = await interceptorApiClient.get<IRole[]>(
      "/api/admin/roles"
    );
    setRoles(response.data);
  }, []);
  
  useEffect(() => {
    handleGetRoles();
  }, []);
  
  return (
    <div>
      <RoleTable roles={roles} handleGetRoles={handleGetRoles} />
    </div>
  );
};
