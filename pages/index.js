import { useState, useEffect } from 'react';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('/api/movies');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  if (isLoading) return <p>Loading movies...</p>;
  if (error) return <p>Error loading movies: {error}</p>;

  return (
    <div>
      <h1>Movie List</h1>
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h2>{movie.title}</h2>
              <p>Director: {movie.director}</p>
              <p>Release Date: {movie.release_date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
