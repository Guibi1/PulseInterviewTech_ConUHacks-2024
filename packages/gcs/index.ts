import { Storage } from "@google-cloud/storage";

// The ID of your GCS bucket
const bucketName = "pulse-interview-upload";

// The full path of your file inside the GCS bucket, e.g. 'yourFile.jpg' or 'folder1/folder2/yourFile.jpg'
const fileName = "cv/default.pdf";

// Creates a client
const storage = new Storage();

export async function generateV4UploadSignedUrl() {
    const [url] = await storage
        .bucket(bucketName)
        .file(fileName)
        .getSignedUrl({
            version: "v4",
            action: "write",
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
            contentType: "application/octet-stream",
        });

    console.log("Generated PUT signed URL:");
    console.log(url);
    console.log("You can use this URL with any user agent, for example:");
    console.log("curl -X PUT -H 'Content-Type: application/octet-stream' " + `--upload-file my-file '${url}'`);
}

generateV4UploadSignedUrl().catch(console.error);
