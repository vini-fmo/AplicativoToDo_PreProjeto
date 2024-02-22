/*
  Warnings:

  - You are about to drop the `TagsOnTasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TaskToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tagId` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_TaskToUser_B_index";

-- DropIndex
DROP INDEX "_TaskToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TagsOnTasks";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_TaskToUser";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    CONSTRAINT "tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tasks_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tasks" ("completed", "createdAt", "id", "name", "updatedAt") SELECT "completed", "createdAt", "id", "name", "updatedAt" FROM "tasks";
DROP TABLE "tasks";
ALTER TABLE "new_tasks" RENAME TO "tasks";
CREATE UNIQUE INDEX "tasks_name_key" ON "tasks"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
