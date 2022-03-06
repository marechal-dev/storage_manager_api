const { config } = require("dotenv");
config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { userRoutes } = require("./src/routes/user.routes");
const { productsRoutes } = require("./src/routes/products.routes");

const server = express();

const PORT = process.env.PORT || 3000;

server.use(cors());
server.use(express.json());

server.use("/", (request, response) => {
  return response.status(200).json({ message: "Ok" });
});
server.use("/user", userRoutes);
server.use("/products", productsRoutes);

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.2eek0.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`, 
  () => {
    console.log("Connected to Atlas");
  }
);

server.listen(PORT, () => {  
  console.log(`Server running at port ${PORT}`);
});   
