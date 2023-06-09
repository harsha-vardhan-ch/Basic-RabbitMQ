const express = require("express");
const app = express();

const {publishMessage} = require('./index_orders')

const bodyParser = require("body-parser");
app.use(bodyParser.json("application/json"));

app.post("/orders", async (req, res, next) => {
    await publishMessage(req.body.confirmationType, req.body.message);
    res.send("In ORDERS API");
  });

app.listen(8000, () => {
    	console.log("ORDERS API listening on port 8000");
    });