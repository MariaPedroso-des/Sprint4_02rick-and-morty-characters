  const personajes = document.getElementById('character-list');
const nextPage = document.getElementById('next-page');
const prevPage = document.getElementById('prev-page');
let currentPage = 1;

function getPersonajes() {
  fetch(`https://rickandmortyapi.com/api/character/?page=684`)
    .then(response => {
      if (!response.ok)  {
        throw new Error(`Error en la petición: ${response.status}`) // errores que no son de red. Comprobaciones para nosotros
      }
      return response.json();
    })
    .then(data => {
      // Generar HTML de cada personaje
      const html = data.results.map(personaje => {
        const template =`
        <li class="personaje">
            <img src="${personaje.image}" alt="${personaje.name}">
            <h3>${personaje.name}</h3>
            <p>${personaje.species}</p>
          </li>
        `;
        return template
      }).join(''); // unir todos los <li> en una sola cadena

      // Insertar en el <ul>
      personajes.innerHTML = html;
    })
    .catch(error => {
      personajes.innerHTML = err //esto recoge errores de red
    });
}

// Cargar página inicial
getPersonajes();

// Paginación
nextPage.addEventListener('click', () => {
  currentPage++;
  getPersonajes();
});

prevPage.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    getPersonajes(

    );
  }
});