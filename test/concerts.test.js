/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const Concert = require('../models/concerts.models');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /concerts', () => {
  before(async () => {
    const concertOne = new Concert({
      _id: '5d9f1140f10a81216cfd4408',
      performer: 'Maryla Rodowicz',
      genre: 'Metal',
      price: 35,
      day: 1,
    });
    await concertOne.save();

    const concertTwo = new Concert({
      _id: '5d9f1140f10a81216cfd4409',
      performer: 'Jan Paweł',
      genre: 'R&B',
      price: 25,
      day: 1,
    });
    await concertTwo.save();
  });

  it('should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });
  it('should return concert by id', async () => {
    const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.length).to.be.not.be.null;
  });
  it('should return performer by name', async () => {
    const res = await request(server).get('/api/concerts/performer/Maryla Rodowicz');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });
  it('should return genre by name', async () => {
    const res = await request(server).get('/api/concerts/genre/Metal');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });
  it('should return pricemin/pricemax', async () => {
    const res = await request(server).get('/api/concerts/price/20/30');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });
  it('should return concerts by day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });
  after(async () => {
    await Concert.deleteMany();
  });
});
