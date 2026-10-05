import { useEffect, useState } from "react";
import "../App.css";
import StarRating from "./StarRating";
import Loader from "./Loader";

const SelectedMovie = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('')

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)
  const watchedUserRating = watched.find((movie)=>movie.imdbID === selectedId)?.userRating; // find the movie in the watched list
  
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() { //make a new movie object to add in the watched list
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating
    }
    onAddWatched(newWatchedMovie)
    onCloseMovie(true)
  }
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${selectedId}`,
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId],
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? 
              (
              <>
              <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
              {userRating > 0 && (<button className="btn-add" onClick={handleAdd}>+ Add to list</button>)}
              </>
              ) : 
              <p>You rated this movie {watchedUserRating}<span>⭐</span></p>
              }
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
            <p>Genre: {genre}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default SelectedMovie;
