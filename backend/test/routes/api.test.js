const request = require('supertest');
const app = require('../../server');

describe('API Routes', () => {
  it('should return all equipment', async () => {
    const res = await request(app).get('/api/equipment');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should return a single piece of equipment by ID', async () => {
    const res = await request(app).get('/api/equipment/validId');
    expect(res.statusCode).toEqual(200);
  });

  // Additional tests for other API routes
});
