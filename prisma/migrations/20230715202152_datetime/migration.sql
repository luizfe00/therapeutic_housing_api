/*
  Warnings:

  - You are about to drop the column `residenceId` on the `CareTaker` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CareTaker" DROP CONSTRAINT "CareTaker_residenceId_fkey";

-- AlterTable
ALTER TABLE "CareTaker" DROP COLUMN "residenceId";

-- AlterTable
ALTER TABLE "Income" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Shopping" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "_CaretakerResidence" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CaretakerResidence_AB_unique" ON "_CaretakerResidence"("A", "B");

-- CreateIndex
CREATE INDEX "_CaretakerResidence_B_index" ON "_CaretakerResidence"("B");

-- AddForeignKey
ALTER TABLE "_CaretakerResidence" ADD CONSTRAINT "_CaretakerResidence_A_fkey" FOREIGN KEY ("A") REFERENCES "CareTaker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaretakerResidence" ADD CONSTRAINT "_CaretakerResidence_B_fkey" FOREIGN KEY ("B") REFERENCES "Residence"("id") ON DELETE CASCADE ON UPDATE CASCADE;
