const express = require("express");
const app = express();

const amqp = require("amqplib");
const amqpUrl = "amqp://localhost:5672";

app.get("/receipts", (req, res) => {
	res.send("RECEIPTS API");
});

async function connect() {
	try {
		const connection = await amqp.connect(amqpUrl);
		const channel = await connection.createChannel();

        // If no exchange creates exchange with name "ordersExchange" of type direct, else nothing happens )
		await channel.assertExchange("ordersExchange", "direct");

        // If no queue creates queue with name "ReceiptQueue", else nothing happens )
		const q = await channel.assertQueue("ReceiptQueue"); 

		// Binding email and sms routes with ReceiptQueue
		await channel.bindQueue(q.queue, "ordersExchange", "Email");
		await channel.bindQueue(q.queue, "ordersExchange", "SMS");

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

app.listen(8002, () => {
	console.log("Listening on PORT 8002");
});
