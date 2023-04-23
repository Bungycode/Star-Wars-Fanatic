const charactersContainerEl = document.querySelector(".characters-container");
console.log(charactersContainerEl);
const baseApi = "https://swapi.dev/api/";
let currentPage = 1;

const fetchCharacters = async () => {
  try {
    const charactersPageConfig = `${baseApi}people/?page=`;

    const getCharactersPage = `${charactersPageConfig}${currentPage}`;
    console.log(getCharactersPage);

    const response = await fetch(getCharactersPage);
    console.log(response);

    const data = await response.json();
    console.log(data);

    for (i = 0; i < data.results.length; i++) {
      const characterButtonEl = document.createElement("button");
      console.log(characterButtonEl);
      characterButtonEl.textContent = data.results[i].name;
      characterButtonEl.classList.add('character-button')
      charactersContainerEl.appendChild(characterButtonEl);
    }

    nextPage = data.next;
    console.log(nextPage);
    currentPage++;
    if (nextPage === null) {
      return console.log("All character pages rendered.");
    } else {
      fetchCharacters()
    }
  } catch (error) {
    console.log(error);
  }
};

fetchCharacters();

// const generateCharacters = (data) => {

//   console.log(data)
// }

// fetchCharactersData(fetchCharactersData())

// ES5 form of fetching data through .then()

// fetch(getCharacters).then(function (response) {
//   console.log(response)
//   return response.json()
// }).then(function (data) {
//   console.log(data)
//   return data
// })
