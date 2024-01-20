import { z } from "zod";

export const uploadSchema = z.object({
    pdf: z
        .custom<File>()
        .refine((f) => f && f instanceof File, "Required.")
        .refine((f) => f instanceof File && f.type === "application/pdf", "Must be a PDF.")
        .refine((f) => f instanceof File && f.size < 10_000_000, "Max 10Mb upload size."),
    video: z
        .custom<File>()
        .refine((f) => f && f instanceof File, "Required.")
        .refine((f) => f instanceof File && f.type.startsWith("video/"), "Must be a video.")
        .refine((f) => f instanceof File && f.size < 100_000_000, "Max 100Mb upload size."),
});
