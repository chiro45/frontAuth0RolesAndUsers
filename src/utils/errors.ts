export class HTTPError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "HTTPError";
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}

export function mapStatusToError(status: number): HTTPError {
  switch (status) {
    case 400:
      return new HTTPError(
        400,
        "No se pudo procesar la solicitud. Verificá los datos e intentá de nuevo."
      );
    case 401:
      return new HTTPError(
        401,
        "Autenticación requerida. Iniciá sesión para continuar."
      );
    case 403:
      return new HTTPError(403, "No tenés permisos para realizar esta acción.");
    case 404:
      return new HTTPError(404, "Recurso no encontrado. Verificá la URL.");
    case 405:
      return new HTTPError(
        405,
        "Esta acción no está permitida en el contexto actual."
      );
    case 500:
      return new HTTPError(
        500,
        "Ocurrió un error interno en el servidor. Intentá más tarde o contactá al soporte."
      );

    default:
      return new HTTPError(
        status,
        `Ocurrió un error inesperado (código ${status}). Intentá de nuevo.`
      );
  }
}

export function createHTTPError(
  status: number,
  serverMessage?: string
): HTTPError {
  return serverMessage?.trim()
    ? new HTTPError(status, serverMessage)
    : mapStatusToError(status);
}
