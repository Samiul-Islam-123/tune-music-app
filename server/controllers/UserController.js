//user controller
const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");

const getAllUsers = async(req,res) => {
    //function get fetch all users data from database
    const userData = await UserModel.find();
    if(userData.length ===0)
        return res.json({
            success : false,
            message : "No Users found"
        })

    res.json({
        success : true,
        Users : userData
    })
}

const getUser = async(req,res) => {
    //function to fetch data of a specific user
}

const createUser = async(req, res) => {
    //function to create a new user data
}

const updateUser = async(req,res) => {
    //function to update a user data
}

const deleteUser = async(req,res) => {
    //function to delete a user data
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}