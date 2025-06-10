import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import Swal from "sweetalert2";

//TODO: documentacion axios interceptor https://axios-http.com/docs/interceptors

import { createHTTPError } from "../utils/errors";
import { useAuthStore } from "../store/useAuthStore";

const BASE_URL = import.meta.env.VITE_API_SERVER_URL; // Cambia si tu endpoint de auth es otro dominio

// Crear instancia
export const interceptorApiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, //es la demora de una peticion hasta que se cancele
});

// Añadir token a cada request => (cada vez que apuntamos a la api)
interceptorApiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuestas con lógica de renovación
//respuesta del servido
interceptorApiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    //toma el status
    const status = error.response?.status;
    //toma server message
    const serverMessage = (error.response?.data as any)?.message;

    // Si es error 500 genérico
    if (status === 500 && (!serverMessage || serverMessage.trim() === "")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong on our end. Please try again later.",
        confirmButtonColor: "#d33",
      });
    } else if (status) {
      const httpError = createHTTPError(status, serverMessage);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: httpError.message,
        confirmButtonColor: "#d33",
      });
      return Promise.reject(httpError);
    }

    // Errores de red
    Swal.fire({
      icon: "error",
      title: "Connection Error",
      text: "Unable to reach the server. Please check your internet connection or try again later.",
      confirmButtonColor: "#d33",
    });

    return Promise.reject(error);
  }
);

export default interceptorApiClient;
