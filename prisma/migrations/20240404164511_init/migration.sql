-- CreateTable
CREATE TABLE "UserAccount" (
    "UserID" TEXT NOT NULL,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "ProfilePictureURL" TEXT,
    "ContactInfo" TEXT,
    "RegistrationDate" TIMESTAMP(3),
    "updateAt" TIMESTAMP(3) NOT NULL,
    "deleteFlag" BOOLEAN NOT NULL,

    CONSTRAINT "UserAccount_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Author" (
    "AuthorsID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "BirthDay" TIMESTAMP(3),
    "Biography" TEXT,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "deleteFlag" BOOLEAN NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("AuthorsID")
);

-- CreateTable
CREATE TABLE "Book" (
    "BookID" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "AuthorID" TEXT NOT NULL,
    "Genre" TEXT,
    "Publisher" TEXT,
    "PublicationDate" TIMESTAMP(3),
    "ISBN" TEXT,
    "Description" TEXT,
    "CoverImageURL" TEXT,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "deleteFlag" BOOLEAN NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("BookID")
);

-- CreateTable
CREATE TABLE "Rating" (
    "UserID" TEXT NOT NULL,
    "BookID" TEXT NOT NULL,
    "Rating" DOUBLE PRECISION NOT NULL,
    "ReviewText" TEXT,
    "DateRated" TIMESTAMP(3),
    "updateAt" TIMESTAMP(3) NOT NULL,
    "deleteFlag" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Bookshelf" (
    "ShelfID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "BookID" TEXT NOT NULL,
    "Status" TEXT,
    "Name" TEXT,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL,
    "deleteFlag" BOOLEAN NOT NULL,

    CONSTRAINT "Bookshelf_pkey" PRIMARY KEY ("ShelfID")
);

-- CreateTable
CREATE TABLE "BookOnShelf" (
    "BookID" TEXT NOT NULL,
    "ShelfID" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "deleteFlag" BOOLEAN NOT NULL,

    CONSTRAINT "BookOnShelf_pkey" PRIMARY KEY ("ShelfID","BookID")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "ID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "TypeOF" TEXT NOT NULL,
    "RefFavoriteID" TEXT,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "deleteFlag" BOOLEAN NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "DiscussionThread" (
    "ID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "BookID" TEXT NOT NULL,
    "Title" TEXT,
    "Content" TEXT,
    "Timestamp" TIMESTAMP(3),
    "updateAt" TIMESTAMP(3) NOT NULL,
    "deleteFlag" BOOLEAN NOT NULL,

    CONSTRAINT "DiscussionThread_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Advertisement" (
    "ID" TEXT NOT NULL,
    "BookID" TEXT NOT NULL,
    "Title" TEXT,
    "Content" TEXT,
    "ImageURL" TEXT,
    "ExpiryDate" TIMESTAMP(3),
    "updateAt" TIMESTAMP(3) NOT NULL,
    "deleteFlag" BOOLEAN NOT NULL,

    CONSTRAINT "Advertisement_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "ReadingHistory" (
    "UserID" TEXT NOT NULL,
    "BookID" TEXT NOT NULL,
    "PageRead" INTEGER NOT NULL,
    "Status" TEXT,
    "Percentage" DOUBLE PRECISION,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReadingHistory_pkey" PRIMARY KEY ("UserID","BookID")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_Username_key" ON "UserAccount"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_Email_key" ON "UserAccount"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Book_ISBN_key" ON "Book"("ISBN");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_BookID_key" ON "Rating"("BookID");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_UserID_BookID_key" ON "Rating"("UserID", "BookID");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_AuthorID_fkey" FOREIGN KEY ("AuthorID") REFERENCES "Author"("AuthorsID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("BookID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "UserAccount"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookshelf" ADD CONSTRAINT "Bookshelf_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "UserAccount"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookOnShelf" ADD CONSTRAINT "BookOnShelf_ShelfID_fkey" FOREIGN KEY ("ShelfID") REFERENCES "Bookshelf"("ShelfID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookOnShelf" ADD CONSTRAINT "BookOnShelf_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("BookID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "UserAccount"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionThread" ADD CONSTRAINT "DiscussionThread_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "UserAccount"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionThread" ADD CONSTRAINT "DiscussionThread_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("BookID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertisement" ADD CONSTRAINT "Advertisement_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("BookID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingHistory" ADD CONSTRAINT "ReadingHistory_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "UserAccount"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingHistory" ADD CONSTRAINT "ReadingHistory_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("BookID") ON DELETE RESTRICT ON UPDATE CASCADE;
