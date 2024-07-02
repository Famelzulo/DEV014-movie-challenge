import './style.css';
import { fetchMovies } from './app.js';
import { navigateTo, router } from './router.js';



router();

const moviesContainer = document.getElementById('movies-container');

fetchMovies(moviesContainer);

document.body.addEventListener('click', (e) => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    navigateTo(e.target.href);
  }
});

// document.addEventListener('DOMContentLoaded', async () => {
  // obtenemos el contenedor de películas y se cargan las películas iniciales
  // const moviesContainer = document.getElementById('movies-container');
  // fetchMovies(moviesContainer);

  // Se define la estructura HTML inicial
  // document.getElementById('app').innerHTML = `
  //   <nav>
  //     <a href="/" data-link>Home</a>
  //     <a href="/movies" data-link>Movies</a>
  //   </nav>
  //   <div id="movies-container"></div>
  // `;

  // Escuchar los clics en los enlaces
  // document.body.addEventListener('click', (e) => {
  //   if (e.target.matches('[data-link]')) {
  //     e.preventDefault();
  //     navigateTo(e.target.href);
  //   }
  // });

  // Iniciar el enrutamiento
  // router();
// });


  // Configurar el filtro de año
  // const filter = document.getElementById('releaseDate');
  // filter.addEventListener ('change', async (e) => {
  //   const year = e.target.value;
  //   console.log("a");
  //   const filteredMovies = await getMovieFilter(year);
  //   displayMovies(filteredMovies, moviesContainer);
  // });

  // Iniciar el enrutamiento
  // router();
