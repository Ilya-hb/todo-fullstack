import "dotenv/config";
import express from "express";
import authRoutes from "./src/routes/auth.ts";
import todoRoutes from "./src/routes/todo.ts";

const app = express();
app.use(express.json());
const port = 3000;

app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
