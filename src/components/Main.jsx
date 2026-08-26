import { useState } from "react";
import "../App.css";
import Movie from "./Movie";
const Main = ({ allMovies,tempWatchedData }) => {
  const [isOpenAll, setIsOpenAll] = useState(true);
  const [isOpenWatched, setIsOpenWatched] = useState(true);
  //const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <main className="main">
      <div className="box">
        <button
          onClick={() => setIsOpenAll((open) => !open)}
          className="btn-toggle"
        >
          {isOpenAll ? "-" : "+"}
        </button>
        {isOpenAll && (
          <ul className="list">
            {allMovies?.map((movie) => (
              <Movie movie={movie}/>
            ))}
          </ul>
        )}
      </div>

      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpenWatched((open) => !open)}
        >
          {isOpenWatched ? "–" : "+"}
        </button>
        {isOpenWatched && (
          <>
            <div className="summary">
              <h2>Movies you watched</h2>
              <div>
                <p>
                  <span>#️⃣</span>
                  <span>{watched.length} movies</span>
                </p>
                <p>
                  <span>⭐️</span>
                  <span>{avgImdbRating}</span>
                </p>
                <p>
                  <span>🌟</span>
                  <span>{avgUserRating}</span>
                </p>
                <p>
                  <span>⏳</span>
                  <span>{avgRuntime} min</span>
                </p>
              </div>
            </div>

            <ul className="list">
              {watched.map((movie) => (
                <li key={movie.imdbID}>
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                  <h3>{movie.Title}</h3>
                  <div>
                    <p>
                      <span>⭐️</span>
                      <span>{movie.imdbRating}</span>
                    </p>
                    <p>
                      <span>🌟</span>
                      <span>{movie.userRating}</span>
                    </p>
                    <p>
                      <span>⏳</span>
                      <span>{movie.runtime} min</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
};

export default Main;
