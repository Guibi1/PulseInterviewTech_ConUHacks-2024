import { z } from "zod";

export const pdfUploadSchema = z.object({
    pdf: z
        .custom<File>()
        .refine((f) => f instanceof File && f.size < 10000, "Max 10Kb upload size.")
        .refine((f) => f.type === "application/pdf", "Must be a PDF."),
});

export const videoUploadSchema = z.object({
    pdf: z
        .custom<File>()
        .refine((f) => f instanceof File && f.size < 100000, "Max 100Kb upload size.")
        .refine((f) => f.type === "video/*", "Must be a PDF."),
});
