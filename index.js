import { fetchMovie, fetchSerie, fetchNetflixOriginals, fetchTrending, fetchTopRated, fetchByGenreMovies } from "./apiService.js";
import Header from "./components/Header.mjs";

(async () => {
    // data sur les Movie : pour le header
    let movie = await fetchMovie(542178);
    // récupérer les résultats des films pour le header
    document.getElementById("header").innerHTML = Header(movie);
    // affichage de l'image de fond 
    document.getElementById("header").style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;

    // function pour afficher les vignettes film ou série des sections : récupère données via apiService
    // funcFetch : function fetch avec ou sans paramètre (paraFunc, null par défaut, autrement désigne le genre), htmlElmt : la div conteneur de l'image, 
    async function display(funcFetch, htmlElmt, typeImg, paraFunc = null) {

        // data de chaque section/catégorie de films/séries
        let showsMovies = await funcFetch(paraFunc)
        showsMovies = showsMovies.results
        console.log(showsMovies)
   
        // mise en forme de l'affichage des vignettes
        htmlElmt.style.overflow = "auto"
        htmlElmt.style.display = "flex"

        // condition pour afficher les images type poster pour les séries
        if (typeImg == 'poster') {
            // en parcourant le tableau des films et séries 
            for (let i = 0; i < showsMovies.length; i++) {
                // identifier et afficher uniquement les séries
                if (showsMovies[i].id != 'null'){
                    htmlElmt.innerHTML += `
                    <img data-key-id=${showsMovies[i].id} data-key-serie=true src="https://image.tmdb.org/t/p/original//${showsMovies[i].poster_path}" class="movies__container--movie-image" onerror="this.style.display='none'" alt="Poster de ${showsMovies[i].original_title || showsMovies[i].original_name}"/>
                `
                } else {
                    continue
                } 
            }
        // condition pour afficher les images type backdrop pour les films
        } else if (typeImg == 'backdrop') {
            for (let i = 0; i < showsMovies.length; i++) {
                // identifier et afficher uniquement les films
                if (showsMovies[i].id != 'null'){
                    htmlElmt.innerHTML += `
                    <img data-key-id=${showsMovies[i].id} data-key-serie=false src="https://image.tmdb.org/t/p/original//${showsMovies[i].backdrop_path}" class="movies__container--movie-image" onerror="this.style.display='none'" alt="Image de ${showsMovies[i].original_title || showsMovies[i].original_name}"/>
                `
                } else {
                    continue
                }
            }
        }

    }

    // exécuter la fonction display
    display(fetchNetflixOriginals, document.getElementsByClassName("movies__container--movie__netflix")[0], 'poster')
    display(fetchTrending, document.getElementsByClassName("movies__container--movie")[0], 'backdrop')
    display(fetchTopRated, document.getElementsByClassName("movies__container--movie")[1], 'backdrop')
    display(fetchByGenreMovies, document.getElementsByClassName("movies__container--movie")[2], 'backdrop', 28)
    display(fetchByGenreMovies, document.getElementsByClassName("movies__container--movie")[3], 'backdrop', 35)
    display(fetchByGenreMovies, document.getElementsByClassName("movies__container--movie")[4], 'backdrop', 99)
})();