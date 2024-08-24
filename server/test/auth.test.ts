import { expect, test } from "vitest";
import { isValidEndpoint, isProtectedEndpoint } from "../src/libs/auth.util";

const BASE_PATH = "/api/v1/";

test("Should pass on valid API paths", () => {
	expect(isValidEndpoint(`${BASE_PATH}quotes/random`)).toBeTruthy();
	expect(isValidEndpoint(`${BASE_PATH}quotes/random/`)).toBeTruthy();
	expect(isValidEndpoint(`${BASE_PATH}quotes`)).toBeTruthy();
	expect(isValidEndpoint(`${BASE_PATH}quotes/`)).toBeTruthy();
});

test("should fail on invalid API paths", () => {
	expect(isValidEndpoint(`${BASE_PATH}foo`)).toBeFalsy();
	expect(isValidEndpoint(`${BASE_PATH}foo/bar`)).toBeFalsy();
	expect(isValidEndpoint(`${BASE_PATH}foo/bar/baz`)).toBeFalsy();
	expect(isValidEndpoint(`${BASE_PATH}?foo=bar`)).toBeFalsy();
});

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
