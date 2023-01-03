import express from "express";

const server = express();

server.get("/api/items", (req, res) => {
  // get data from database or external API
  const data = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ];

  res.json(data);
});

server.listen(3000, () => {
  console.log("> Ready on http://localhost:3000" + process.env.PORT);
});
