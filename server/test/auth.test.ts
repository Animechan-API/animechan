import { expect, test } from "vitest";
import { isProtectedEndpoint } from "../src/libs/auth.util";

const BASE_PATH = "/api/v1/";

test("Should pass on protected API urls", () => {
	expect(isProtectedEndpoint(`${BASE_PATH}quotes/random?anime=naruto`)).toBeTruthy();
	expect(isProtectedEndpoint(`${BASE_PATH}quotes/random?character=naruto`)).toBeTruthy();
	expect(isProtectedEndpoint(`${BASE_PATH}quotes/random/?anime=naruto`)).toBeTruthy();
	expect(isProtectedEndpoint(`${BASE_PATH}quotes/random/?character=naruto`)).toBeTruthy();
	expect(isProtectedEndpoint(`${BASE_PATH}quotes?anime=naruto`)).toBeTruthy();
	expect(isProtectedEndpoint(`${BASE_PATH}quotes?character=naruto`)).toBeTruthy();
	expect(isProtectedEndpoint(`${BASE_PATH}quotes/?anime=naruto`)).toBeTruthy();
	expect(isProtectedEndpoint(`${BASE_PATH}quotes/?character=naruto`)).toBeTruthy();
});

test("should fail on unprotected/free API urls", () => {
	expect(isProtectedEndpoint(`${BASE_PATH}quotes`)).toBeFalsy();
	expect(isProtectedEndpoint(`${BASE_PATH}quotes/`)).toBeFalsy();
	expect(isProtectedEndpoint(`${BASE_PATH}quotes/random`)).toBeFalsy();
	expect(isProtectedEndpoint(`${BASE_PATH}quotes/random/`)).toBeFalsy();
});

test("Should pass on valid protected API urls with additional params", () => {
	expect(
		isProtectedEndpoint(`${BASE_PATH}quotes/random?anime=naruto&character=naruto`),
	).toBeTruthy();
	expect(
		isProtectedEndpoint(`${BASE_PATH}quotes/random/?character=naruto&anime=naruto`),
	).toBeTruthy();
	expect(
		isProtectedEndpoint(`${BASE_PATH}quotes/random/?character=naruto&anime=naruto&page=2`),
	).toBeTruthy();
});

test("Should pass on protected API urls with additional unknown params", () => {
	// Accepts additional not pre-defined params like `foo` here but only in the presence
	// of a premium query param which is `character` in this case below.
	expect(isProtectedEndpoint(`${BASE_PATH}quotes/random/?character=naruto&foo=bar`)).toBeTruthy();
	expect(isProtectedEndpoint(`${BASE_PATH}quotes/random/?foo=bar`)).toBeFalsy();
});
