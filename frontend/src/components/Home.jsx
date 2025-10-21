import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import GameCard from "../components/GameCard";

export default function Home() {
  const dummyGames = [
    { title: "Game 1" },
    { title: "Game 2" },
    { title: "Game 3" },
    { title: "Game 4" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-800 text-white">
      <Sidebar />
      <main className="flex-1 p-4">
        <Header />
        <SearchBar />
        <div className="flex flex-wrap">
          {dummyGames.map((game, index) => (
            <GameCard key={index} title={game.title} />
          ))}
        </div>
      </main>
    </div>
  );
}
