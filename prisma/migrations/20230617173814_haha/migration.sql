/*
  Warnings:

  - You are about to drop the column `categoriesId` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_name` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "movies" DROP CONSTRAINT "movies_categoriesId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_postsId_fkey";

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "user_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "categoriesId";

-- DropTable
DROP TABLE "categories";
