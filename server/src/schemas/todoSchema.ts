import * as z from "zod";

export const todoSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(200, "Title must not be more than 200 characters long")
    .trim(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(1000, "Description must not be more than 1000 characters long")
    .trim(),
});
