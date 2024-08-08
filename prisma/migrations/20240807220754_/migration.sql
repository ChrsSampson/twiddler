/*
  Warnings:

  - Added the required column `post_id` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "post_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "reports" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "LikedPosts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "LikedPosts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LikedPosts_id_key" ON "LikedPosts"("id");

-- AddForeignKey
ALTER TABLE "LikedPosts" ADD CONSTRAINT "LikedPosts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedPosts" ADD CONSTRAINT "LikedPosts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
