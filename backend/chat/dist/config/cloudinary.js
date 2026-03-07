import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
if (cloudName && apiKey && apiSecret) {
    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
    });
    console.log("Cloudinary configured");
}
else {
    console.log("Cloudinary not configured (running without image upload)");
}
export default cloudinary;
//# sourceMappingURL=cloudinary.js.map