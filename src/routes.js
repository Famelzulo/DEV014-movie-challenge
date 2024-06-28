import { fetchMovies, fetchMovieDetails } from './counter.js'; // Ajusta la ruta si es necesario

export const routes = {
  '/': homeView,
  '/movies': moviesView,
  '/movie/:id': movieDetailsView,
  '/error': errorView
};

export function homeView() {
  document.getElementById('app').innerHTML = `
    <div id="movies-container"></div>
    <div id="image-container">
      <img id="top-img" src="https://i.ytimg.com/vi/BKLTFN4rgSU/hqdefault.jpg">
    </div>
  `;
  const container = document.getElementById('movies-container');
  fetchMovies(container);
}

export function moviesView() {
  document.getElementById('app').innerHTML = `<div id="movies-container"></div>`;
  const container = document.getElementById('movies-container');
  fetchMovies(container);
}

export function movieDetailsView(id) {
  document.getElementById('app').innerHTML = `<div id="movie-details"></div>`;
  const container = document.getElementById('movie-details');
  fetchMovieDetails(id, container);
}

export function errorView() {
  document.getElementById('app').innerHTML = `
    <h2>404 Not Found</h2>
    <p>La página no fue encontrada.</p>
  `;
}
