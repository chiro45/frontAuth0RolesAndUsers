import { IRole } from "./Roles";

export interface IUser {
  id?: number;
  name: string;
  lastName: string | null;
  nickName: string;
  userEmail: string;
  auth0Id?: string;
  deleted: boolean;
  roles: IRole[];
}