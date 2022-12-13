import request from 'supertest';
import { app } from '~/config/server';
import { prisma } from '~/config/prisma';
import { strict } from 'node:assert';

let server;
beforeAll((done) => {
	server = app.listen(8081, done);
});
afterAll(async () => {
	await prisma.$disconnect();
	server.close();
});

test('check api health', async () => {
	const response = await request(server)
		.get('/health')
		.expect('Content-type', /json/)
		.expect(200);
	expect(response.body).toBeDefined();
	expect(response.body.active).toBeTruthy();
});

test('Get a random quote', async () => {
	const response = await request(server)
		.get('/random')
		.expect('Content-type', /json/)
		.expect(200);
	expect(response.body).toBeDefined();
	expect(Array.isArray(response.body)).toBeTruthy();
	expect(response.body).toHaveLength(1);
	expect(response.body[0]).toHaveProperty('text');
	expect(response.body[0]).toHaveProperty('character');
	expect(response.body[0]).toHaveProperty('anime');
});

test('Get a quotes from character', async () => {
	const response = await request(server)
		.get('/quotes/character?name=Father%20Willibald')
		.expect('Content-type', /json/)
		.expect(200);
	expect(response.body).toBeDefined();
	expect(Array.isArray(response.body)).toBeTruthy();
	expect(response.body.length).toBeGreaterThanOrEqual(1)
	expect(response.body[0]).toHaveProperty('text');
	expect(response.body[0]).toHaveProperty('character');
	expect(response.body[0]).toHaveProperty('anime');
	expect(response.body[0].character).toBe('Father Willibald');
});

test("get a quotes from an Anime", async () => {
	const response = await request(server)
		.get('/quotes/anime?title=guilty%20crown')
		.expect('Content-type', /json/)
		.expect(200);
	expect(response.body).toBeDefined();
	expect(Array.isArray(response.body)).toBeTruthy();
	expect(response.body.length).toBeGreaterThanOrEqual(1)
	expect(response.body[0]).toHaveProperty('text');
	expect(response.body[0]).toHaveProperty('character');
	expect(response.body[0]).toHaveProperty('anime');
	expect(response.body[0].anime).toBe('Guilty Crown');
});


test('Get a random quote from character', async () => {
	const response = await request(server)
		.get('/random/character?name=Father%20Willibald')
		.expect('Content-type', /json/)
		.expect(200);
	expect(response.body).toBeDefined();
	expect(Array.isArray(response.body)).toBeTruthy();
	expect(response.body).toHaveLength(1);
	expect(response.body[0]).toHaveProperty('text');
	expect(response.body[0]).toHaveProperty('character');
	expect(response.body[0]).toHaveProperty('anime');
	expect(response.body[0].character).toBe('Father Willibald');
});

test("get a random quote from an Anime", async () => {
	const response = await request(server)
		.get('/random/anime?title=guilty%20crown')
		.expect('Content-type', /json/)
		.expect(200);
	expect(response.body).toBeDefined();
	expect(Array.isArray(response.body)).toBeTruthy();
	expect(response.body).toHaveLength(1);
	expect(response.body[0]).toHaveProperty('text');
	expect(response.body[0]).toHaveProperty('character');
	expect(response.body[0]).toHaveProperty('anime');
	expect(response.body[0].anime).toBe('Guilty Crown');
});

test("get available quotes by anime", async () => {
	const response = await request(server)
		.get('/available/anime?title=guilty%20crown')
		.expect('Content-type', /json/)
		.expect(200);
	expect(response.body).toBeDefined();
	expect(response.body).toHaveProperty('anime');
	expect(response.body).toHaveProperty('counts');
	expect(response.body.anime).toBe('guilty crown');
});

test("get available quotes by character", async () => {
	const response = await request(server)
		.get('/available/character?name=Father%20Willibald')
		.expect('Content-type', /json/)
		.expect(200);
	expect(response.body).toBeDefined();
	expect(response.body).toHaveProperty('character');
	expect(response.body).toHaveProperty('counts');
	expect(response.body.character).toBe('Father Willibald');
});

test("get available animes and check for doubles", async () => {
	const response = await request(server).get('/available')
	.expect('Content-type', /json/)
	.expect(200);
	const body = response.body as Array<string>;
	expect(body).toBeDefined();
	expect(typeof body[0] === "string");
	expect(new Set(body).size).toBe(body.length);

})
