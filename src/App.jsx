import { useEffect } from "react";
import ListBox from "./components/ListBox";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import WatchedBox from "./components/WatchedBox";
import { useState } from "react";
import SelectedMovie from "./components/SelectedMovie";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError] = useState('')
  const [query,setQuery] = useState('')
  const [selectedId,setSelectedId] = useState(null)
  const [watched, setWatched] = useState([]);

  function handleAddWatched(movie){
      setWatched(watched => [...watched,movie])
  }
  function handleSelectedMovie(id){
    setSelectedId((selectedId) => (id === selectedId? null : id))
  }
  function handleClosedMovie(){
    setSelectedId(null)
  }
  function handleDeleteWatched(id){
    setWatched(watched => watched.filter((movie)=>movie.imdbID !== id))
  }
  useEffect(function () {
    async function fetchMovies() {
      try {
        setError('')
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${query}`
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
  }, [query]);
  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      <Main>
        {isLoading && <Loader/>}
        {!isLoading && !error && <ListBox allMovies={movies} onSelectMovie={handleSelectedMovie}/>}
        {error && <ErrorMessage message={error}/>}
        {
          selectedId ? <SelectedMovie selectedId={selectedId} onCloseMovie={handleClosedMovie} onAddWatched={handleAddWatched} watched={watched}/> : <WatchedBox onDeleteWatched={handleDeleteWatched} watched={watched} />
        }
      </Main>
    </>
  );
};
function ErrorMessage({message}){
  return(
    <p className="error">
      <span>🚨</span> {message}
    </p>
  )
}

export default App;
