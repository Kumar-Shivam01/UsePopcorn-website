import { useEffect, useState } from "react";

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState('')

    useEffect(function () {
        const controller = new AbortController(); // to stop the previous request
        async function fetchMovies() {
            try {
                setError('')
                setIsLoading(true);
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${query}`,
                    { signal: controller.signal }
                );
                if (!res.ok)
                    throw new Error("Something went wrong with fetching movies.");
                const data = await res.json();
                if (data.Response === 'false') throw new Error('Movie not found')
                setMovies(data.Search);
                setError("")
            } catch (err) {
                console.log(err.message);
                if (err.name !== 'AbortError') {
                    setError(err.message)
                }
            } finally {
                setIsLoading(false);
            }
        }
        if (query.length < 3) {
            setMovies([])
            setError("")
            return
        }
        fetchMovies();
        return function () {
            controller.abort() // if the query changes 
        }
    }, [query]);
    return {movies,isLoading,error}
}