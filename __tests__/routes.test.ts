import request from 'supertest';
import { app } from '~/config/server';
import { prisma } from '~/config/prisma';

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
