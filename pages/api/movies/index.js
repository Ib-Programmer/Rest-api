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
  if (req.method === 'GET') {
    res.status(200).json(movies);
  } else if (req.method === 'POST') {
    const movie = req.body;
    // A simple ID generation for the example
    movie.id = (movies.length + 1).toString();
    movies.push(movie);
    res.status(201).json({ message: 'Movie is added to the movie list', movie });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
