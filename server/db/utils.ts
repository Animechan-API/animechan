import { Column, SQL, SQLWrapper } from 'drizzle-orm';
import { sql } from 'drizzle-orm/sql/sql';

// MySQL implementation of ILike
export const iLike = (column: Column, data: string | SQLWrapper): SQL => {
	return sql`LOWER (${column}) LIKE LOWER(${data})`;
};

export const rand = (): SQL => sql`RAND ()`;
