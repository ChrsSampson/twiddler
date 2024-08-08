-- CreateTable
CREATE TABLE "UserReport" (
    "id" SERIAL NOT NULL,
    "reporter_id" INTEGER NOT NULL,

    CONSTRAINT "UserReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follow" (
    "id" SERIAL NOT NULL,
    "followed_user_id" INTEGER NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follower" (
    "id" SERIAL NOT NULL,
    "user_following_id" INTEGER NOT NULL,

    CONSTRAINT "Follower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostReports" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "PostReports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserReport_id_key" ON "UserReport"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_id_key" ON "Follow"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followed_user_id_key" ON "Follow"("followed_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Follower_id_key" ON "Follower"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Follower_user_following_id_key" ON "Follower"("user_following_id");

-- CreateIndex
CREATE UNIQUE INDEX "PostReports_id_key" ON "PostReports"("id");

-- AddForeignKey
ALTER TABLE "UserReport" ADD CONSTRAINT "UserReport_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followed_user_id_fkey" FOREIGN KEY ("followed_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_user_following_id_fkey" FOREIGN KEY ("user_following_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReports" ADD CONSTRAINT "PostReports_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
