import { useState } from "react";
import WatchedMovie from "./WatchedMovie";
import Summary from "./Summary";
function WatchedBox({tempWatchedData}) {
  const [isOpenWatched, setIsOpenWatched] = useState(true);
  const [watched, setWatched] = useState(tempWatchedData);
 
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpenWatched((open) => !open)}
      >
        {isOpenWatched ? "–" : "+"}
      </button>
      {isOpenWatched && (
        <>
          <Summary watched={watched} setWatched={setWatched}/>
          <ul className="list">
            {watched.map((movie) => (
              <WatchedMovie movie={movie} key={movie.imdbID}/>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
export default WatchedBox;
