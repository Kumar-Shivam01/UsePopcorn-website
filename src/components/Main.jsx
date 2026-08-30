import "../App.css";
const Main = ({ children }) => {
  //const [movies, setMovies] = useState(tempMovieData);
  return (
    <main className="main">
      {children}
    </main>
  );
};

export default Main;
