import { fetchMovie, fetchSerie, fetchNetflixOriginals, fetchTrending, fetchTopRated, fetchByGenreMovies } from "./apiService.js";
import Header from "./components/Header.mjs";
import Modals from "./components/Modals.mjs";

(async () => {
    // data sur les Movie : pour le header
    let movie = await fetchMovie(542178);
    // récupérer les résultats des films pour le header
    document.getElementById("header").innerHTML = Header(movie);
    // affichage de l'image de fond 
    document.getElementById("header").style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
    
    // gestion de l'afficahge des modals initié à 0, le 6e appel de la fonction display va l'exécuter
    var nbAppelDisplay = 0

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

        nbAppelDisplay++
        if (nbAppelDisplay >= 6) {
            // Affichage des modales
            let images = Array.from(document.querySelectorAll('.movies__container--movie-image'))
            images.map(function(elm) {
                elm.addEventListener('click', async function() {
                    let id = this.getAttribute('data-key-id')
                    let isSerie = this.getAttribute('data-key-serie')
                    
                    if (isSerie == "true") {
                        let nbDiv = document.getElementsByClassName('js-nb')
                        if (nbDiv.length < 1) {                            
                            let serie = await fetchSerie(id)                        
                            let containerSerieNetflix = document.getElementsByClassName('movies__container--movie__netflix')[0]
                            let div = document.createElement('div')
                            div.classList.add('js-nb')
                            // implement Modals 
                            div.innerHTML = Modals(serie)
                            containerSerieNetflix.after(div)

                            // Button Cross
                            let buttonCross = document.getElementsByClassName('buttonCross')[0]
                            buttonCross.addEventListener('click', function() {
                                buttonCross.parentElement.remove()
                            })

                            // Background image Modales
                            let bgModals = document.getElementsByClassName('container-modal')[0]
                            bgModals.style.backgroundImage = `url(https://image.tmdb.org/t/p/original//${serie.backdrop_path})`                        
                        } else {
                            let removeSerie = document.getElementsByClassName('js-nb')[0].remove()
                            let serie = await fetchSerie(id)
                            let containerSerieNetflix = document.getElementsByClassName('movies__container--movie__netflix')[0]
                            let div = document.createElement('div')
                            div.classList.add('js-nb')
                            div.innerHTML = Modals(serie)
                            containerSerieNetflix.after(div)
                            let buttonCross = document.getElementsByClassName('buttonCross')[0]
                            buttonCross.addEventListener('click', function() {
                                buttonCross.parentElement.remove()
                            })
                            let bgModals = document.getElementsByClassName('container-modal')[0]
                            bgModals.style.backgroundImage = `url(https://image.tmdb.org/t/p/original//${serie.backdrop_path})`   
                        }                        
                    } else {
                        let nbDiv = document.getElementsByClassName('js-nb')                          
                        if (nbDiv.length < 1) {
                            let movie = await fetchMovie(id)
                            let parentMovie = this.parentElement
                            let divMovie = document.createElement('div')
                            divMovie.classList.add('js-nb')
                            divMovie.innerHTML = Modals(movie)
                            parentMovie.after(divMovie)
                            let buttonCross = document.getElementsByClassName('buttonCross')[0]
                            buttonCross.addEventListener('click', function() {
                                buttonCross.parentElement.remove()
                            })
                            let bgModals = document.getElementsByClassName('container-modal')[0]
                            bgModals.style.backgroundImage = `url(https://image.tmdb.org/t/p/original//${movie.backdrop_path})`
                        } else {
                            document.getElementsByClassName('js-nb')[0].remove()
                            let movie = await fetchMovie(id)
                            let parentMovie = this.parentElement
                            let divMovie = document.createElement('div')
                            divMovie.classList.add('js-nb')
                            divMovie.innerHTML = Modals(movie)
                            parentMovie.after(divMovie)
                            let buttonCross = document.getElementsByClassName('buttonCross')[0]
                            buttonCross.addEventListener('click', function() {
                                buttonCross.parentElement.remove()
                            })
                            let bgModals = document.getElementsByClassName('container-modal')[0]
                            bgModals.style.backgroundImage = `url(https://image.tmdb.org/t/p/original//${movie.backdrop_path})`
                        } 
                    }
                })
            })


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