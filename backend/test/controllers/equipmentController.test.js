const request = require('supertest');
const app = require('../app');

describe('Equipment Controller Tests', () => {
  
  // Testing equipment creation with missing name (Edge Case)
  it('should return 400 if equipment name is missing', async () => {
    const res = await request(app)
      .post('/api/equipment')
      .send({ serialNumber: '12345' })
      .set('Authorization', `Bearer validToken`);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual('Equipment name is required');
  });

  // Testing fetching a non-existent equipment (Edge Case)
  it('should return 404 if equipment is not found', async () => {
    const res = await request(app)
      .get('/api/equipment/invalidId')
      .set('Authorization', `Bearer validToken`);
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual('Equipment not found');
  });

  // Testing with maximum allowed length for equipment name (Boundary Condition)
  it('should return 201 if equipment name is at max length', async () => {
    const longName = 'a'.repeat(255); // assuming 255 is the max length
    const res = await request(app)
      .post('/api/equipment')
      .send({ name: longName, serialNumber: '12345' })
      .set('Authorization', `Bearer validToken`);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual(longName);
  });

  // Testing with an empty string as an equipment name (Boundary Condition)
  it('should return 400 if equipment name is an empty string', async () => {
    const res = await request(app)
      .post('/api/equipment')
      .send({ name: '', serialNumber: '12345' })
      .set('Authorization', `Bearer validToken`);
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual('Equipment name is required');
  });

  // Performance test for a quick query
  it('should return within 100ms for a quick query', async () => {
    const start = new Date().getTime();
    const res = await request(app).get('/api/equipment');
    const end = new Date().getTime();
    
    expect(res.statusCode).toEqual(200);
    expect(end - start).toBeLessThan(100);
  });
  
  // Testing complex user workflow
  it('should handle a full user workflow', async () => {
    // Register User
    let res = await request(app)
      .post('/api/register')
      .send({ username: 'user1', password: 'password' });
    expect(res.statusCode).toEqual(201);

    // Login User
    res = await request(app)
      .post('/api/login')
      .send({ username: 'user1', password: 'password' });
    expect(res.statusCode).toEqual(200);
    const token = res.body.token;

    // Checkout Equipment
    res = await request(app)
      .post('/api/equipment/checkout')
      .send({ equipmentId: 'validEquipmentId' })
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);

    // Return Equipment
    res = await request(app)
      .post('/api/equipment/return')
      .send({ equipmentId: 'validEquipmentId' })
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

});
