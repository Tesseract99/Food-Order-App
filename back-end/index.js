const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const url =
  "https://samurai-s-ramen-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json";

const url2 =
  "https://samurai-s-ramen-default-rtdb.asia-southeast1.firebasedatabase.app/order.json";

app.get("/", (req, res) => {
  axios
    .get(url)
    .then((result) => {
      const dataArray = Object.values(result.data);
      res.send(dataArray);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

app.post("/", (req, res) => {
  console.log("POST hit");
  console.log(req.body);
  axios
    .post(url2, req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app.listen(5000, () => console.log("Server started at PORT:5000"));
