export async function fetcher(url: string, options?: RequestInit) {
	const updatedUrl = `${process.env.PRIVATE_API_URL}${url}`;
	return await fetch(updatedUrl, options);
}
