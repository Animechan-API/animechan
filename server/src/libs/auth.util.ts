const PROTECTED_ENDPOINTS_QUERY_URLS = [
	{
		pathname: "/api/v1/quotes",
		params: ["anime", "character", "page"],
	},
	{
		pathname: "/api/v1/quotes/random",
		params: ["anime", "character"],
	},
];

const PROTECTED_BASIC_ENDPOINTS = ["/api/v1/anime"];

export const isProtectedEndpoint = (url: string) => {
	const { pathname, searchParams } = new URL(url, "https://animechan.io");

	const updatedPath = pathname.split("/").slice(0, 4).join("/");
	console.log({ updatedPath });
	if (PROTECTED_BASIC_ENDPOINTS.includes(updatedPath)) {
		return true;
	}

	for (const endpoint of PROTECTED_ENDPOINTS_QUERY_URLS) {
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
