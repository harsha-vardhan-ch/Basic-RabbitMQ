const express = require("express");
const app = express();

const amqp = require("amqplib");
const amqpUrl = "amqp://localhost:5672";

app.get("/", (req, res) => {
	res.send("NOTIFCATIONS API");
});

async function connect() {
  try{
    const connection = await amqp.connect(amqpUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue("order.shipped"); // If no queue creates queue with name "order.shipped", else nothing happens )
    channel.consume("order.shipped",(message) => {  // Data consuming from rabbitMQ
      console.log("Received data from RabbitMQ")
      console.log(message.content.toString());
      channel.ack(message)
    });
  }
  catch(error){
    console.log(error);
  }
	
}

connect()

app.listen(8001, () => {
	console.log("Listening on PORT 8001");
});
