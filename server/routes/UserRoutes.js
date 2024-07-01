const { getAllUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/UserController');

const UserRouter = require('express').Router();

//route to get all Users
UserRouter.get("/", getAllUsers);

//route to get specific User
UserRouter.get("/:userID", getUser);

//route to create a new user
UserRouter.post("/", createUser);

//route to update a specific user
UserRouter.put("/", updateUser);

//route to delete a specific user
UserRouter.delete("/", deleteUser);

module.exports = UserRouter;