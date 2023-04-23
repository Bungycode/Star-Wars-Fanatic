const movieNameContainerEl = document.querySelector("#movie-name-container");

const localStorageMovieData = JSON.parse(localStorage.getItem("movie-url"));
console.log(localStorageMovieData.movieUrl);
const selectedMovie = localStorageMovieData.movieUrl;
console.log(selectedMovie);

fetch(selectedMovie)
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data);

    const movieNameEl = document.createElement("h1");
    movieNameEl.textContent = data.title;
    movieNameContainerEl.appendChild(movieNameEl);
  });
