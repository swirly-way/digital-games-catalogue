export const getGames = (req, res) => {        
  const dummyGames = [                          
    { id: 1, title: "Game One", genre: "RPG" },
    { id: 2, title: "Game Two", genre: "Action" },
    { id: 3, title: "Game Three", genre: "Puzzle" },
  ];

  res.json(dummyGames);                        
};