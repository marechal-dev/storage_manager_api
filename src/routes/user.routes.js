const { Router } = require("express");

const { ensureCorrectPayload } = require("../middlewares/ensureCorrectPayload");

const { UserController } = require("../controllers/UserController");
const userController = new UserController();

const userRoutes = Router();

userRoutes.post("/auth", ensureCorrectPayload, (request, response) => {
  return userController.handleLogin(request, response);
});

userRoutes.post("/register", ensureCorrectPayload, (request, response) => {
  return userController.handleCreateUserRequest(request, response);
});

module.exports = { userRoutes };
