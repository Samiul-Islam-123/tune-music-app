const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
    cloud_name: "duwx8enno",
    api_key: "174881656337715",
    api_secret: "dN0vbjrv4bBMb2mi1tMdyODci1k"
});

// Configure Multer storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        resource_type: 'auto'
    }
});

const upload = multer({
    storage: storage
});

module.exports = upload;
