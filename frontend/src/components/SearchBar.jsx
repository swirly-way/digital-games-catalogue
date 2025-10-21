export default function SearchBar() {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search games..."
        className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
      />
    </div>
  );
}