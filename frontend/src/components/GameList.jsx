import { useEffect, useState } from "react";

export default function GameList() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch from our backend route
    fetch("http://localhost:5000/api/games")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setGames(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Game List</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id} className="mb-2">
            {game.name} — Rating: {game.genre}
          </li>
        ))}
      </ul>
    </div>
  );
}