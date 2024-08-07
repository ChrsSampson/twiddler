-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "reports" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "reports" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Comments_id_key" ON "Comments"("id");

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
