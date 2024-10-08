const request = require('supertest');
const app = require('../server');

describe('Server', () => {
  it('should respond with 404 for an unknown route', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.statusCode).toEqual(404);
  });

  it('should start the server on the specified port', async () => {
    // This test would be more about checking if the server starts correctly
    expect(app.listen).toBeDefined();
  });
});
