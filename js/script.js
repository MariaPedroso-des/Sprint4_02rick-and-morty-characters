const personajes = document.getElementById('character-list')
const nextPage = document.getElementById('next-page');
const prevPage = document.getElementById('prev-page');
let currentPage = 1;

function getPersonajes (page) {
  fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Mensaje de error');
      }
      return response.json();
    })
    .then((data) => {
      const html = data.results.map (personaje => {
        return `<li class ='personaje'>
        <img src=${personaje.image} alt=${personaje.name}>
        <h3>${personaje.name}</h3>
        <p>${personaje.species}</p>
        </li>`;
      }).join('');
    personajes.innerHTML = html  
    })
    .catch((error) => {
      console.error(error);
      personajes.innerHTML = 'Error';
    })
  }

  getPersonajes(currentPage);
