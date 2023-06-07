const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Define routes and ports
const routes = {
	"/orders": "http://localhost:8000",
	"/notifications": "http://localhost:8001",
};

// Proxy for each route
for (const route in routes) {
	const target = routes[route];
	app.use(route, createProxyMiddleware({ target }));
}

const PORT = 3000;
app.listen(PORT, () => console.log("API GATEWAY STARTED"));
