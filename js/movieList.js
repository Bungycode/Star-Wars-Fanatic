const movieListContainerEl = document.querySelector(".movie-list-container");
// console.log(movieListContainerEl);
const baseApi = "https://swapi.dev/api/";

const fetchCharacters = async () => {
  try {
    const starWarsMovieList= `${baseApi}films`;
    // console.log(starWarsMovieList);

    const response = await fetch(starWarsMovieList);
    // console.log(response);

    const data = await response.json();
    // console.log(data);

    for (i = 0; i < data.results.length; i++) {
      const movieButtonEl = document.createElement("a");
      // console.log(movieButtonEl);
      movieButtonEl.textContent = data.results[i].title;
      movieButtonEl.classList.add('movie-button')
      movieButtonEl.setAttribute("href", "./movie.html")
      movieListContainerEl.appendChild(movieButtonEl);
    }
    return console.log("All movies rendered!");
  } catch (error) {
    console.log(error);
  }
};

fetchCharacters();