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

function displayMovies(movies, container) {
  container.innerHTML = '';

  movies.forEach(movie => {
    // Crear elemento de película
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    // URL del póster de la película
    const moviePoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    // Título de la película
    const movieTitle = movie.title;

    // Estructura HTML de cada película
    movieElement.innerHTML = `
      <img src="${moviePoster}" alt="${movieTitle}">
      <h3>${movieTitle}</h3>
    `;

    // Agregar la película al contenedor
    container.appendChild(movieElement);
  });
}
