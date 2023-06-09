const express = require("express");
const app = express();

const amqp = require("amqplib");
const amqpUrl = "amqp://localhost:5672";

// const orderData = {
// 	name: "Shivaji Chatrapathi",
// 	age: 30,
// 	customerId: 323433,
// 	number: "2132856777",
// };

// app.get("/orders", async (req, res) => {
// 	try {
// 		const connection = await amqp.connect(amqpUrl);
// 		const channel = await connection.createChannel();
// 		await channel.assertQueue("order.shipped"); // If no queue creates queue with name "order.shipped", else nothing happens )
// 		channel.sendToQueue(
// 			"order.shipped",
// 			Buffer.from(JSON.stringify(orderData))
// 		); //Send message to queue
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	res.send("ORDERS API");
// });

let channel = null;
async function createChannel() {
	const connection = await amqp.connect(amqpUrl);
	channel = await connection.createChannel();
}

async function publishMessage(routingKey, message) {
	if (!channel) {
		await createChannel();
	}

	await channel.assertExchange("ordersExchange", "direct");

	const orderData = {
		name: "Shivaji Chatrapathi",
		age: 30,
		customerId: 323433,
		dateTime: new Date(),
		message: message,
		confirmationType: routingKey,
	};

	await channel.publish(
		"ordersExchange",
		routingKey,
		Buffer.from(JSON.stringify(orderData))
	);

	console.log(
		`The new ${routingKey} log is` //sent to exchange ${exchangeName}`
	);
}

module.exports = { publishMessage };
