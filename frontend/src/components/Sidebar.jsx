export default function Sidebar() {
  const genres = ["Action", "Adventure", "RPG", "Puzzle"];
  return (
    <div className="bg-gray-900 p-4 w-48">
      <h2 className="text-white font-bold mb-2">Genres</h2>
      <ul className="text-gray-300">
        {genres.map((genre) => (
          <li key={genre} className="mb-1 hover:text-white cursor-pointer">{genre}</li>
        ))}
      </ul>
    </div>
  );
}