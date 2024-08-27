-- AlterTable
ALTER TABLE `Anime` ADD COLUMN `synopsis` TEXT NULL;

-- CreateTable
CREATE TABLE `AnimeGenre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GenresOnAnime` (
    `animeId` INTEGER NOT NULL,
    `genreId` INTEGER NOT NULL,

    PRIMARY KEY (`animeId`, `genreId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GenresOnAnime` ADD CONSTRAINT `GenresOnAnime_animeId_fkey` FOREIGN KEY (`animeId`) REFERENCES `Anime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GenresOnAnime` ADD CONSTRAINT `GenresOnAnime_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `AnimeGenre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
