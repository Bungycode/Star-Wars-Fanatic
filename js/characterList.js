const characterListContainerEl = document.querySelector(
  ".character-list-container"
);
// console.log(characterListContainerEl);
const baseApi = "https://swapi.dev/api/";
let currentPage = 1;

const generateCharacterList = async () => {
  try {
    const charactersPageConfig = `${baseApi}people/?page=`;

    const getCharactersPage = `${charactersPageConfig}${currentPage}`;
    // console.log(getCharactersPage);

    const fetchCharacterPageData = await fetch(getCharactersPage);
    // console.log(response);

    const characterPageData = await fetchCharacterPageData.json();
    // console.log(characterPageData);

    // Iterate through character data from api and dynamically generate list of characters.
    for (i = 0; i < characterPageData.results.length; i++) {
      const characterButtonEl = document.createElement("a");
      // console.log(characterButtonEl);
      characterButtonEl.textContent = characterPageData.results[i].name;
      characterButtonEl.setAttribute("href", "./character.html");
      // console.log(characterPageData.results[i].url)
      characterButtonEl.setAttribute(
        "data-character-url",
        characterPageData.results[i].url
      );

      characterListContainerEl.appendChild(characterButtonEl);
    }

    nextPage = characterPageData.next;
    // console.log(nextPage);
    currentPage++;
    if (nextPage === null) {
      console.log("All character pages rendered.");
    } else {
      generateCharacterList();
    }
  } catch (error) {
    console.log(error);
  }
};

generateCharacterList();

// Event listener for when character name is clicked on
characterListContainerEl.addEventListener("click", (event) => {
  // console.log(event.currentTarget)
  // console.log(event.target)
  // console.log(event.target.dataset);
  localStorage.setItem("character-url", JSON.stringify(event.target.dataset));
});

// ES5 form of fetching data through .then()

// fetch(getCharactersPage).then(function (response) {
//   console.log(response)
//   return response.json()
// }).then(function (data) {
//   console.log(data)
//   return data
// })
