import './style.css';
import { fetchMovies } from './counter.js';
import { navigateTo, router } from './router.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Se obtiene el contenedor de películas y se cargan las películas iniciales
  const moviesContainer = document.getElementById('movies-container');
  fetchMovies(moviesContainer);

  // Se define la estructura HTML inicial
  document.getElementById('app').innerHTML = `
    <nav>
      <a href="/" data-link>Home</a>
      <a href="/movies" data-link>Movies</a>
    </nav>
    <div id="movies-container"></div>
  `;

  // Escuchar los clics en los enlaces
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  // Iniciar el enrutamiento
  router();
});




