import axios from "axios";

export const getGames = async (req, res) => {
  try {
// Fetch top 200 games from popularity primitives in IGDB with their ids
const popularResponse = await axios.post(`${process.env.IGDB_URL}/popularity_primitives`, `fields game_id,value,popularity_type; sort value desc; limit 200; where popularity_type = 5;`,  {
        headers: {
          "Client-ID": process.env.CLIENT_ID,
          "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`,
          "Accept": "application/json",
      "Content-Type": "text/plain"
        },
      }
)
// Then we map over the result to extract the ids.
const popularIds = popularResponse.data.map(item => item.game_id);

// Call the API querying with popularIds
    const gamesResponse = await axios.post(
      `${process.env.IGDB_URL}/games`,
      `
   fields name, genres.name, platforms.name, rating, summary, storyline, involved_companies.company.name, involved_companies.publisher, cover.url;
   where id = (${popularIds.join(",")});
limit 200;
      `,
      {
        headers: {
          "Client-ID": process.env.CLIENT_ID,
          "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`,
          "Accept": "application/json",
      "Content-Type": "text/plain"
        },
      }
    );

    // Merge popularity values with games queried to sort by value

    //Transform primitive objects and map into arrays of key (id) and value (popularity). Object.fromEntries transforms it into a JS object
    const popularityMap = Object.fromEntries(popularResponse.data.map(p => [p.game_id, p.value]));
    const finalData = gamesResponse.data.map(g => ({
      ...g,
      popularity: popularityMap[g.id] || 0
    }));

    res.status(200).json(finalData.sort((a,b) => b.popularity - a.popularity));
  } catch (error) {
    console.error("Error fetching games:", error.message);
    res.status(500).json({ error: "Failed to fetch games from IGDB." });
  }
};
