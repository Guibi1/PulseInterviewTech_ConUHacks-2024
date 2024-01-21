import { Storage } from "@google-cloud/storage";

type BucketName = "pulse-interview-upload" | "pulse-interview-video";

const storage = new Storage({
    credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS ?? "{}"),
});

export async function generateV4UploadSignedUrl(bucket: BucketName, filename: string) {
    const [url] = await storage
        .bucket(bucket)
        .file(filename)
        .getSignedUrl({
            version: "v4",
            action: "write",
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
            contentType: "application/octet-stream",
        });

    return { url, filename };
}

export async function getQuestions(fileName: string) {
    const [file] = await storage.bucket("pulse-interview-questions").file(fileName).download();
    return JSON.parse(file.toString()).questions;
}

export async function getAnalysis(fileName: string) {
    const [file] = await storage.bucket("pulse-interview-video-analysis").file(fileName).download();
    return JSON.parse(file.toString());
}

export async function getFrameData(fileName: string) {
    const [file] = await storage.bucket("pulse-interview-framedata").file(fileName).download();
    return JSON.parse(file.toString());
}

async function configureBucketCors() {
    const options = {
        maxAgeSeconds: 3600,
        method: ["PUT", "GET"],
        origin: ["http://localhost:5173", "https://pulseinterview.tech"],
        responseHeader: ["Content-Type"],
    };

    await storage
        .bucket("pulse-interview-upload" satisfies BucketName)
        .setCorsConfiguration([options]);
}
// configureBucketCors().catch(console.error);

export function generateRandomString(length: number) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const randomBytes = crypto.getRandomValues(new Uint8Array(length));

    let result = "";
    for (let i = 0; i < length; i++) {
        result += charset.charAt(randomBytes[i] % charset.length);
    }

    return `${Date.now()}-${result}`;
}
