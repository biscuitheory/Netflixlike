import { fetchMovie, fetchSerie, fetchNetflixOriginals, fetchTrending, fetchTopRated, fetchByGenreMovies, fetchSearch } from "./apiService.js";
import Header from "./components/Header.mjs";
import Modals from "./components/Modals.mjs";

(async () => {
    // récupérer la data sur les films (ici un film précis)
    let movie = await fetchMovie(542178);
    // affichage dans l'élement header des données films selon le module Header
    document.getElementById("header").innerHTML = Header(movie);
    // affichage de l'image d'arrière plan dans le header
    document.getElementById("header").style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
    
    // gestion de l'afficahge des modals initié à 0, le 6e appel de la fonction display va l'exécuter
    var nbAppelDisplay = 0

    // function pour afficher les vignettes film ou série des sections : récupère données via apiService
    // funcFetch : function fetch avec ou sans paramètre (paraFunc, null par défaut, autrement désigne le genre), htmlElmt : la div conteneur de l'image, 
    async function display(funcFetch, htmlElmt, typeImg, paraFunc = null) {

        // récupère le tableau des résultats sur chaque section/catégorie de films/séries
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

        // gestion de l'affichage des modales
        // au 6e appel de la fonction display, exécution de ce qui est dans la fonction
        nbAppelDisplay++
        if (nbAppelDisplay >= 6) {
            // retourne un tableau pour sélectionner toutes les images
            let images = Array.from(document.querySelectorAll('.movies__container--movie-image'))
            // chaque image passe par une boucle 
            images.map(function(elm) {
                // écoute l'évènement click, qui déclenche la fonction suivante 
                elm.addEventListener('click', async function() {
                    // cibler l'attribut data-key-id pour récupérer l'id du contenu
                    let id = this.getAttribute('data-key-id')
                    // cibler l'attribut data-key-serie pour identifier si le contenu est une serie ou non
                    let isSerie = this.getAttribute('data-key-serie')
                    
                    // si le contenu est une serie
                    if (isSerie == "true") {
                        // 1A récupère élément conteneur pour la modale (série ou film)
                        let modalWindow = document.getElementsByClassName('modal-window')
                        // si ce conteneur est présent 
                        if (modalWindow.length < 1) {
                            // récupérer la data des séries en fonction de leur id                         
                            let serie = await fetchSerie(id)
                            // récupère le conteneur affichant les vignettes de la section séries Netflix                  
                            let containerSerieNetflix = document.getElementsByClassName('movies__container--movie__netflix')[0]
                            // création d'un conteneur pour la modale et attribution d'une classe
                            let div = document.createElement('div')        
                            div.classList.add('modal-window')
                            // affichage des données séries dans la fenêtre modale, selon le module Modals
                            div.innerHTML = Modals(serie)
                            // implémentation des modales après le conteneur de la section séries Netflix
                            containerSerieNetflix.after(div)

                            // ajout d'un bouton croix pour fermer la modale
                            let buttonCross = document.getElementsByClassName('buttonCross')[0]
                            buttonCross.addEventListener('click', function() {
                                buttonCross.parentElement.remove()
                            })

                            // affichage des images d'arrière plan dans les modales
                            let bgModals = document.getElementsByClassName('container-modal')[0]
                            bgModals.style.backgroundImage = `url(https://image.tmdb.org/t/p/original//${serie.backdrop_path})`                        
                        } else {
                            // 1B affiche pas la modale
                            let removeSerie = document.getElementsByClassName('modal-window')[0].remove()
                            // récupérer la data des séries en fonction de leur id   
                            let serie = await fetchSerie(id)
                            // récupère le conteneur affichant les vignettes de la section séries Netflix   
                            let containerSerieNetflix = document.getElementsByClassName('movies__container--movie__netflix')[0]
                            // création d'un conteneur pour la modale et attribution d'une classe
                            let div = document.createElement('div')
                            div.classList.add('modal-window')
                            // affichage des données séries dans la fenêtre modale, selon le module Modals
                            div.innerHTML = Modals(serie)
                            // implémentation des modales après le conteneur de la section séries Netflix
                            containerSerieNetflix.after(div)

                            // ajout d'un bouton croix pour fermer la modale
                            let buttonCross = document.getElementsByClassName('buttonCross')[0]
                            buttonCross.addEventListener('click', function() {
                                buttonCross.parentElement.remove()
                            })
                            // affichage des images d'arrière plan dans les modales
                            let bgModals = document.getElementsByClassName('container-modal')[0]
                            bgModals.style.backgroundImage = `url(https://image.tmdb.org/t/p/original//${serie.backdrop_path})`   
                        }                        
                    } else {
                        // 1A récupère élément conteneur pour la modale (série ou film)
                        let modalWindow = document.getElementsByClassName('modal-window')                          
                        if (modalWindow.length < 1) {
                            // récupérer la data des films en fonction de leur id
                            let movie = await fetchMovie(id)
                            // variable parentMovie : récupère l'élément parent, conteneur affichant les vignettes des sections films par genre
                            let parentMovie = this.parentElement
                            // création d'un conteneur pour la modale et attribution d'une classe
                            let divMovie = document.createElement('div')
                            divMovie.classList.add('modal-window')
                            // affichage des données films dans la fenêtre modale, selon le module Modals
                            divMovie.innerHTML = Modals(movie)
                            // implémentation des modales après le conteneur des sections films par genre
                            parentMovie.after(divMovie)

                            // ajout d'un bouton croix pour fermer la modale
                            let buttonCross = document.getElementsByClassName('buttonCross')[0]
                            buttonCross.addEventListener('click', function() {
                                buttonCross.parentElement.remove()
                            })

                            // affichage des images d'arrière plan dans les modales
                            let bgModals = document.getElementsByClassName('container-modal')[0]
                            bgModals.style.backgroundImage = `url(https://image.tmdb.org/t/p/original//${movie.backdrop_path})`
                        } else {
                            // 1B affiche pas la modale
                            let removeSerie = document.getElementsByClassName('modal-window')[0].remove()
                            // récupérer la data des films en fonction de leur id
                            let movie = await fetchMovie(id)
                            //variable parentMovie : récupère l'élément parent, conteneur affichant les vignettes des sections films par genre
                            let parentMovie = this.parentElement
                            let divMovie = document.createElement('div')
                            divMovie.classList.add('modal-window')
                            divMovie.innerHTML = Modals(movie)
                            parentMovie.after(divMovie)

                            // ajout d'un bouton croix pour fermer la modale
                            let buttonCross = document.getElementsByClassName('buttonCross')[0]
                            buttonCross.addEventListener('click', function() {
                                buttonCross.parentElement.remove()
                            })

                            // affichage des images d'arrière plan dans les modales
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