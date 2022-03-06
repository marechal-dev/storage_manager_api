const { MongoData } = require("../data/mongo");

const mongoData = MongoData.getInstance();

class ProductsController {
  constructor() {}

  async handleListRequest(request, response) {
    const allProducts = await mongoData.listProducts();

    return response.status(200).json(allProducts);
  }

  async handleCreateRequest(request, response) {
    const { title, price, quantity } = request.body;

    try {
      await mongoData.createProduct(title, price, quantity);

      return response.status(201).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  }

  async handleEditRequest(request, response) {
    const { id, title, price, quantity } = request.body;

    try {
      await mongoData.updateProduct(id, title, price, quantity);

      return response.status(200).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  }

  async handleDeleteRequest(request, response) {
    const { id } = request.body;

    try {
      await mongoData.deleteProduct(id);

      return response.status(200).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}

module.exports = { ProductsController };
