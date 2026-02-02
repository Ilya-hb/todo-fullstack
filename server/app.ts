import "dotenv/config";
import express from "express";
import authRoutes from "./src/routes/auth.ts";

const app = express();
app.use(express.json());
const port = 3000;

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
