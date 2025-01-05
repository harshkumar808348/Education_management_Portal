import Cloudinary from "cloudinary";

const cloudinary = Cloudinary.v2;
import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});



const upload = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
export default cloudinary;