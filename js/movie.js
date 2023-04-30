const generateMovie = async () => {
  try {
    const movieNameContainerEl = document.querySelector(
      ".movie-name-container"
    );

    const movieDetailsContainerEl = document.querySelector(
      ".movie-details-container"
    );

    // Retrieve movie url from api
    const localStorageMovieData = JSON.parse(localStorage.getItem("movie-url"));

    const selectedMovieUrl = localStorageMovieData.movieUrl;
    // console.log(selectedMovieUrl);

    // Use movie url to fetch movie data
    const fetchMovieData = await fetch(selectedMovieUrl);
    // console.log(fetchMovieData);
    movieData = await fetchMovieData.json();
    // console.log(movieData);

    // Dynamically generate the movie data
    const movieNameEl = document.createElement("h1");
    movieNameEl.textContent = movieData.title;
    movieNameContainerEl.prepend(movieNameEl);
    
    // Create function to for creating movie details for better optimization.
    const createMovieDetails = (movieDetailEl, content) => {
      movieDetailEl.textContent = content;
      movieDetailsContainerEl.appendChild(movieDetailEl)
    }

    const movieDirectorH2El = document.createElement("h2");
    createMovieDetails(movieDirectorH2El, "Director");
    // movieDirectorH2El.textContent = "Director";
    // movieDetailsContainerEl.appendChild(movieDirectorH2El);

    const movieDirectorValue = document.createElement("p");
    createMovieDetails(movieDirectorValue, movieData.director);
    // movieDirectorValue.textContent = movieData.director;
    // movieDetailsContainerEl.appendChild(movieDirectorValue);

    const movieReleaseDateH2El = document.createElement("h2");
    createMovieDetails(movieReleaseDateH2El, "Release Date");
    // movieReleaseDateH2El.textContent = "Release Date";
    // movieDetailsContainerEl.appendChild(movieReleaseDateH2El);

    const movieReleaseValue = document.createElement("p");
    createMovieDetails(movieReleaseValue, movieData.release_date.substring(0, 4));
    // movieReleaseValue.textContent = movieData.release_date.substring(0, 4);
    // console.log(movieData)
    // movieDetailsContainerEl.appendChild(movieReleaseValue);

    const movieOpeningCrawlH2El = document.createElement("h2");
    createMovieDetails(movieOpeningCrawlH2El, "Opening Crawl");
    // movieOpeningCrawlH2El.textContent = "Opening Crawl";
    // movieDetailsContainerEl.appendChild(movieOpeningCrawlH2El);

    const movieOpeningCrawlValue = document.createElement("p");
    createMovieDetails(movieOpeningCrawlValue, movieData.opening_crawl);
    // movieOpeningCrawlValue.textContent = movieData.opening_crawl;
    // movieDetailsContainerEl.appendChild(movieOpeningCrawlValue);

    const movieCharactersH2El = document.createElement("h2");
    createMovieDetails(movieCharactersH2El, "Characters");
    // movieCharactersH2El.textContent = "Characters";
    // movieDetailsContainerEl.appendChild(movieCharactersH2El);

    const movieCharactersContainer = document.createElement("div");
    // Iterate through movie's characters and create dynamically in characters sections.
    for (i = 0; i < movieData.characters.length; i++) {
      const movieCharactersValue = document.createElement("a");
      const fetchCharacterData = await fetch(movieData.characters[i]);
      // console.log(fetchCharacterData);
      const characterData = await fetchCharacterData.json();
      const characterName = characterData.name;
      movieCharactersValue.textContent = characterName;
      movieCharactersValue.setAttribute(
        "data-character-url",
        movieData.characters[i]
      );
      movieCharactersValue.setAttribute("href", "./character.html");
      movieCharactersContainer.appendChild(movieCharactersValue);
      movieDetailsContainerEl.appendChild(movieCharactersContainer);

    }
    // Event listener for when character name is clicked on
    movieDetailsContainerEl.addEventListener("click", (event) => {
      localStorage.setItem(
        "character-url",
        JSON.stringify(event.target.dataset)
      );
    });
  } catch (error) {
    console.log(error);
  }
};

generateMovie();
