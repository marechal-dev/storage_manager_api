const { Router } = require("express");

const { ProductsController } = require("../controllers/ProductsController");
const productsController = new ProductsController();

const productsRoutes = Router();

productsRoutes.get("/", (request, response) => {
  return productsController.handleListRequest(request, response);
});

productsRoutes.post("/", (request, response) => {
  return productsController.handleCreateRequest(request, response);
});

productsRoutes.delete("/", (request, response) => {
  return productsController.handleDeleteRequest(request, response);
});

module.exports = { productsRoutes };
