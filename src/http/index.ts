import interceptorApiClient from "../interceptors/axios.interceptor";

export const postLogin = async (
  auth0Id: string,
  email: string,
  name: string,
  nickName: string
) => {
  const body = {
    auth0Id: auth0Id,
    email: email,
    name: name,
    nickName: nickName,
    connection: "google-oauth2",
  };
  const roleClient = await interceptorApiClient.get(
    `/api/admin/roles/getRoleByName?name=Cliente`
  );

  await interceptorApiClient.post("/api/admin/users/createUserClient", {
    ...body,
    roles: [`${roleClient.data.auth0RoleId}`],
  });
};

export const getClientEndpoint = async () => {
  const response = await interceptorApiClient.get("/api/client");
  return response.data;
};
export const getKitchenerEndpoint = async () => {
  const response = await interceptorApiClient.get("/api/kitchener");
  return response.data;
};

export const getPublicEndpoint = async () => {
  const response = await interceptorApiClient.get("/api/public");
  return response.data;
};
