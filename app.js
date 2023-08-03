const cargarPopular = async () => {
  try {
    const respuesta = await fetch(
      "https://api.themoviedb.org/3/person/popular?api_key=d13c9cff64cdd415463b6c8ead08c95e"
    );

    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      let actorHTML = "";

      datos.results.forEach((actor) => {
        let peliculasConocidas = "";

        actor.known_for.forEach((pelicula) => {
          peliculasConocidas += pelicula.title + ", ";
        });

        peliculasConocidas = peliculasConocidas.slice(0, -2);

        
        actorHTML += `
          <div class="actor">
            <a href="actor.html?id=${actor.id}&known_for=${encodeURIComponent(peliculasConocidas)}">
              <img class="poster" src="https://image.tmdb.org/t/p/w500${actor.profile_path}" alt="${actor.name}">
              <h3 class="titulo">${actor.name}</h3>
             
            </a>
          </div>`;
      });

      document.getElementById('contenedor').innerHTML = actorHTML;
    } else if (respuesta.status === 401) {
      console.log("los datos ingresados en la petición son incorrectos");
    } else if (respuesta.status === 404) {
      console.log("la peli que buscas no existe");
    } else {
      console.log("ocurrió un error desconocido");
    }
  } catch (error) {
    console.log(error);
  }
};

cargarPopular();
