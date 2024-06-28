// counter.js
import { navigateTo } from './router.js';

const apiKey = '3a78d4ac318775c66a60b0c85e15a197';
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;



export async function fetchMovies(container) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayMovies(data.results, container);
  } catch (error) {
    console.log('Error fetching movies:', error);
  }
}

export async function fetchMovieDetails(id, container) {
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  try {
    const response = await fetch(movieDetailsUrl);
    const data = await response.json();
    displayMovieDetails(data, container);
  } catch (error) {
    console.log('Error fetching movie details:', error);
  }
}

function displayMovies(movies, container) {
  container.innerHTML = '';

  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    const moviePoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const movieTitle = movie.title;

    movieElement.innerHTML = `
      <img src="${moviePoster}" alt="${movieTitle}">
      <h3>${movieTitle}</h3>
    `;

    movieElement.addEventListener('click', () => {
      navigateTo(`/movie/${movie.id}`);
    });

    container.appendChild(movieElement);
  });
}

function displayMovieDetails(movie, container) {
  container.innerHTML = `
    <h2>${movie.title}</h2>
    <p>${movie.overview}</p>
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
  `;
}

