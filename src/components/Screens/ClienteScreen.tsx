import Swal from "sweetalert2";
import { getClientEndpoint } from "../../http";
import { Button } from "../ui/Button/Button";

export const ClienteScreen = () => {

  const handleEndpointClient = async()=>{
   try {
     await getClientEndpoint();
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
  }
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
        Bienvenido a la App de ejemplo de Auht0, esta es la vista de cliente
      </h1>
      <Button
        onClickFn={handleEndpointClient}
        text="Puede llamar a la api privada de cliente"
      />
    </div>
  );
};
