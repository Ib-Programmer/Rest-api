// This needs to access the same 'movies' array.
// For simplicity in this migration, we'll redefine it.
// In a real app, you'd use a database or a shared module.
let movies = [
  {
    id: "1",
    title: "Sai watarana",
    director: "Aminu Saira",
    release_date: "2014",
  },
  {
    id: "2",
    title: "Jamilu da Jamila",
    director: "Hassan Giggs",
    release_date: "2013",
  },
];


export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const movie = movies.find((m) => m.id === id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } else if (req.method === 'DELETE') {
    const movieIndex = movies.findIndex((m) => m.id === id);
    if (movieIndex > -1) {
      movies.splice(movieIndex, 1);
      // Note: For this example, we are modifying the in-memory array.
      // This change won't persist across different requests or server restarts
      // if the `movies` array in `pages/api/movies/index.js` is not updated.
      // This is a limitation of the current simple in-memory storage.
      // A proper solution would involve a database or a shared data store.
      res.status(200).json({ message: 'Movie is deleted from the movie list' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
