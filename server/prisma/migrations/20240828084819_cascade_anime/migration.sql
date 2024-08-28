-- DropForeignKey
ALTER TABLE `AnimeCharacter` DROP FOREIGN KEY `AnimeCharacter_animeId_fkey`;

-- DropForeignKey
ALTER TABLE `AnimeQuote` DROP FOREIGN KEY `AnimeQuote_animeCharacterId_fkey`;

-- DropForeignKey
ALTER TABLE `AnimeQuote` DROP FOREIGN KEY `AnimeQuote_animeId_fkey`;

-- DropForeignKey
ALTER TABLE `GenresOnAnime` DROP FOREIGN KEY `GenresOnAnime_animeId_fkey`;

-- AddForeignKey
ALTER TABLE `GenresOnAnime` ADD CONSTRAINT `GenresOnAnime_animeId_fkey` FOREIGN KEY (`animeId`) REFERENCES `Anime`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimeCharacter` ADD CONSTRAINT `AnimeCharacter_animeId_fkey` FOREIGN KEY (`animeId`) REFERENCES `Anime`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimeQuote` ADD CONSTRAINT `AnimeQuote_animeId_fkey` FOREIGN KEY (`animeId`) REFERENCES `Anime`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimeQuote` ADD CONSTRAINT `AnimeQuote_animeCharacterId_fkey` FOREIGN KEY (`animeCharacterId`) REFERENCES `AnimeCharacter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
