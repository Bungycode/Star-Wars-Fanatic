const characterListContainerEl = document.querySelector(
  ".character-list-container"
);
// console.log(characterListContainerEl);
const baseApi = "https://swapi.dev/api/";
let currentPage = 1;

const fetchCharacters = async () => {
  try {
    const charactersPageConfig = `${baseApi}people/?page=`;

    const getCharactersPage = `${charactersPageConfig}${currentPage}`;
    // console.log(getCharactersPage);

    const response = await fetch(getCharactersPage);
    // console.log(response);

    const data = await response.json();
    console.log(data);

    for (i = 0; i < data.results.length; i++) {
      const characterButtonEl = document.createElement("a");
      // console.log(characterButtonEl);
      characterButtonEl.textContent = data.results[i].name;
      characterButtonEl.classList.add("character-button");
      characterButtonEl.setAttribute("href", "./character.html");
      // console.log(data.results[i].url)
      characterButtonEl.setAttribute("data-character-url", data.results[i].url)

      characterListContainerEl.appendChild(characterButtonEl);
    }

    nextPage = data.next;
    // console.log(nextPage);
    currentPage++;
    if (nextPage === null) {
      return console.log("All character pages rendered.");
    } else {
      fetchCharacters();
    }
  } catch (error) {
    console.log(error);
  }
};

fetchCharacters();

characterListContainerEl.addEventListener('click', event => {
  // console.log(event.currentTarget)
// console.log(event.target)
console.log(event.target.dataset)
localStorage.setItem("character-url", JSON.stringify(event.target.dataset))
})

// ES5 form of fetching data through .then()

// fetch(getCharactersPage).then(function (response) {
//   console.log(response)
//   return response.json()
// }).then(function (data) {
//   console.log(data)
//   return data
// })
