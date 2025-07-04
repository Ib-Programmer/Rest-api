import { useState, useEffect } from 'react';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the new movie form
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieDirector, setNewMovieDirector] = useState('');
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState('');
  const [addMovieError, setAddMovieError] = useState(null);
  const [listActionError, setListActionError] = useState(null); // For errors from delete or other list actions
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term

  // Moved fetchMovies out of useEffect to be callable
  async function fetchMovies() {
    setIsLoading(true);
    // setError(null); // Cleared by setListActionError or setAddMovieError before calling fetchMovies
    // It's better to clear specific errors when an action starts, rather than general 'error' here.
    try {
      const response = await fetch('/api/movies');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setMovies(data);
      setError(null); // Clear general error on successful fetch
    } catch (err) {
      setError(err.message); // Set general error for fetching list if it fails
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []); // Called once on mount

  // Function to handle adding a new movie
  const handleAddMovie = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setAddMovieError(null); // Clear previous add movie errors
    setListActionError(null); // Clear list action errors

    const movieData = {
      title: newMovieTitle,
      director: newMovieDirector,
      release_date: newMovieReleaseDate,
    };

    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      // Clear form fields
      setNewMovieTitle('');
      setNewMovieDirector('');
      setNewMovieReleaseDate('');

      // Refresh movie list
      await fetchMovies();

    } catch (err) {
      setAddMovieError(err.message); // Set error specific to adding a movie
    }
  };

  // Function to handle deleting a movie
  const handleDeleteMovie = async (movieId) => {
    setListActionError(null); // Clear previous list-related errors
    setAddMovieError(null); // Clear add movie errors

    // Optional: Add a confirmation dialog
    // if (!confirm('Are you sure you want to delete this movie?')) {
    //   return;
    // }

    try {
      const response = await fetch(`/api/movies/${movieId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      // Refresh movie list
      await fetchMovies();

    } catch (err) {
      setListActionError(err.message); // Update error state visible to the user
      console.error("Failed to delete movie:", err);
    }
  };

  if (isLoading && movies.length === 0) return <p>Loading movies...</p>;
  // Display general fetch error if it occurs and no movies are loaded
  if (error && movies.length === 0 && !isLoading) return <p>Error loading movies: {error}</p>;

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Movie List</h1>

      <form onSubmit={handleAddMovie}>
        <h3>Add New Movie</h3>
        {addMovieError && <p className="error-message">{addMovieError}</p>}
        <div>
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            value={newMovieTitle}
            onChange={(e) => setNewMovieTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="director">Director: </label>
          <input
            id="director"
            type="text"
            value={newMovieDirector}
            onChange={(e) => setNewMovieDirector(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="release_date">Release Date: </label>
          <input
            id="release_date"
            type="text"
            value={newMovieReleaseDate}
            onChange={(e) => setNewMovieReleaseDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Movie</button>
      </form>

      {/* Margin for search bar can be handled by global styles or a wrapper div if needed */}
      <div>
        <label htmlFor="search">Search Movies by Title: </label>
        <input
          id="search"
          type="text"
          placeholder="Enter title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading && <p>Loading...</p>}
      {listActionError && <p className="error-message">Error: {listActionError}</p>}
      {error && !listActionError && movies.length > 0 && searchTerm === '' && (
        <p className="error-message">Error refreshing list: {error}</p>
      )}

      {!isLoading && !error && movies.length === 0 && <p>No movies currently in the list. Add some!</p>}
      {!isLoading && !error && movies.length > 0 && filteredMovies.length === 0 && searchTerm !== '' && (
        <p>No movies match your search term "{searchTerm}".</p>
      )}

      {filteredMovies.length > 0 && (
        <div>
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <h2>{movie.title}</h2>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Release Date:</strong> {movie.release_date}</p>
              <button onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
