const express = require("express");
const app = express();

const amqp = require("amqplib");
const amqpUrl = "amqp://localhost:5672";

const orderData = {
	name: "Shivaji Chatrapathi",
	age: 30,
	customerId: 323433,
	number: "2132856777",
};

app.get("/orders", async (req, res) => {
	try {
		const connection = await amqp.connect(amqpUrl);
		const channel = await connection.createChannel();
		await channel.assertQueue("order.shipped"); // If no queue creates queue with name "order.shipped", else nothing happens )
		channel.sendToQueue(
			"order.shipped",
			Buffer.from(JSON.stringify(orderData))
		); //Send message to queue
	} catch (error) {
		console.log(error);
	}
	res.send("ORDERS API");
});

app.listen(8000, () => {
	console.log("ORDERS API listening on port 8000");
});
