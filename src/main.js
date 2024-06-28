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

 const Home = () => {
  const section = document.createElement('section');
  const header = document.createElement('header');
  const title = document.createElement('h1');
  title.textContent = 'Home';

  const filter = filterByYear();
  const movies = document.createElement('div');

  section.appendChild(header);
  section.appendChild(title);
  section.appendChild(filter);
  section.appendChild(movies);

  filter.addEventListener('change', async (e) => {
      try {
          const year = e.target.value;
          const response = await getMoviesByYear(year);
          movies.innerHTML = '';
          const filterResult = renderCards(response);
          movies.appendChild(filterResult);
      } catch (err) {
          console.log(err);
      }
  });

  return section;
};


