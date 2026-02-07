import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.ts";
import { LoginSchema, UserSchema } from "../schemas/authSchema.ts";
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

router.post("/login", validate(LoginSchema), async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  const isPasswordValid = await bcrypt.compare(
    password,
    existingUser?.password || "",
  );

  if (!existingUser || !isPasswordValid)
    return res.status(401).json({ message: "Invalid credentials" });
  else {
    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });
    return res.status(200).json({ message: "Login successful", token });
  }
});
export default router;
