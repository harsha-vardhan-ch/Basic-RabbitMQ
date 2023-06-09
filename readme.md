# Repo contains
- Creating and consuming messages between API's using RabbitMQ
- Using exchanges and queues
- Working with routing keys using direct exchange type of RabbitMQ
- Simple API Gateway to route API's

## Consumers
- notifications-api
- receipt-api

## Producer
- orders-api

# Idea 
- Make an API call to create a receipt confirmation, by specifying the confirmation type, which will be used as a message routing key, to be used by the direct exchange, to correctly route the message to the correct queues. 
- notifications-api, receipt-api act as consumers, both listening on 2 different queues, with their own binding keys.

# Commands
- docker-compose up - start the rabbitMQ docker container
- npm run start - to start the localhost server

