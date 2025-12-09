/*
  Warnings:

  - The values [overdue] on the enum `InvoiceStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `SupportContact` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InvoiceStatus_new" AS ENUM ('due', 'paid');
ALTER TABLE "Invoice" ALTER COLUMN "status" TYPE "InvoiceStatus_new" USING ("status"::text::"InvoiceStatus_new");
ALTER TYPE "InvoiceStatus" RENAME TO "InvoiceStatus_old";
ALTER TYPE "InvoiceStatus_new" RENAME TO "InvoiceStatus";
DROP TYPE "public"."InvoiceStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."SupportContact" DROP CONSTRAINT "SupportContact_companyId_fkey";

-- DropTable
DROP TABLE "public"."SupportContact";
