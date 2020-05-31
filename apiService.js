const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "2997c5290abfb556adf35db19e36cc28";

export async function fetchMovie(movieId) {
  const url = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
  let res = await fetch(url);
  let movie = await res.json();
  return movie;
}

export async function fetchSerie(serieId) {
  const url = `${API_URL}tv/${serieId}?api_key=${API_KEY}`;
  let res = await fetch(url);
  let serie = await res.json();
  return serie;
}  

export async function fetchNetflixOriginals() {
  const url = `${API_URL}discover/tv?api_key=${API_KEY}&with_networks=213`;
  let res = await fetch(url);
  let netflixOriginals = await res.json();
  return netflixOriginals;
}

export async function fetchTrending() {
  const url = `${API_URL}trending/all/day?api_key=${API_KEY}`
  let res = await fetch(url);
  let trendingNow = await res.json();
  return trendingNow;
}

export async function fetchTopRated() {
  const url = `${API_URL}movie/top_rated?api_key=${API_KEY}&page=1`
  let res = await fetch(url);
  let topRated = await res.json();
  return topRated;
}

export async function fetchByGenreMovies(genre) {
  const url = `${API_URL}discover/movie?api_key=${API_KEY}&with_genres=${genre}`
  let res = await fetch(url);
  let genreMovies = await res.json();
  return genreMovies;
}

export async function fetchSearch(query){
  const url =`${API_URL}search/multi?api_key=${API_KEY}&query=${query}&include_adult=false`
   let res = await fetch(url)
   let queryMovies = await res.json()
   return queryMovies;
}