import * as z from "zod";

export const UserSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long.")
    .max(100, "Too long name.")
    .trim(),
  email: z.email().trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(50, "Too long password.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one digit",
    )
    .trim(),
});

export const LoginSchema = z.object({
  email: z.email().trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(50, "Too long password.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one digit",
    )
    .trim(),
});
