const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');

const Connect = require("./dbConfig/Connect");
const UserRouter = require("./routes/UserRoutes");
const upload = require("./services/FileUpload");
const DeveloperRouter = require("./routes/DeveloperRoutes");
const SongsRouter = require("./routes/SongsRouter");

const PORT = process.env.PORT || 5500;
const app = express();
app.use(cors());
require('dotenv').config();
app.use(express.json())

app.get("/", (req,res) => {
    res.status(200).json({
        message : "Hellow From server"
    })
})

app.use('/user', UserRouter)
app.use('/song', SongsRouter)

app.use("/developer", DeveloperRouter)

//route for testing cloudinary
console.log(process.env)
app.post('/upload', upload.single('file'), (req,res) => {
    if(!req.file)
        return res.json({
            success : false,
            message : "File not found"
        })

    res.json({
        success : true,
        message : "File uploaded successfully",
        fileURL : req.file.path
    })
})

app.listen(PORT, async() => {
    console.log("Server is starting...")
    await Connect(process.env.DB_URL);
    console.log("Server is up and running on PORT : "+PORT)
})