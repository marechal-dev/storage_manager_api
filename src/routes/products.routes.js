const { Router } = require("express");

const { ProductsController } = require("../controllers/ProductsController");
const productsController = new ProductsController();

const productsRoutes = Router();

productsRoutes.get("/", (request, response) => {
  return productsController.handleListRequest(request, response);
})

productsRoutes.post("/", (request, response) => {
  return productsController.handleCreateRequest(request, response);
})

productsRoutes.put("/:id", (request, response) => {
  return productsController.handleEditRequest(request, response);
})

productsRoutes.delete("/:id", (request, response) => {
  return productsController.handleDeleteRequest(request, response);
})

module.exports = { productsRoutes };
