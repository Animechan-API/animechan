export const convertToHhmmss = (uptime: number): string =>
	new Date(Math.floor(uptime) * 1000).toISOString().slice(11, 19);
