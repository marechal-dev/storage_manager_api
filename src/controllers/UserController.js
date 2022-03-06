const { MongoData } = require("../data/mongo");

const mongoData = MongoData.getInstance();

class UserController {
  constructor() {}

  async handleCreateUserRequest(request, response) {
    const { username, password } = request.body;
    
    if (!username || !password) {
      return response.status(401).json({ message: "Please, enter e-mail and password." });
    }

    try {
      await mongoData.createUser(username, password);
    } catch (error) {
      return response.status(500).json(error);
    }

    return response.status(201).json({ message: "User successefully created!" });
  }

  async handleLogin(request, response) {
    const { username, password } = request.body;

    if (!username || !password) {
      return response.status(401).json({ message: "Please, enter e-mail and password." })
    }

    let user;
    try {
      user = await mongoData.authenticateUser(username, password);
    } catch (error) {
      return response.status(500).json(error);
    }

    return response.status(200).json(user);
  }
}

module.exports = { UserController };
