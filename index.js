import {fetchMovie, fetchNetflixOriginals, fetchTrending, fetchTopRated, fetchByGenreMovies} from "./apiService.js";
import Header from "./components/Header.mjs";

//3
(async () => {
    let movie = await fetchMovie(157336);
    // console.log(movie)
    document.getElementById("header").innerHTML = Header(movie);
    document.getElementById("header").style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;

    //data sur les netflixOriginals
    let netflixOriginals = await fetchNetflixOriginals();
    netflixOriginals = netflixOriginals.results;
    //sectionOriginals structure de la section
    let sectionOriginals = document.getElementsByClassName("movies__container--movie__netflix")[0]
    // récupérer les résultats de la section Netflix Originals
    for (let i = 0; i < netflixOriginals.length; i++) {
        sectionOriginals.innerHTML += `
            <img data-key-id=${netflixOriginals[i].id} src="https://image.tmdb.org/t/p/original//${netflixOriginals[i].poster_path}" class="movies__container--movie-image"/>
            `
    }
    sectionOriginals.style.overflow = "auto"
    sectionOriginals.style.display = "flex"

    //data sur les netflixTrending
    let netflixTrending = await fetchTrending();
    netflixTrending = netflixTrending.results
    //moviesContainer des sections suivantes
    let moviesContainer = document.getElementsByClassName("movies__container--movie")
    //trending structure de la section
    let trending = moviesContainer[0]
    // récupérer les résultats de la section "Trending Now"
    for (let i = 0; i < netflixTrending.length; i++) {
        trending.innerHTML += `
        <img data-key-id=${netflixTrending[i].id} src="https://image.tmdb.org/t/p/original//${netflixTrending[i].backdrop_path}" class="movies__container--movie-image"/>
        `
    }
    trending.style.overflow = "auto"
    trending.style.display = "flex"

    //data sur les netflixTopRated
    let netflixTopRated = await fetchTopRated();
    netflixTopRated = netflixTopRated.results
    //trending structure de la section
    let topRated = moviesContainer[1]
    // récupérer les résultats de la section "Top Rated"
    for (let i = 0; i < netflixTopRated.length; i++) {
        topRated.innerHTML += `
        <img data-key-id=${netflixTopRated[i].id} src="https://image.tmdb.org/t/p/original//${netflixTopRated[i].backdrop_path}" class="movies__container--movie-image"/> `
    }
    topRated.style.overflow = "auto"
    topRated.style.display = "flex"

    //data sur les moviesGenreAction
    let moviesGenreAction = await fetchByGenreMovies(28)
    moviesGenreAction = moviesGenreAction.results
    //actionMovie structure de la section
    let actionMovies = moviesContainer[2]
    // récupérer les résultats des films de genre Action
    for (let i = 0; i < moviesGenreAction.length; i++) {
        // console.log(movieGenreActions)
        actionMovies.innerHTML += ` 
        <img data-key-id=${moviesGenreAction[i].id} src="https://image.tmdb.org/t/p/original//${moviesGenreAction[i].backdrop_path}" class="movies__container--movie-image"/>`
    }
    actionMovies.style.overflow = "auto"
    actionMovies.style.display = "flex"

    //data sur les moviesGenreComedy
    let moviesGenreComedy = await fetchByGenreMovies(35)
    moviesGenreComedy = moviesGenreComedy.results
    //comedyMovie structure de la section
    let comedyMovies = moviesContainer[3]
    // récupérer les résultats des films de genre Comedy
    for (let i = 0; i < moviesGenreComedy.length; i++) {
        // console.log(movieGenreComedy)
        comedyMovies.innerHTML += ` 
        <img data-key-id=${moviesGenreComedy[i].id} src="https://image.tmdb.org/t/p/original//${moviesGenreComedy[i].backdrop_path}" class="movies__container--movie-image"/>`
    }
    comedyMovies.style.overflow = "auto"
    comedyMovies.style.display = "flex"

    //data sur les moviesGenreDocumentary
    let moviesGenreDocumentary = await fetchByGenreMovies(99)
    moviesGenreDocumentary = moviesGenreDocumentary.results
    //documentaryMovie structure de la section
    let documentaryMovies = moviesContainer[4]
    // récupérer les résultats des films de genre Documentary
    for (let i = 0; i < moviesGenreDocumentary.length; i++) {
        // console.log(movieGenreDocumentary)
        documentaryMovies.innerHTML += ` 
        <img data-key-id=${moviesGenreDocumentary[i].id} src="https://image.tmdb.org/t/p/original//${moviesGenreDocumentary[i].backdrop_path}" class="movies__container--movie-image"/>`
    }
    documentaryMovies.style.overflow = "auto"
    documentaryMovies.style.display = "flex"
})();


// (() => {
//   //Callback
//   const getResponse = (data) => {
//     return data;
//   };
//   try {
//     let movie = fetchMovie(157336, getResponse);
//     console.log(movie);
//     document.getElementById("header").innerHTML = Header(movie);
//     document.getElementById("header").style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
//   }
//   catch(e){
//     console.log(e)
//   }

// })();

//2
// (() => {
//     let movie = fetchMovie(157336).then(movie => {
//         console.log(movie)
//         document.getElementById("header").innerHTML = Header(movie);
//         document.getElementById("header").style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
//     })

// })();
