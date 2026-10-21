import { useEffect } from "react";
import ListBox from "./components/ListBox";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import WatchedBox from "./components/WatchedBox";
import { useState } from "react";
import SelectedMovie from "./components/SelectedMovie";
import { useMovies } from "./useMovies";
const App = () => {
  const [query,setQuery] = useState('')
  const [selectedId,setSelectedId] = useState(null)

  const { movies,isLoading,error } = useMovies(query)
  //const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(function(){ //passing a function to useState is called lazy initialization,this fxn must be a pure fxn receiving no arguments.
    const storedValue = localStorage.getItem('watched') //React calls that function only once, on the first render (mount), and uses its return value as the initial state. On every later re-render, React ignores it.
    return JSON.parse(storedValue)
  });

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
  useEffect(function(){ //This effect runs after render whenever watched changes (and once on mount). It writes the current state into localStorage as a JSON string, since localStorage can only store strings.
    localStorage.setItem('watched',JSON.stringify(watched))
  },[watched])

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
