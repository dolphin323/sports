const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 3000;

const { getQuery } = require("./helpers/athlete/index.js");
const { ElasticService } = require("./service/elastic.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/initialize", async (req, res) => {
  try {
    const result = await ElasticService.initialize();

    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(e?.meta?.body?.status || 500).send("Error");
  }
});

app.get("/", async (req, res) => {
  try {
    const athletes = await ElasticService.get(
      req.query ? getQuery(req.query) : { match_all: {} }
    );

    res.send(athletes.hits.hits);
  } catch (e) {
    res.status(e?.meta?.body?.status || 500).send("Error");
  }
});

app.get("/:id", async (req, res) => {
  try {
    const athlete = await ElasticService.getById(req.params.id);

    res.send(athlete);
  } catch (e) {
    res.status(e?.meta?.body?.status || 500).send("Error");
  }
});

app.post("/", async (req, res) => {
  try {
    const result = await ElasticService.create(req.body);

    res.send(result);
  } catch (e) {
    res.status(e?.meta?.body?.status || 500).send("Error");
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const responce = await ElasticService.deleteById(req.params.id);

    res.send(responce);
  } catch (e) {
    res.status(e?.meta?.body?.status || 500).send("Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
