### Proyecto React con Auth0 y Roles personalizados
Este proyecto usa React con Auth0 para autenticación y autorización basada en roles. La app muestra una pantalla de carga mientras verifica la sesión, redirige según el rol y si no tiene rol asignado va a una pantalla para completar el perfil.

### Características principales
Login y logout con Auth0 usando el SDK oficial @auth0/auth0-react.

Loading state para evitar parpadeos en la UI mientras se verifica la sesión.

Roles personalizados extraídos de un claim custom en el token.

Redirección automática según rol o hacia /post-login si no tiene rol asignado.

Variables de entorno para configuración flexible.

Navegación con React Router.

### Variables de entorno
Crea un archivo .env en la raíz con estas variables de ejemplo (modificalas según tu entorno):

VITE_AUTH0_DOMAIN=tu-dominio.auth0.com
VITE_AUTH0_CLIENT_ID=tu-client-id
VITE_AUTH0_CALLBACK_URL=http://localhost:5173/callback
VITE_AUTH0_AUDIENCE=https://tu-api-audience
VITE_API_SERVER_URL=http://localhost:8081


VITE_AUTH0_DOMAIN: dominio de tu tenant Auth0.

VITE_AUTH0_CLIENT_ID: ID de cliente registrado en Auth0.

VITE_AUTH0_CALLBACK_URL: URL de callback registrada en Auth0 para redirección post login.

VITE_AUTH0_AUDIENCE: identificador del API para solicitar access tokens con claims personalizados.

VITE_API_SERVER_URL: URL base de tu backend (opcional, para llamadas API).


### Instalación y ejecución
Clona el repositorio.

Crea el .env con tus datos.

Ejecuta npm install.

Levanta la app con npm run dev.

Abre tu navegador en http://localhost:5173.

