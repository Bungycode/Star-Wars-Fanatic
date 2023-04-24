const characterNameContainerEl = document.querySelector(
  "#character-name-container"
);
console.log(characterNameContainerEl);

const localStorageCharacterData = JSON.parse(
  localStorage.getItem("character-url")
);
console.log(localStorageCharacterData.characterUrl);
const selectedCharacterUrl = localStorageCharacterData.characterUrl;
console.log(selectedCharacterUrl);

fetch(selectedCharacterUrl)
  .then((fetchCharacterData) => {
    console.log(fetchCharacterData);
    return fetchCharacterData.json();
  })
  .then((characterData) => {
    console.log(characterData);

    const characterNameEl = document.createElement("h1");
    characterNameEl.textContent = characterData.name;
    characterNameContainerEl.appendChild(characterNameEl);
  });
