import Swal from "sweetalert2";
import { getKitchenerEndpoint } from "../../http";
import { Button } from "../ui/Button/Button";

export const Cocinero = () => {
  const handleEndpointKitchener = async () => {
    try {
      await getKitchenerEndpoint();
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Se obtuvo el endpoint correctamente.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo obtener el endpoint.",
      });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50dvh",
      }}
    >
      <h1>
        Bienvenido a la App de ejemplo de Auht0, esta es la vista de cocinero
      </h1>
      <Button
        onClickFn={handleEndpointKitchener}
        text="Puede llamar a la api privada de cocinero"
      />
    </div>
  );
};
