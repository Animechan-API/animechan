/*
  Warnings:

  - A unique constraint covering the columns `[altName]` on the table `Anime` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Anime` ADD COLUMN `altName` VARCHAR(500) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Anime_altName_key` ON `Anime`(`altName`);
