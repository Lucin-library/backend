/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `BookID` on the `Book` table. All the data in the column will be lost.
  - The primary key for the `Bookshelf` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ShelfID` on the `Bookshelf` table. All the data in the column will be lost.
  - The primary key for the `UserAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `UserID` on the `UserAccount` table. All the data in the column will be lost.
  - The required column `ID` was added to the `Book` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `ID` was added to the `Bookshelf` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `ID` was added to the `UserAccount` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Advertisement" DROP CONSTRAINT "Advertisement_BookID_fkey";

-- DropForeignKey
ALTER TABLE "BookOnShelf" DROP CONSTRAINT "BookOnShelf_BookID_fkey";

-- DropForeignKey
ALTER TABLE "BookOnShelf" DROP CONSTRAINT "BookOnShelf_ShelfID_fkey";

-- DropForeignKey
ALTER TABLE "Bookshelf" DROP CONSTRAINT "Bookshelf_UserID_fkey";

-- DropForeignKey
ALTER TABLE "DiscussionThread" DROP CONSTRAINT "DiscussionThread_BookID_fkey";

-- DropForeignKey
ALTER TABLE "DiscussionThread" DROP CONSTRAINT "DiscussionThread_UserID_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_UserID_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_BookID_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_UserID_fkey";

-- DropForeignKey
ALTER TABLE "ReadingHistory" DROP CONSTRAINT "ReadingHistory_BookID_fkey";

-- DropForeignKey
ALTER TABLE "ReadingHistory" DROP CONSTRAINT "ReadingHistory_UserID_fkey";

-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
DROP COLUMN "BookID",
ADD COLUMN     "ID" TEXT NOT NULL,
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("ID");

-- AlterTable
ALTER TABLE "Bookshelf" DROP CONSTRAINT "Bookshelf_pkey",
DROP COLUMN "ShelfID",
ADD COLUMN     "ID" TEXT NOT NULL,
ADD CONSTRAINT "Bookshelf_pkey" PRIMARY KEY ("ID");

-- AlterTable
ALTER TABLE "UserAccount" DROP CONSTRAINT "UserAccount_pkey",
DROP COLUMN "UserID",
ADD COLUMN     "ID" TEXT NOT NULL,
ADD CONSTRAINT "UserAccount_pkey" PRIMARY KEY ("ID");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "UserAccount"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookshelf" ADD CONSTRAINT "Bookshelf_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "UserAccount"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookOnShelf" ADD CONSTRAINT "BookOnShelf_ShelfID_fkey" FOREIGN KEY ("ShelfID") REFERENCES "Bookshelf"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookOnShelf" ADD CONSTRAINT "BookOnShelf_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "UserAccount"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionThread" ADD CONSTRAINT "DiscussionThread_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "UserAccount"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionThread" ADD CONSTRAINT "DiscussionThread_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertisement" ADD CONSTRAINT "Advertisement_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingHistory" ADD CONSTRAINT "ReadingHistory_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "UserAccount"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingHistory" ADD CONSTRAINT "ReadingHistory_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
