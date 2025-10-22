import axios from "axios";

export const getGames = async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.igdb.com/v4/games",
      `
      fields name, platforms.name, rating, summary, genres.name, involved_companies.company.name;
      where rating > 85;
      sort rating desc;
      limit 10;
      `,
      {
        headers: {
          "Client-ID": process.env.CLIENT_ID,
          "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );

    const rawGames = response.data;

    const formattedGames = rawGames.map((game) => ({
      id: game.id,
      title: game.name,
      genres: game.genres?.map((g) => g.name) || [],
      platforms: game.platforms?.map((p) => p.name) || [],
      rating: game.rating ? Math.round(game.rating) : "N/A",
      company: game.involved_companies?.[0]?.company?.name || "Unknown",
      summary: game.summary || "No description available.",
    }));

    res.status(200).json(formattedGames);
  } catch (error) {
    console.error("Error fetching games:", error.message);
    res.status(500).json({ error: "Failed to fetch games from IGDB." });
  }
};
