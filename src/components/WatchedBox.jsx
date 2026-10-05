import { useState } from "react";
import WatchedMovie from "./WatchedMovie";
import Summary from "./Summary";
function WatchedBox({watched,onDeleteWatched}) {
  const [isOpenWatched, setIsOpenWatched] = useState(true);
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
          <Summary watched={watched}/>
          <ul className="list">
            {watched.map((movie) => (
              <WatchedMovie movie={movie} onDeleteWatched={onDeleteWatched}/>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
export default WatchedBox;
