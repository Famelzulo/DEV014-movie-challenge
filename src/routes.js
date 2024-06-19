import { fetchMovies } from './counter.js';

export const routes = {
  '/': homeView,
  '/movies': moviesView,
  '/error': errorView
};

export function homeView() {
  document.getElementById('app').innerHTML = `
    <h2>Welcome to the Movie App</h2>
    <p>Select a genre or year to filter movies.</p>
    //crear elemento html aqui con id => movies-container(por id)

  `;
}

export function moviesView() {
    //copiar linea 19a home view despues de crear elemento html
  const container = document.getElementById('movies-container');
  fetchMovies(container); // Aquí se llama a fetchMovies para mostrar las películas
}

export function errorView() {
  document.getElementById('app').innerHTML = `
    <h2>404 Not Found</h2>
    <p>The page you are looking for does not exist.</p>
  `;
}
//aqui son pormesas