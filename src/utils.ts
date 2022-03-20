export const convertToHhmmss = (uptime: number): string =>
	new Date(Math.floor(uptime) * 1000).toISOString().slice(11, 19);

type QuoteType = {
	id: number;
	anime: string;
	character: string;
	quote: string;
}[];
export const excludeID = (objArr: QuoteType) => {
	return objArr.map((obj) => {
		obj.hasOwnProperty('id') && delete obj.id;
		return obj;
	});
};
