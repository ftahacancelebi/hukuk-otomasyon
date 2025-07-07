-- CreateTable
CREATE TABLE "Case" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "foyNo" TEXT NOT NULL,
    "esasNo" TEXT NOT NULL,
    "hukukNo" TEXT,
    "basvuran" TEXT NOT NULL,
    "vekil" TEXT,
    "bagliHukuk" TEXT,
    "bagliHasar" TEXT,
    "policeBaslangic" DATETIME,
    "policeBitis" DATETIME,
    "kazaTarih" DATETIME NOT NULL,
    "sigortaliPlaka" TEXT,
    "karsiPlaka" TEXT,
    "aracBasiTeminat" REAL,
    "kazaBasiTeminat" REAL,
    "taslakAdi" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Case_foyNo_key" ON "Case"("foyNo");

-- CreateIndex
CREATE UNIQUE INDEX "Case_esasNo_key" ON "Case"("esasNo");
