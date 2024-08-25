const PROTECTED_ENDPOINTS_URLS = [
	{
		pathname: "/api/v1/quotes",
		params: ["anime", "character", "page"],
	},
	{
		pathname: "/api/v1/quotes/random",
		params: ["anime", "character"],
	},
];

export const isProtectedEndpoint = (url: string) => {
	const { pathname, searchParams } = new URL(url, "https://animechan.io");

	for (const endpoint of PROTECTED_ENDPOINTS_URLS) {
		if (pathname.includes(endpoint.pathname)) {
			for (const param of endpoint.params) {
				if (searchParams.has(param)) {
					return true;
				}
			}
			return false;
		}
	}
};
