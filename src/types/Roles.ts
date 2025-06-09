export interface IRole {
  id: number;
  name: string;
  description: string;
  auth0RoleId: string;
  deleted: boolean;
}

export interface ICreateRole {
  name: string;
  description: string;
}
