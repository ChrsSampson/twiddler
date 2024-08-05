/*
  Warnings:

  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar",
DROP COLUMN "username";

-- CreateTable
CREATE TABLE "UserAttributes" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "avatar" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "UserAttributes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAttributes_id_key" ON "UserAttributes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserAttributes_user_id_key" ON "UserAttributes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserAttributes_username_key" ON "UserAttributes"("username");

-- AddForeignKey
ALTER TABLE "UserAttributes" ADD CONSTRAINT "UserAttributes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
