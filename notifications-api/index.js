const express = require("express");
const app = express();

const amqp = require("amqplib");
const amqpUrl = "amqp://localhost:5672";

app.get("/notifications", (req, res) => {
	res.send("NOTIFCATIONS API");
});

async function connect() {
	try {
		const connection = await amqp.connect(amqpUrl);
		const channel = await connection.createChannel();

		// If no exchange creates exchange with name "ordersExchange" of type direct, else nothing happens )
		await channel.assertExchange("ordersExchange", "direct");

		// If no queue creates queue with name "NotificationsQueue", else nothing happens )
		const q = await channel.assertQueue("NotificationsQueue");

		// Bind notify route with NotificationsQueue
		await channel.bindQueue(q.queue, "ordersExchange", "Notify");

		channel.consume(q.queue, (message) => {
			// Data consuming from rabbitMQ
			console.log("Received data from RabbitMQ");
			console.log(message.content.toString());
			channel.ack(message);
		});
	} catch (error) {
		console.log(error);
	}
}

connect();

app.listen(8001, () => {
	console.log("Listening on PORT 8001");
});
