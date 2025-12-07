-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('visa', 'mastercard', 'amex');

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "cardHolderName" TEXT NOT NULL DEFAULT 'John Doe',
ADD COLUMN     "cardType" "CardType" NOT NULL DEFAULT 'mastercard',
ADD COLUMN     "expiry" TEXT NOT NULL DEFAULT '12/26';
