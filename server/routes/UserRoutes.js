const { getAllUsers } = require('../controllers/UserController');

const UserRouter = require('express').Router();

//route to get all Users
UserRouter.get("/", getAllUsers);

//route to get specific User

//route to create a new user

//route to update a specific user

//route to delete a specific user

module.exports = UserRouter;