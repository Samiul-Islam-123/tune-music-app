//user controller
const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");

const date = new Date();

const getAllUsers = async (req, res) => {
    //function get fetch all users data from database
    const userData = await UserModel.find();
    if (userData.length === 0)
        return res.json({
            success: false,
            message: "No Users found"
        })

    res.json({
        success: true,
        Users: userData
    })
}

const getUser = async (req, res) => {
    //function to fetch data of a specific user
    try {
        const userData = await UserModel.findOne({
            clerkID: req.params.clerkID
        })

        if (!userData)
            return res.json({
                success: false,
                message: "User not found"
            })

        return res.json({
            success: true,
            userData: userData
        })
    }
    catch (error) {
        console.log(`${date.toISOString()} Error : ${error}`)
        res.json({
            success: false,
            message: "Internal server error"
        })
    }
}

const createUser = async (req, res) => {
    //function to create a new user data
    console.log("Musi Mushi....")
    const { username, email, profileImageURL, clerkID } = req.body;

    if (!username || !email || !profileImageURL || ! clerkID)
        return res.json({
            success: false,
            message: "Not sufficient information"
        })

    try {
        const CurrentUser = new UserModel({
            username: username,
            email: email,
            profileImageURL: profileImageURL,
            clerkID : clerkID
        })

        await CurrentUser.save();

        return res.json({
            success: true,
            message: "User created successfully"
        })
    }
    catch (error) {
        console.log(`${date.toISOString()} Error : ${error}`)
        res.json({
            success: false,
            message: "Internal server error"
        })
    }
}

const updateUser = async (req, res) => {
    //function to update a user data

    const { username, email, profileImageURL, clerkID } = req.body;

    if (!username || !email || !profileImageURL || !clerkID)
        return res.json({
            success: false,
            message: "Not sufficient information"
        })

    try {

        const UpdatedUser = await UserModel.findOneAndUpdate({
            clerkID: clerkID
        },
            {
                username: username,
                email: email,
                profileImageURL: profileImageURL,
                updatedAt: Date.now()
            }, {
            new: true
        });

        if (!UpdatedUser)
            return res.json({
                success: false,
                message: "User not found"
            })

        return res.json({
            success: true,
            message: "User updated successfully"
        })
    }
    catch (error) {
        console.log(`${date.toISOString()} Error : ${error}`)
        res.json({
            success: false,
            message: "Internal server error"
        })
    }
}

const deleteUser = async (req, res) => {
    //function to delete a user data

    const { clerkID } = req.body;

    if (!clerkID)
        return res.json({
            success: false,
            message: "Not sufficient information"
        })

    try {

        const DeletedUser = await UserModel.deleteOne({
            clerkID: clerkID
        });

        if (!DeletedUser)
            return res.json({
                success: false,
                message: "User not found"
            })

        return res.json({
            success: true,
            message: "User deleted successfully"
        })
    }
    catch (error) {
        console.log(`${date.toISOString()} Error : ${error}`)
        res.json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}