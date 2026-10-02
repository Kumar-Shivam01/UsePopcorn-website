import { useState } from "react";
import Movie from "./Movie";
function ListBox({allMovies,onSelectMovie}) {
    const [isOpenAll, setIsOpenAll] = useState(true);
  return (
    <div className="box">
      <button
        onClick={() => setIsOpenAll((open) => !open)}
        className="btn-toggle"
      >
        {isOpenAll ? "-" : "+"}
      </button>
      {isOpenAll && (
        <ul className="list list-movies">
          {allMovies?.map((movie) => (
            <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>
          ))}
        </ul>
      )}
    </div>
  );
}
export default ListBox;
