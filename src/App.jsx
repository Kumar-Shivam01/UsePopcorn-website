import { useEffect } from "react";
import ListBox from "./components/ListBox";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import WatchedBox from "./components/WatchedBox";
import { useState } from "react";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError] = useState('')
  useEffect(function () {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=interstellar`,
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies.");
        const data = await res.json();
        if(data.Response === 'false') throw new Error('Movie not found')
        setMovies(data.Search);
        console.log(data)
      } catch (err) {
        console.log(err.message);
        setError(err.message)
      } finally{
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);
  return (
    <>
      <Navbar movies={movies} />
      <Main>
        {isLoading && <Loader/>}
        {!isLoading && !error && <ListBox allMovies={movies}/>}
        {error && <ErrorMessage message={error}/>}
        <WatchedBox tempWatchedData={tempWatchedData} />
      </Main>
    </>
  );
};
function Loader() {
  return <p className="loader">Loading...</p>;
}
function ErrorMessage({message}){
  return(
    <p className="error">
      <span>X</span> {message}
    </p>
  )
}

export default App;
