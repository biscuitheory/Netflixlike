import {fetchMovie, fetchNetflixOriginals} from "./apiService.js";
import Header from "./components/Header.mjs";

//3
(async () => {
    let movie = await fetchMovie(157336);
    console.log(movie)
    document.getElementById("header").innerHTML = Header(movie);
    document.getElementById("header").style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;

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
