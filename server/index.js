
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const headlines = [
  "Discover why Cake & Co is Mumbai’s favorite dessert stop!",
  "Top 5 reasons Cake & Co is the sweetest in Mumbai",
  "Cake & Co: A hidden gem for Mumbai’s dessert lovers"
];

app.post("/business-data", (req, res) => {
  const { name, location } = req.body;
  res.json({
    rating: 4.3,
    reviews: 127,
    headline: `Why ${name} is ${location}'s Sweetest Spot in 2025`
  });
});

app.get("/regenerate-headline", (req, res) => {
  const headline = headlines[Math.floor(Math.random() * headlines.length)];
  res.json({ headline });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
