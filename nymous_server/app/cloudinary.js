require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const name = "dkpciptvh";
const key = "892255218719868";
const secret = "i9y_hWwkDVS3sDZqYYA8_Xvo4iE";
cloudinary.config({
    cloud_name: name,
    api_key: key,
    api_secret: secret,
});

module.exports = { cloudinary };