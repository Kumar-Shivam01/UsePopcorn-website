import { useState } from "react";
import Movie from "./Movie";
function ListBox({allMovies}) {
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
        <ul className="list">
          {allMovies?.map((movie) => (
            <Movie movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
}
export default ListBox;
