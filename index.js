import { JigsawStack } from "jigsawstack";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config()

const jigsawstack = JigsawStack({
    apiKey: process.env.JIGSAWSTACK_API_KEY, // This is not required if API key is set as an environment variable.
  });

function getRandomImage(folderPath) {
    // List of common image file extensions
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'];

    return new Promise((resolve, reject) => {
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                reject(err);
                return;
            }

            // Filter for image files
            const imageFiles = files.filter(file => 
                imageExtensions.includes(path.extname(file).toLowerCase())
            );

            // Check if there are any image files
            if (imageFiles.length === 0) {
                resolve(null);
                return;
            }

            // Select a random image file
            const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];

            // Resolve with the full path of the selected image
            resolve(path.join(folderPath, randomImage));
        });
    });
}

async function uploadFile(filePath) {
    const imageFile = fs.readFileSync(filePath);
    try {
        const result = await jigsawstack.store.upload(imageFile, {
            overwrite: true,
            filename: "file.png",
          });

        const publicFileUrl = `${result.url}?x-api-key=${process.env.JIGSAWSTACK_PUBLIC_KEY}`;
        console.log("PUBLIC URL", publicFileUrl)
        return publicFileUrl;
    } catch (error) {
        console.error("Error uploading ID:", error);
        throw error; // Re-throw the error if you want calling code to handle it
    }
}

async function processID(URL) {
    try {
        const result = await jigsawstack.vision.vocr({
            prompt: "In a JSON output and only JSON no additional text, What is the name of the person in this ID? What is the resident's address? What is the ID number? Output should include parameters such as name, address, and id_number",
            url: URL,
        });
        console.log("RESULT", result.context);
        console.log("Additional Info", result.sections[0].text)
        return result;
    } catch (error) {
        console.error("Error processing ID:", error);
        throw error; // Re-throw the error if you want calling code to handle it
    }
}

function main(){
    const folderPath = "./SampleDriversLicenseIDs";
    getRandomImage(folderPath)
    .then(async (randomImagePath) => {
        if (randomImagePath) {
            console.log(`Randomly selected image: ${randomImagePath}`);
            const publicURL = await uploadFile(randomImagePath);
            processID(publicURL)

        } else {
            console.log("No image files found in the specified folder.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

main();