/*
  Warnings:

  - You are about to drop the `UserAttributes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[profile_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profile_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserAttributes" DROP CONSTRAINT "UserAttributes_user_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profile_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "UserAttributes";

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "avatar" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_id_key" ON "UserProfile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_username_key" ON "UserProfile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_profile_id_key" ON "User"("profile_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
