const request = require('supertest');
const app = require('../../server');

describe('Admin Routes', () => {
  it('should return 401 if no token is provided', async () => {
    const res = await request(app).get('/admin/users');
    expect(res.statusCode).toEqual(401);
  });

  it('should return 200 if token is valid', async () => {
    const res = await request(app)
      .get('/admin/users')
      .set('Authorization', `Bearer validToken`);
    expect(res.statusCode).toEqual(200);
  });

  // Additional tests for other admin routes
});
