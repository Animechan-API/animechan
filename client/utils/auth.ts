import type { GetServerSidePropsContext } from "next";

// This checks whether the current environment is Node.js or Browser.
// If it's Node.js, then it means the function is being executed
// on the server itself via the `getServerSideProps` method.
const isNode = typeof window === "undefined" && typeof process === "object";

export const checkAuth = async (cookie?: string) => {
	const apiEndpoint = `${isNode ? process.env.PRIVATE_API_URL : ""}/api/auth/check`;
	const response = await fetch(apiEndpoint, {
		method: "GET",
		credentials: "include",
		headers: {
			...(cookie && { cookie: cookie }),
		},
	});
	if (response.status === 200) {
		return true;
	}
	return false;
};

/**
 * An extension for GetServerSideProps for easy auth management
 *
 * @async
 * @param {GetServerSidePropsContext} context - Context of the request
 * @param {CallableFunction} [func] - Function to execute incase user is not authenticated
 */
export const checkAuthSSR = async (context: GetServerSidePropsContext, func?: CallableFunction) => {
	const cookie = context.req.headers.cookie;
	const isAuthenticated = await checkAuth(cookie);

	if (!isAuthenticated) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	if (!func) {
		return {
			props: {},
		};
	}

	return func();
};

// Redirects authenticated users to dashboard
export const redirectAuthenticatedToDashboard = async (
	context: GetServerSidePropsContext,
	func?: CallableFunction,
) => {
	const cookie = context.req.headers.cookie;
	const isAuthenticated = await checkAuth(cookie);

	if (isAuthenticated) {
		return {
			redirect: {
				destination: "/dashboard",
				permanent: false,
			},
		};
	}

	if (!func) {
		return {
			props: {},
		};
	}
	return func();
};
