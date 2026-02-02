import express from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.ts";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);
    res.json({ message: "User registered successfully" });
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
