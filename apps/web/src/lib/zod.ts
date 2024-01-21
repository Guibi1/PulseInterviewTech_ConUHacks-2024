import { z } from "zod";

export const cvUploadSchema = z.object({
    pdf: z
        .custom<File>()
        .refine((f) => f && f instanceof File, "Start by uploading a CV.")
        .refine((f) => f instanceof File && f.type === "application/pdf", "Must be a PDF.")
        .refine((f) => f instanceof File && f.size < 10_000_000, "Max 10Mb upload size."),
    desiredPosition: z.string().min(5),
});

export const videoUploadSchema = z.object({
    video: z
        .custom<File>()
        .refine((f) => f && f instanceof File, "Make sure to record a video first.")
        .refine((f) => f instanceof File && f.type.startsWith("video/"), "Must be a video.")
        .refine((f) => f instanceof File && f.size < 100_000_000, "Max 100Mb upload size."),
});

const ratedKnowledge = z.object({
    name: z.string().min(3).default(""),
    rating: z.number().min(0).max(5).default(0),
});

export const cvBuilderSchema = z
    .object({
        info: z
            .object({
                name: z.string().min(4, "Required.").default(""),
                email: z.string().email().default(""),
                number: z
                    .string()
                    .regex(
                        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                        "Provide a valid phone number."
                    )
                    .default(""),
                address: z.string().min(10, "Provide a valid street address.").default(""),
            })
            .default({}),

        workexperience: z
            .array(
                z.object({
                    title: z.string().default(""),
                    company: z.string().default(""),
                    period: z.string().default(""),
                    description: z.string().default(""),
                })
            )
            .default([{}]),

        skills: z.array(ratedKnowledge).default([{}]),
        languages: z.array(ratedKnowledge).default([{}]),

        education: z
            .array(
                z.object({
                    institution: z.string().default(""),
                    degree: z.string().default(""),
                    year: z.number().min(1950).max(2030).default(2024),
                })
            )
            .default([{}]),
    })
    .default({});
