import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import GameCard from "../components/GameCard";
import { useEffect, useState } from "react";

export default function Home() {
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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-800 text-white">
      <Sidebar />
      <main className="flex-1 p-4">
        <Header />
        <SearchBar />
        <div className="flex flex-wrap">
          {games.map((game) => (
            <GameCard key={game.id} title={game.name} image={game.coverUrl}/>
          ))}
        </div>
      </main>
    </div>
  );
}
