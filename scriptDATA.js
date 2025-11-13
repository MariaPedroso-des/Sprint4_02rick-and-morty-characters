// tenemos que ver que el endpoint funciona. https://rickandmortyapi.com/api/character/?page=1
// Traer los elementos de ese endpoint y comprobarlo
// Una vez tengo esos elementos colocarlos en la página
// cuando tengo una de las páginas en mi web podré traer el resto de páginas
// capturar botones de página prev y next
// al pulsar prev page tiene que bajar una página -1. Al hacer next page tiene que aumentar una página +1
// poner todo bonito con CSS
// Funcione todo

const characterList = document.getElementById("character-list")
const prevPage = document.getElementById("prev-page")
const nextPage = document.getElementById("next-page")
let currentPage = 1
let finalPage = 42

function getCharacters() {
  fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
  .then(response => {
    if(!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`)
    } 
    return response.json()
  })
  .then(data => {
    finalPage = data.info.pages
    const characters = data.results.map(character => {
      const template = `
      <li>
      <img src="${character.image}" alt="${character.name}" />
      <h2><strong>Nombre:</strong> ${character.name}</h2>
      <p><strong>Especie:</strong> ${character.species}</p>
      </li>
      `
      return template
    }).join("")
    characterList.innerHTML = characters
    removeButton()
    console.log("Esta es la última página", finalPage)
  })
  .catch(err => {
    characterList.innerHTML = `<h3 class="error">${err}</h3>`
  })
}

function removeButton() {
  currentPage === 1  ? prevPage.classList.add("disabled") : prevPage.classList.remove("disabled")
  currentPage === finalPage ? nextPage.classList.add("disabled") : nextPage.classList.remove("disabled")
}

prevPage.addEventListener("click", () => {
  if(currentPage > 1) {
    currentPage--
    console.log("estamos en la página: ",currentPage)
    getCharacters()
  }
})


nextPage.addEventListener("click", () => {
  if(currentPage < finalPage) {
    currentPage++
    console.log("estamos en la página: ",currentPage)
    getCharacters()
  } 
})


getCharacters()


