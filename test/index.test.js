const server = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const {expect} = require('chai');

chai.use(chaiHttp);
const request = async path => chai.request(server).get(`/api${path}`);

describe('api status check', () => {
	it('should reponse with status 200', async () => {
		try {
			const res = await request('/status');
			expect(res).to.have.status(200);
			expect(res.body.status).to.equal('OK');
			expect(res.body.active).to.equal(true);
		} catch (error) {
			console.error('Test Error', error);
		}
	});
})

describe('/quotes endpoint test',()=>{
	it('should response with 10 default quotes',async()=>{
		try {
			const res = await request('/quotes');
			expect(res).to.have.status(200);
			expect(Array.isArray(res.body.data)).to.be.true;
			expect(res.body.data).to.have.lengthOf(10);
		} catch (error) {
			console.error(error)
		}
	})
})

describe('/quotes/random endpoint test',()=>{
	it('should reponse with a single radom quote',async()=>{
		try {
			const res = await request('/quotes/random');
			expect(res).to.have.status(200);
			expect(Array.isArray(res.body.data)).to.be.true;
			expect(res.body.data).to.have.lengthOf(1);
		} catch (error) {
			console.error(error);
		}
	})
})

describe('/quotes/quotes endpoint test',()=>{
	it('should response with 10 default quotes',async()=>{
		try {
			const res = await request('/quotes');
			expect(res).to.have.status(200);
			expect(Array.isArray(res.body.data)).to.be.true;
			expect(res.body.data).to.have.lengthOf(10);
		} catch (error) {
			console.error(error)
		}
	})
})

describe('/quotes?page=3 pagination test',()=>{
	// todo
	// it('should reponse with a error in pagination limit > 10',async()=>{
	// 	expect(await request('/quotes?page=20')).throw(new Error('pagination limit is only up to 10!'));
	// })

	it('should reponse with a single radom quote',async()=>{
		try {
			const res = await request('/quotes?page=3');
			expect(res).to.have.status(200);
			expect(Array.isArray(res.body.data)).to.be.true;
			expect(res.body.data).to.have.lengthOf(10);
		} catch (error) {
			console.error(error);
		}
	})
})

describe('/quotes?anime=naruto query with anime name',()=>{
	it('should response with 10 quotes of if the Anime',async()=>{
		try {
			const res = await request('/quotes?anime=naruto');
			expect(res).to.have.status(200);
			expect(Array.isArray(res.body.data)).to.be.true;
			expect(res.body.data).to.have.lengthOf(10);

			res.body.data.forEach(quote=>{
				expect(quote.anime).to.equal('Naruto');
			})
		} catch (error) {
			console.error(error)
		}
	})
})

describe('/quotes?char=saitama query with anime name',()=>{
	it('should response with 10 quotes of the character name',async()=>{
		try {
			const res = await request('/quotes?char=saitama');
			expect(res).to.have.status(200);
			expect(Array.isArray(res.body.data)).to.be.true;
			expect(res.body.data).to.have.lengthOf(10);

			res.body.data.forEach(quote=>{
				expect(quote.character).to.equal('Saitama');
			})
		} catch (error) {
			console.error(error)
		}
	})
})