const request = require('supertest');
const app = require('../app');

describe('User Controller Tests', () => {
  
  // Testing registration with already taken username (Invalid Input)
  it('should return 400 if username is already taken', async () => {
    await request(app)
      .post('/api/register')
      .send({ username: 'user1', password: 'password' });

    const res = await request(app)
      .post('/api/register')
      .send({ username: 'user1', password: 'newpassword' });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual('Username already exists');
  });

  // Testing login with incorrect password (Invalid Input)
  it('should return 401 if password is incorrect', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ username: 'user1', password: 'wrongpassword' });

    expect(res.statusCode).toEqual(401);
    expect(res.body.error).toEqual('Invalid credentials');
  });
  
});
