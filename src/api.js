import { router, navigateTo } from './router.js';


export async function fetchMovies(container) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZDRhYzMxODc3NWM2NmE2MGIwYzg1ZTE1YTE5NyIsIm5iZiI6MTcxOTY5ODA0MS45NDU0NDEsInN1YiI6IjY2NTY4NzNmNzFkNTMzNjRkNjFjZGMwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c10x9a1pk8TQ3NFV-e5U1xTfOEYyI9UUihCz93VLGQI'
    }
  };

  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular', options);
    const data = await response.json();
    displayMovies(data.results, container);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

export async function fetchMovieDetails(id) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZDRhYzMxODc3NWM2NmE2MGIwYzg1ZTE1YTE5NyIsIm5iZiI6MTcxOTY5ODA0MS45NDU0NDEsInN1YiI6IjY2NTY4NzNmNzFkNTMzNjRkNjFjZGMwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c10x9a1pk8TQ3NFV-e5U1xTfOEYyI9UUihCz93VLGQI'
    }
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}

export async function getMovieFilter(year) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZDRhYzMxODc3NWM2NmE2MGIwYzg1ZTE1YTE5NyIsIm5iZiI6MTcxOTY5ODA0MS45NDU0NDEsInN1YiI6IjY2NTY4NzNmNzFkNTMzNjRkNjFjZGMwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c10x9a1pk8TQ3NFV-e5U1xTfOEYyI9UUihCz93VLGQI'
    }
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_year=${year}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

export function displayMovies(movies, container) {
  container.innerHTML = '';

  console.log("->",movies);
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
