const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 3000;

const { Client } = require("@elastic/elasticsearch");
const { getQuery } = require("./helpers/athlete/index.js");

const client = new Client({
  cloud: {
    id: "eb1c8174508f4a8c8841f5f417f64677:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQ3MDAxM2M4ZDQxNzQ0MTVkYTFlMTllODMyNzI5YmI2ZSQ2NTk4ZGI0MzBiNmE0YzE4YWE3ZDU4NTRkNWFjYTJjOQ==",
  },
  auth: {
    username: "elastic",
    password: "wInR06rR7HI6xqKiaP7Ndw2J",
  },
});

const INDEX = "athletes";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    console.log("AAA", req.query);
    console.log("AAA", getQuery(req.query));
    const athletes = await client.search({
      index: INDEX,
      query: req.query ? getQuery(req.query) : { match_all: {} },
      size: 100,
    });

    res.send(athletes.hits.hits);
  } catch (e) {
    console.log(e);
    res.status(e.meta.body.status).send("Error");
  }
});

app.get("/:id", async (req, res) => {
  try {
    const athlete = await client.getSource({ index: INDEX, id: req.params.id });

    res.send(athlete);
  } catch (e) {
    res.status(e.meta.body.status).send("Error");
  }
});

app.post("/", async (req, res) => {
  try {
    const result = await client.create({
      id: uuidv4(),
      index: INDEX,
      document: req.body,
    });
    console.log(result);
    res.send(result);
  } catch (e) {
    res.status(e.meta.body.status).send("Error");
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const responce = await client
      .delete({ index: INDEX, id: req.params.id })
      .then((response) => console.log("AAA", response))
      .catch((error) => console.error(error));
    res.send(responce);
  } catch (e) {
    res.status(e.meta.body.status).send("Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
