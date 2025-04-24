const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

//Configure storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//File filter
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//     if(allowedTypes.includes(file.mimetype)){
//         cb(null, true);
//     }
//     else{
//         cb(new Error("Only .jpeg, .jpg and .png formats are allowed"), false);
//     }
// }

// Storage config for multer using Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads", // folder name in Cloudinary
        allowed_formats: ["jpg", "jpeg", "png"],
        transformation: [{ width: 500, height: 500, crop: "limit" }],
    },
});

// const upload = multer({ storage, fileFilter});

const upload = multer({ storage });

module.exports = upload;