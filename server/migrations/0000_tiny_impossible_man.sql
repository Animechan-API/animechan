CREATE TABLE `anime` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	CONSTRAINT `anime_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `character` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`anime_id` int NOT NULL,
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
