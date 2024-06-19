import { routes } from './routes.js'; // Importa routes correctamente

export function router() {
  const path = window.location.pathname;
  const routeHandler = routes[path];
  if (routeHandler) {
    routeHandler();
  } else {
    routes['/error'](); // Si la ruta no está definida, muestra la vista de error
  }
}

// Escucha los eventos de cambio de historial
window.addEventListener('popstate', router);

// Función para navegar a una URL y actualizar el estado del historial
export function navigateTo(url) {
  history.pushState(null, null, url);
  router(); // Llama al router después de cambiar la URL
}
//poner la peliculas en direccion default