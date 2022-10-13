const { fetchD } = require("./scrap");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({ origin: "*" }));
app.get("/", (req, res) => res.send("Hello World!"));
app.post("/url", async (req, res) => {
  const ress = await fetchD(req.body.url);
  res.status(200).json(ress);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
