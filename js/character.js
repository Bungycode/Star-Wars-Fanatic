const generateCharacter = async () => {
  try {
    const characterNameContainerEl = document.querySelector(
      ".character-name-container"
    );

    const characterDetailsContainerEl = document.querySelector(
      ".character-details-container"
    );

    // Retrieve character url from api
    const localStorageCharacterData = JSON.parse(
      localStorage.getItem("character-url")
    );

    const selectedCharacterUrl = localStorageCharacterData.characterUrl;
    // console.log(selectedCharacterUrl);

    // Use character url to fetch character data
    const fetchCharacterData = await fetch(selectedCharacterUrl);
    // console.log(fetchCharacterData);
    characterData = await fetchCharacterData.json();
    // console.log(characterData);

    // Dynamically generate the character data
    const characterNameEl = document.createElement("h1");
    characterNameEl.textContent = characterData.name;
    characterNameContainerEl.appendChild(characterNameEl);

    const characterBornH2El = document.createElement("h2");
    characterBornH2El.textContent = "DOB";
    characterDetailsContainerEl.appendChild(characterBornH2El);

    const characterBornValue = document.createElement("p");
    characterBornValue.textContent = characterData.birth_year;
    characterDetailsContainerEl.appendChild(characterBornValue);

    const characterGenderH2El = document.createElement("h2");
    characterGenderH2El.textContent = "Gender";
    characterDetailsContainerEl.appendChild(characterGenderH2El);

    const characterGenderValue = document.createElement("p");
    characterGenderValue.textContent = characterData.gender;
    characterDetailsContainerEl.appendChild(characterGenderValue);

    const characterHairColorH2El = document.createElement("h2");
    characterHairColorH2El.textContent = "Hair Color";
    characterDetailsContainerEl.appendChild(characterHairColorH2El);

    const characterHairColorValue = document.createElement("p");
    characterHairColorValue.textContent = characterData.hair_color;
    characterDetailsContainerEl.appendChild(characterHairColorValue);

    const characterEyeColorH2El = document.createElement("h2");
    characterEyeColorH2El.textContent = "Eye Color";
    characterDetailsContainerEl.appendChild(characterEyeColorH2El);

    const characterEyeColorValue = document.createElement("p");
    characterEyeColorValue.textContent = characterData.eye_color;
    characterDetailsContainerEl.appendChild(characterEyeColorValue);

    const characterMoviesH2El = document.createElement("h2");
    // console.log(characterData.films.length)
    if (characterData.films.length === 1) {
      characterMoviesH2El.textContent = "Movie";
    } else {
      characterMoviesH2El.textContent = "Movies";
    }
    characterDetailsContainerEl.appendChild(characterMoviesH2El);

    const characterMoviesContainer = document.createElement("div");
    // Iterate through character's films and create dynamically in movies sections.
    for (i = 0; i < characterData.films.length; i++) {
      const characterMoviesValue = document.createElement("a");
      const fetchMovieData = await fetch(characterData.films[i]);
      // console.log(characterData)
      const movieData = await fetchMovieData.json();
      // console.log(movieData)
      const movieName = movieData.title;
      characterMoviesValue.textContent = movieName;
      characterMoviesValue.setAttribute("data-movie-url", movieData.url);
      // console.log(movieData.url)
      if (characterData.films.length === 1) {
        characterMoviesValue.setAttribute(
          "style",
          "text-align: center; padding-left: 0;"
        );
      }

      characterMoviesValue.setAttribute("href", "./movie.html");
      characterMoviesContainer.appendChild(characterMoviesValue);
      characterDetailsContainerEl.appendChild(characterMoviesContainer);
    }
    // Event listener for when movie name is clicked on
    characterDetailsContainerEl.addEventListener("click", (event) => {
      localStorage.setItem("movie-url", JSON.stringify(event.target.dataset));
    });
  } catch (error) {
    console.log(error);
  }
};

generateCharacter();
