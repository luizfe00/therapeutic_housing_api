-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isComplete" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "userName" DROP NOT NULL,
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "document" DROP NOT NULL;
