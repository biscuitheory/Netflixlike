const APÎ_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "2997c5290abfb556adf35db19e36cc28";

//3
export async function fetchMovie(movieId) {
  const url = `https://api.themoviedb.org/3/movie/99?api_key=617f779f9850bfb3355824689e154920&language=fr-FR%27`;
  let res = await fetch(url);
  let movie = await res.json();
  // console.log(movie);
  return movie;
}

export async function fetchNetflixOriginals() {
  const url = `https://api.themoviedb.org/3/discover/tv?api_key=617f779f9850bfb3355824689e154920&with_networks=213`;
  let res = await fetch(url);
  let netflixOriginals = await res.json();
  // console.log(movie);
  return netflixOriginals;
}

export async function fetchTrending() {
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=617f779f9850bfb3355824689e154920`
  let res = await fetch(url);
  let trendingNow = await res.json();
  return trendingNow;
}

export async function fetchTopRated() {
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=617f779f9850bfb3355824689e154920&page=1`
  let res = await fetch(url);
  let topRated = await res.json();
  return topRated;
}

export async function fetchByGenreMovies(genre) {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=617f779f9850bfb3355824689e154920&with_genres=${genre}`
  let res = await fetch(url);
  let genreMovies = await res.json();
  return genreMovies;
}



//1
// export function fetchMovie(movieId, cb) {
//   const url = `https://api.themoviedb.org/3/movie/99?api_key=617f779f9850bfb3355824689e154920&language=fr-FR`;

//     var xhr_object = new XMLHttpRequest();
//     xhr_object.open("GET", url, false);
//     xhr_object.send(null);

//     if (xhr_object.readyState == 4) {
//       return cb(JSON.parse(xhr_object.responseText));
//     }
  
// }

//2
// export default function fetchMovie(movieId) {
//   const url = `https://api.themoviedb.org/3/movie/99?api_key=617f779f9850bfb3355824689e154920&language=fr-FR`;

//   return new Promise((resolve, reject) => {
//     var xhr_object = new XMLHttpRequest();
//     xhr_object.open("GET", url, false);
//     xhr_object.send(null);

//     if (xhr_object.readyState == 4) {
//       resolve(JSON.parse(xhr_object.responseText));
//     }
//   });
// }

// export default function fetchMovie(movieId) {
//   const url = `https://api.themoviedb.org/3/movie/99?api_key=617f779f9850bfb3355824689e154920&language=fr-FR`;
//   return fetch(url).then(res => {
//     return res.json()
//   }).then(movie => {
//       return movie;
//   })
// }
