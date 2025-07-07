import { Router } from "express";
import {
  createCase,
  getAllCases,
  getCaseById,
} from "../controllers/caseController";

const router = Router();

router.post("/", createCase);
router.get("/", getAllCases);
router.get("/:id", getCaseById);
//router.get("/:id", getCaseById);
// PUT, DELETE, vb. rotalar buraya eklenecek

export default router;
