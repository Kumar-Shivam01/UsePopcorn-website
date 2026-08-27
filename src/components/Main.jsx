import "../App.css";
import WatchedBox from "./WatchedBox";
import ListBox from "./ListBox";
const Main = ({ allMovies,tempWatchedData }) => {
  //const [movies, setMovies] = useState(tempMovieData);
  return (
    <main className="main">
      <ListBox allMovies={allMovies}/>
      <WatchedBox tempWatchedData={tempWatchedData}/>
    </main>
  );
};

export default Main;
