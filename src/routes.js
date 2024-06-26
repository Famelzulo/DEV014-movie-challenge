// routes.js
import { fetchMovies, fetchMovieDetails } from './counter.js';

export const routes = {
  '/': homeView,
  '/movies': moviesView,
  '/movie/:id': movieDetailsView,
  '/error': errorView
};
//aumentamos una vista mas moviedetailsview

export function homeView() {
  document.getElementById('app').innerHTML = `
    <h2>Welcome to the Movie App</h2>
    <p>Selecciona el genero o año en el filtro de las pleiculas  .</p>
    <div id="movies-container"></div>
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
    <p>The Pagina no encontrada.</p>
  `;
}

//aqui son pormesas_  //crear elemento html aqui con id => movies-container(por id)
//crear 