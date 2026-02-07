import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.ts";
import { validate } from "../middleware/validators.ts";
import { authenticate } from "../middleware/auth.ts";
import { todoSchema } from "../schemas/todoSchema.ts";

const router = express.Router();

router.get("/", authenticate(), async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: (req as any).user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", authenticate(), validate(todoSchema), async (req, res) => {
  const { title, description } = req.body;
  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        userId: (req as any).user.id,
      },
    });
    res.status(201).json({ message: "Todo created successfully", todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", authenticate(), async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (todo.userId !== (req as any).user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const deletedTodo = await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
