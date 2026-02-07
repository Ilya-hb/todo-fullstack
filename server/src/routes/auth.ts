import express from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.ts";
import { UserSchema } from "../schemas/authSchema.ts";
import { validate } from "../middleware/validators.ts";

const router = express.Router();

router.post("/register", validate(UserSchema), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  res.json({ message: "Login service works" });
});
export default router;
