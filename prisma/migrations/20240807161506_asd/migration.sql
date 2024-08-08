/*
  Warnings:

  - You are about to drop the `Follow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Follower` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostReports` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserReport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followed_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_user_following_id_fkey";

-- DropForeignKey
ALTER TABLE "PostReports" DROP CONSTRAINT "PostReports_post_id_fkey";

-- DropForeignKey
ALTER TABLE "UserReport" DROP CONSTRAINT "UserReport_reporter_id_fkey";

-- DropTable
DROP TABLE "Follow";

-- DropTable
DROP TABLE "Follower";

-- DropTable
DROP TABLE "PostReports";

-- DropTable
DROP TABLE "UserReport";
