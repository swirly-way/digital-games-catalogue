export default function GameCard({ title = "Game Title", image = "" }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden w-48 m-2">
      <img src={image} alt={title} className="w-full h-32 object-cover" />
      <div className="p-2">
        <h3 className="text-white font-semibold">{title}</h3>
      </div>
    </div>
  );
}