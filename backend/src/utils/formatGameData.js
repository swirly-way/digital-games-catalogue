export function formatGameData(game, popularityMap) {
  const popularity = popularityMap[game.id] ?? 0;

  
  let coverUrl = null;
  if (game.cover?.url) {
    coverUrl = `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`;
  } else {
   
    coverUrl = "/images/placeholder-cover.png";
  }

  const genres = game.genres?.map(g => g.name) ?? [];
  const platforms = game.platforms?.map(p => p.name) ?? [];

  const publisher =
    game.involved_companies?.find(c => c.publisher)?.company?.name ?? "Unknown";


  return {
    id: game.id,
    name: game.name,
    genres,
    platforms,
    publisher,
    rating: game.rating ?? null,
    summary: game.summary ?? "",
    storyline: game.storyline ?? "",
    coverUrl,
    popularity
  };
}