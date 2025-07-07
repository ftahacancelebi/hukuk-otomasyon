import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCases = async (req: Request, res: Response) => {
  try {
    const cases = await prisma.case.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(cases);
  } catch (error) {
    res.status(500).json({ error: "Davalar getirilemedi." });
  }
};

export const getCaseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const caseItem = await prisma.case.findUnique({
      where: { id: parseInt(id) },
    });
    if (!caseItem) {
      res.status(404).json({ error: "Dava bulunamadı." });
      return;
    }
    res.json(caseItem);
  } catch (error) {
    res.status(500).json({ error: "Dava getirilemedi." });
  }
};

export const createCase = async (req: Request, res: Response) => {
  try {
    const newCase = await prisma.case.create({
      data: req.body,
    });
    res.status(201).json(newCase);
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as any).code === "P2002"
    ) {
      res.status(400).json({ error: "Bu Föy No veya Esas No zaten mevcut." });
      return;
    }
    res.status(500).json({ error: "Dava oluşturulamadı.", details: error });
  }
};

// --- GELECEKTE EKLENECEK FONKSİYONLAR ---
// export const generateDocument = async (req: Request, res: Response) => { ... }
// export const archiveFiles = async (req: Request, res: Response) => { ... }
