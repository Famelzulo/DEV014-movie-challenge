import { fetchMovies } from './counter.js';
import './style.css';
import { navigateTo, router } from './router.js';
document.addEventListener('DOMContentLoaded', () => {
  const moviesContainer = document.getElementById('movies-container');
  fetchMovies(moviesContainer);
});

// main.js


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('app').innerHTML = `
    <nav>
      <a href="/" data-link>Home</a>
      <a href="/movies" data-link>Movies</a>
    </nav>
    <div id="movies-container"></div>
  `;

  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});

