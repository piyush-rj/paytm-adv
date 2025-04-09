/*
  Warnings:

  - You are about to drop the column `codeExpiry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isPhoneVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationCode` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "codeExpiry",
DROP COLUMN "isPhoneVerified",
DROP COLUMN "verificationCode";
