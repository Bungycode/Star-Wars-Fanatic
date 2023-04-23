const characterNameContainerEl = document.querySelector(
  "#character-name-container"
);
console.log(characterNameContainerEl);

const localStorageCharacterData = JSON.parse(
  localStorage.getItem("character-url")
);
console.log(localStorageCharacterData.characterUrl);
const selectedCharacter = localStorageCharacterData.characterUrl;
console.log(selectedCharacter);

fetch(selectedCharacter)
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data);

    const characterNameEl = document.createElement("h1");
    characterNameEl.textContent = data.name;
    characterNameContainerEl.appendChild(characterNameEl);
  });
