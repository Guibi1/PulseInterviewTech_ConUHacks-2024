import { Storage } from "@google-cloud/storage";

// The ID of your GCS bucket
const bucketName = "pulse-interview-upload";

// Creates a client
const storage = new Storage({
    credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS ?? "{}"),
});

export async function generateV4UploadSignedUrl(folder: string) {
    const [url] = await storage
        .bucket(bucketName)
        .file(`${folder}/${Date.now()}-${generateRandomString(10)}`)
        .getSignedUrl({
            version: "v4",
            action: "write",
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
            contentType: "application/octet-stream",
        });

    return url;
}

async function configureBucketCors() {
    await storage.bucket(bucketName).setCorsConfiguration([
        {
            maxAgeSeconds: 3600,
            method: ["PUT", "GET"],
            origin: ["http://localhost:5173", "https://pulseinterview.tech"],
            responseHeader: ["Content-Type"],
        },
    ]);
}
// configureBucketCors().catch(console.error);

function generateRandomString(length: number) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const randomBytes = crypto.getRandomValues(new Uint8Array(length));

    let result = "";
    for (let i = 0; i < length; i++) {
        result += charset.charAt(randomBytes[i] % charset.length);
    }

    return result;
}
