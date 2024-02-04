export function paginate<T>(data: T[], pageNum: number, count = 10) {
	const startIdx = pageNum * count;
	return data.slice(startIdx, startIdx + count);
}
