//todo lo relacionado a las vistas

import { fetchMovies, fetchMovieDetails, getMovieFilter , displayMovies} from './app.js'; // Ajusta la ruta si es necesario

export const routes = {
  '/': homeView,
  '/movies': moviesView,
  '/movie/:id': movieDetailsView,
  '/error': errorView
};
//primera vista

export function homeView() {
  document.getElementById('app').innerHTML = `
    <div id="movies-container"></div>
    <div id="image-container">
      <img id="top-img" src="https://i.ytimg.com/vi/BKLTFN4rgSU/hqdefault.jpg">
    </div>
     <div id="filter">
      <label for="releaseDate">Filter by year</label>
      <select name="releaseDate" id="releaseDate">
          <option disabled selected value >Buscador</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
      </select> 
  </div>
    
  `
  const filter = document.getElementById('releaseDate');
  filter.addEventListener ('change', async (e) => {
    const year = e.target.value;
    console.log("a");
    const filteredMovies = await getMovieFilter(year);
    // document.getElementById('movies-container');
    const moviesContainer = document.getElementById('movies-container');
    displayMovies(filteredMovies.results, moviesContainer);
  });

  ;

  const container = document.getElementById('movies-container');
  fetchMovies(container);
}
//vista de las peliculas

export function moviesView() {
  document.getElementById('app').innerHTML = `<div id="movies-container"></div>`;
  const container = document.getElementById('movies-container');
  fetchMovies(container);
}
//vistas de los detalles de una pelicula individual

export async function movieDetailsView(id) {
  document.getElementById('app').innerHTML = `<div id="movie-details"></div>`;
  const container = document.getElementById('movie-details');
    //  fetchMovieDetails(id, container);
    const data = await fetchMovieDetails(id);
    console.log("->>" , data);
     container.innerHTML = `
      <h2>${data.title}</h2>
      <p>${data.overview}</p>
      <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}">
    `
  }

//pagina de error 

export function errorView() {
  document.getElementById('app').innerHTML = `
    <h2>404 Not Found</h2>
    <p>La página no fue encontrada.</p>
  `;
}

