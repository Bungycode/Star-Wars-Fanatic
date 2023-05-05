const generateCharacter = async () => {
  try {
    const characterNameContainerEl = document.querySelector(
      ".character-name-container"
    );

    const characterDetailsContainerEl = document.querySelector(
      ".character-details-container"
    );

    const favoriteBtnContainer = document.querySelector(".favorite-button-container")
    
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
    characterNameContainerEl.prepend(characterNameEl);

    // Create function to for creating character details for better optimization.
    const createCharacterDetails = (characterDetailEl, content) => {
      characterDetailEl.textContent = content;
      characterDetailsContainerEl.appendChild(characterDetailEl)
    }

    const characterBornH2El = document.createElement("h2");
    createCharacterDetails(characterBornH2El, "DOB");
    // characterBornH2El.textContent = "DOB";
    // characterDetailsContainerEl.appendChild(characterBornH2El);

    const characterBornValue = document.createElement("p");
    createCharacterDetails(characterBornValue, characterData.birth_year);
    // characterBornValue.textContent = characterData.birth_year;
    // characterDetailsContainerEl.appendChild(characterBornValue);

    const characterGenderH2El = document.createElement("h2");
    createCharacterDetails(characterGenderH2El, "Gender");
    // characterGenderH2El.textContent = "Gender";
    // characterDetailsContainerEl.appendChild(characterGenderH2El);

    const characterGenderValue = document.createElement("p");
    createCharacterDetails(characterGenderValue, characterData.gender);
    // characterGenderValue.textContent = characterData.gender;
    // characterDetailsContainerEl.appendChild(characterGenderValue);

    const characterHairColorH2El = document.createElement("h2");
    createCharacterDetails(characterHairColorH2El, "Hair Color");
    // characterHairColorH2El.textContent = "Hair Color";
    // characterDetailsContainerEl.appendChild(characterHairColorH2El);

    const characterHairColorValue = document.createElement("p");
    createCharacterDetails(characterHairColorValue, characterData.hair_color);
    // characterHairColorValue.textContent = characterData.hair_color;
    // characterDetailsContainerEl.appendChild(characterHairColorValue);

    const characterEyeColorH2El = document.createElement("h2");
    createCharacterDetails(characterEyeColorH2El, "Eye Color");
    // characterEyeColorH2El.textContent = "Eye Color";
    // characterDetailsContainerEl.appendChild(characterEyeColorH2El);

    const characterEyeColorValue = document.createElement("p");
    createCharacterDetails(characterEyeColorValue, characterData.eye_color);
    // characterEyeColorValue.textContent = characterData.eye_color;
    // characterDetailsContainerEl.appendChild(characterEyeColorValue);

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
    // Event listener for favorite feature
    
    
    // Event listener for when movie name is clicked on
    characterDetailsContainerEl.addEventListener("click", (event) => {
      localStorage.setItem("movie-url", JSON.stringify(event.target.dataset));
    });
  } catch (error) {
    console.log(error);
  }
};

generateCharacter();
