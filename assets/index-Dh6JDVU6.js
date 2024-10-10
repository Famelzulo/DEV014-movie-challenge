(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const routes = {
  "/": homeView,
  "/movies": moviesView,
  "/movie/:id": movieDetailsView,
  "/error": errorView
};
function homeView() {
  document.getElementById("app").innerHTML = `
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
    
  `;
  const filter = document.getElementById("releaseDate");
  filter.addEventListener("change", async (e) => {
    const year = e.target.value;
    console.log("a");
    const filteredMovies = await getMovieFilter(year);
    const moviesContainer2 = document.getElementById("movies-container");
    displayMovies(filteredMovies.results, moviesContainer2);
  });
  const container = document.getElementById("movies-container");
  fetchMovies(container);
}
function moviesView() {
  document.getElementById("app").innerHTML = `<div id="movies-container"></div>`;
  const container = document.getElementById("movies-container");
  fetchMovies(container);
}
async function movieDetailsView(id) {
  document.getElementById("app").innerHTML = `<div id="movie-details"></div>`;
  const container = document.getElementById("movie-details");
  const data = await fetchMovieDetails(id);
  console.log("->>", data);
  container.innerHTML = `
      <h2>${data.title}</h2>
      <p>${data.overview}</p>
      <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}">
    `;
}
function errorView() {
  document.getElementById("app").innerHTML = `
    <h2>404 Not Found</h2>
    <p>La página no fue encontrada.</p>
  `;
}
function router() {
  const path = window.location.pathname;
  const routeHandler = matchRoute(path);
  if (routeHandler) {
    routeHandler();
  } else {
    routes["/error"]();
  }
}
function matchRoute(path) {
  for (let route in routes) {
    const regex = new RegExp(`^${route.replace(/:\w+/g, "(\\w+)")}$`);
    const match = path.match(regex);
    if (match) {
      const [, ...values] = match;
      return () => routes[route](...values);
    }
  }
  return null;
}
window.addEventListener("popstate", router);
function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}
async function fetchMovies(container) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZDRhYzMxODc3NWM2NmE2MGIwYzg1ZTE1YTE5NyIsIm5iZiI6MTcxOTY5ODA0MS45NDU0NDEsInN1YiI6IjY2NTY4NzNmNzFkNTMzNjRkNjFjZGMwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c10x9a1pk8TQ3NFV-e5U1xTfOEYyI9UUihCz93VLGQI"
    }
  };
  try {
    const response = await fetch("https://api.themoviedb.org/3/movie/popular", options);
    const data = await response.json();
    displayMovies(data.results, container);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}
async function fetchMovieDetails(id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZDRhYzMxODc3NWM2NmE2MGIwYzg1ZTE1YTE5NyIsIm5iZiI6MTcxOTY5ODA0MS45NDU0NDEsInN1YiI6IjY2NTY4NzNmNzFkNTMzNjRkNjFjZGMwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c10x9a1pk8TQ3NFV-e5U1xTfOEYyI9UUihCz93VLGQI"
    }
  };
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}
async function getMovieFilter(year) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZDRhYzMxODc3NWM2NmE2MGIwYzg1ZTE1YTE5NyIsIm5iZiI6MTcxOTY5ODA0MS45NDU0NDEsInN1YiI6IjY2NTY4NzNmNzFkNTMzNjRkNjFjZGMwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c10x9a1pk8TQ3NFV-e5U1xTfOEYyI9UUihCz93VLGQI"
    }
  };
  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_year=${year}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}
function displayMovies(movies, container) {
  container.innerHTML = "";
  console.log("->", movies);
  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    const moviePoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const movieTitle = movie.title;
    movieElement.innerHTML = `
      <img src="${moviePoster}" alt="${movieTitle}">
      <h3>${movieTitle}</h3>
    `;
    movieElement.addEventListener("click", () => {
      navigateTo(`/movie/${movie.id}`);
    });
    container.appendChild(movieElement);
  });
}
router();
const moviesContainer = document.getElementById("movies-container");
fetchMovies(moviesContainer);
document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigateTo(e.target.href);
  }
});
