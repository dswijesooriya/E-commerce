import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

try {
    console.log("Starting upload...");

    console.log("Cloud name:", process.env.CLOUDINARY_NAME);
    console.log("API key:", process.env.CLOUDINARY_API_KEY);
    console.log("API secret exists:", !!process.env.CLOUDINARY_API_SECRET);
    console.log("File exists:", fs.existsSync('./test.jpg'));

    const result = await cloudinary.uploader.upload('./test.jpg', {
        resource_type: 'image'
    });

    console.log("UPLOAD SUCCESS");
    console.log(result);

} catch (error) {
    console.log("\nUPLOAD FAILED");
    console.log("Message:", error.message);
    console.log("HTTP Code:", error.http_code);
    console.log("Name:", error.name);

    console.log("\nFULL ERROR:");
    console.dir(error, {
        depth: null,
        showHidden: true
    });

    console.log("\nERROR KEYS:");
    console.log(Object.keys(error));

    console.log("\nERROR RESPONSE:");
    console.dir(error.response, {
        depth: null,
        showHidden: true
    });
}