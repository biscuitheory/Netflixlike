import { fetchMovie, fetchSerie, fetchNetflixOriginals, fetchTrending, fetchTopRated, fetchByGenreMovies, fetchSearch } from "./apiService.js";
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


            // Ciblage des éléments DOM destinés à la function recherche de contenus
            // Pour réguler le délai de traitement et d'affichage des résultats de recherche
            var timerId; 
            // Le champ de saisie pour la recherche
            var searchBoxDom = document.getElementsByClassName('navigation__container--left__input')[0];
            // Le conteneur pour l'espace dédié à la recherche
            var searchContainer = document.getElementsByClassName('search-container')[0]
            
            // Fonction initiale de recherche des contenus
            async function makeAPICall() {
                // console.log('ok')
                let searchContent = await fetchSearch(searchBoxDom.value);
                searchContent = searchContent.results
                searchContainer.innerHTML = ''
                for (let i = 0; i < searchContent.length; i++){
                    searchContainer.innerHTML += `
                    <img data-key-id=${searchContent[i].id} data-key-serie=true src="https://image.tmdb.org/t/p/original//${searchContent[i].poster_path}" class="search-movie-poster" onerror="this.style.display='none'" alt="${searchContent[i].original_title || searchContent[i].original_name}"/>
                   `
                }
            }

            // Fonction debounce : gérer la fonction de recherche et le délai de réponse (debounce en millisecondes)
            var debounceFunction = function(func, delay) {
                // Arrête l'exécution de la méthode setTimeout
                clearTimeout(timerId)
                // Exécution de la fonction de recherche après le délai
                timerId = setTimeout(func, delay)
            }

            // Ecouteur d'évènement sur le champ de saisie pour la recherche
            searchBoxDom.addEventListener('input', function() {
                // Si des charactères sont saisis dans le champ, exécution de la fonction recherche en mode debounce
                if (searchBoxDom.value.length >= 1) {
                    debounceFunction(makeAPICall, 300)
                    // affichage du conteneur dédié à la recherche
                    searchContainer.style.display = 'flex'
                    // le header et le conteneur films et séries devienent invisibles
                    document.getElementById('header').style.display = 'none'
                    document.getElementsByClassName('movies')[0].style.display = 'none'
                } else {
                    // S'il n'y aucun caractère dans le champ de saisie
                    searchContainer.innerHTML = ''
                    // le conteneur dédié à la recherche reste caché
                    searchContainer.style.display = 'none'
                    // le header et le conteneur films et séries sont visibles
                    document.getElementById('header').style.display = 'flex'
                    document.getElementsByClassName('movies')[0].style.display = 'block'
                }
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