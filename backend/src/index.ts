import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
//import caseRoutes from "./routes/caseRoutes";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

//app.use("/api/cases", caseRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
