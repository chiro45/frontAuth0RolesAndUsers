import Swal from "sweetalert2";
import { getPublicEndpoint } from "../../http";
import { Button } from "../ui/Button/Button";

export const Home = () => {
  const handleEndpointKitchener = async () => {
      try {
        await getPublicEndpoint();
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
      <h1>Bienvenido a la App de ejemplo de Auht0, esta es la vista publica</h1>
      <Button
        onClickFn={handleEndpointKitchener}
        text="Puede llamar a la api publica"
      />
    </div>
  );
};
