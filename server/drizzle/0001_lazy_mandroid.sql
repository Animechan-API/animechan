CREATE VIEW quote_view AS
SELECT q.content AS quote, c.name AS 'character', a.name AS anime
FROM quote q
			 LEFT JOIN animechan.`character` c ON c.id = q.character_id
			 LEFT JOIN animechan.anime a ON a.id = q.anime_id;
