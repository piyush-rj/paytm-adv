-- AlterTable
ALTER TABLE "User" ADD COLUMN     "codeExpiry" TIMESTAMP(3),
ADD COLUMN     "isPhoneVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verificationCode" TEXT;
