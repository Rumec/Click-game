-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "country" TEXT,
    "clickCount" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
