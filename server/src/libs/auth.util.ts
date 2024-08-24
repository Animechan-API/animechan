const AVAILABLE_ENDPOINT_PATHS = ["/api/v1/quotes/", "/api/v1/quotes/random/"];

const PROTECTED_ENDPOINTS_URLS = [
	{
		pathname: "/api/v1/quotes/",
		params: ["anime", "character", "page"],
	},
	{
		pathname: "/api/v1/quotes/random/",
		params: ["anime", "character"],
	},
];

const addTrailingSlash = (path: string) => {
	return path.endsWith("/") ? path : `${path}/`;
};

export const isValidEndpoint = (path: string) => {
	const updatedPath = addTrailingSlash(path);
	return AVAILABLE_ENDPOINT_PATHS.includes(updatedPath);
};

export const isProtectedEndpoint = (url: string) => {
	const { pathname, searchParams } = new URL(url, "https://animechan.io");
	const updatedPath = addTrailingSlash(pathname);

	if (!isValidEndpoint(updatedPath)) {
		return false;
	}

	return PROTECTED_ENDPOINTS_URLS.some((endpoint) => {
		return (
			updatedPath === endpoint.pathname && endpoint.params.some((param) => searchParams.get(param))
		);
	});
};
