// Obtener los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const actorId = urlParams.get("id");
const peliculasConocidas = decodeURIComponent(urlParams.get("known_for"));

fetch(
  `https://api.themoviedb.org/3/person/${actorId}?api_key=d13c9cff64cdd415463b6c8ead08c95e`
)
  .then((response) => response.json())
  .then((data) => {
    const actorContenedor = document.getElementById("actorContenedor");

   
    const imagenActor = document.createElement("img");
    imagenActor.src = `https://image.tmdb.org/t/p/w500${data.profile_path}`;
    imagenActor.alt = data.name;
    actorContenedor.appendChild(imagenActor);

    
    const nombreActor = document.createElement("h3");
    nombreActor.textContent = data.name;
    nombreActor.classList.add("nombreActor")
    actorContenedor.appendChild(nombreActor);

    
    const biografiaContenedor = document.getElementById("biografiaContenedor");
    const biografiaActor = document.createElement("p");
    biografiaActor.textContent = data.biography;
    biografiaContenedor.appendChild(biografiaActor);

    
    const peliculasConocidasContainer = document.querySelector(".peliculasConocidasContainer");

    
    if (peliculasConocidas) {
      const peliculasConocidasArray = peliculasConocidas.split(", ");
      const peliculasConocidasValidas = peliculasConocidasArray.filter(
        (pelicula) => pelicula.trim() !== "undefined" && pelicula.trim() !== ""
      );

      if (peliculasConocidasValidas.length > 0) {
        peliculasConocidasValidas.forEach((pelicula) => {
          const peliculaElemento = document.createElement("div");
          peliculaElemento.classList.add("peliculaConocida");

          
          fetch(`https://api.themoviedb.org/3/search/movie?api_key=d13c9cff64cdd415463b6c8ead08c95e&query=${pelicula}`)
            .then((response) => response.json())
            .then((peliculaData) => {
              if (peliculaData.results && peliculaData.results.length > 0) {
                const posterPath = peliculaData.results[0].poster_path;
                const posterURL = `https://image.tmdb.org/t/p/w200${posterPath}`;
                const posterImagen = document.createElement("img");
                posterImagen.src = posterURL;
                peliculaElemento.appendChild(posterImagen);
              }
            })
            .catch((error) => {
              console.log("Error al cargar el poster del actor:", error);
            });

          
          const tituloPelicula = document.createElement("p");
          tituloPelicula.textContent = pelicula;
          peliculaElemento.appendChild(tituloPelicula);
          peliculasConocidasContainer.appendChild(peliculaElemento);
        });
      } else {
        peliculasConocidasContainer.textContent = "No hay actores conocidos disponibles.";
      }
    } else {
      peliculasConocidasContainer.textContent = "No hay actores conocidos disponibles.";
    }
  })
  .catch((error) => {
    console.log("Error al cargar la información del actor:", error);
  });
