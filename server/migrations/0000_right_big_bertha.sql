CREATE TABLE `anime` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	CONSTRAINT `anime_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `character` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`anime_id` int,
	CONSTRAINT `character_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quote` (
	`id` int AUTO_INCREMENT NOT NULL,
	`content` text NOT NULL,
	`anime_id` int NOT NULL,
	`character_id` int NOT NULL,
	CONSTRAINT `quote_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `character` ADD CONSTRAINT `character_anime_id_anime_id_fk` FOREIGN KEY (`anime_id`) REFERENCES `anime`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quote` ADD CONSTRAINT `quote_anime_id_anime_id_fk` FOREIGN KEY (`anime_id`) REFERENCES `anime`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quote` ADD CONSTRAINT `quote_character_id_character_id_fk` FOREIGN KEY (`character_id`) REFERENCES `character`(`id`) ON DELETE no action ON UPDATE no action;