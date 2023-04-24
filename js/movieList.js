const movieListContainerEl = document.querySelector(".movie-list-container");
// console.log(movieListContainerEl);
const baseApi = "https://swapi.dev/api/";

const generateMovieList = async () => {
  try {
    const starWarsMovieList= `${baseApi}films`;

    const response = await fetch(starWarsMovieList);
    // console.log(response);

    const data = await response.json();
    // console.log(data);

    // Iterate through movie data from api and dynamically generate list of movies.
    for (i = 0; i < data.results.length; i++) {
      const movieButtonEl = document.createElement("a");
      movieButtonEl.textContent = data.results[i].title;
      movieButtonEl.setAttribute("href", "./movie.html")
      movieButtonEl.setAttribute("data-movie-url", data.results[i].url)
      // console.log(data.results[i].url)
      movieListContainerEl.appendChild(movieButtonEl);
    }
    console.log("All movies rendered!");
  } catch (error) {
    console.log(error);
  }
};

generateMovieList();

// Event listener for when movie name is clicked on
movieListContainerEl.addEventListener("click", (event) => {
  // console.log(event.target.dataset)
  localStorage.setItem("movie-url", JSON.stringify(event.target.dataset))
})