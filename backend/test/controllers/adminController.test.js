const request = require('supertest');
const app = require('../../server');
const Admin = require('../../models/Admin');

describe('Admin Controller', () => {
  let adminToken;

  beforeAll(async () => {
    const admin = new Admin({ username: 'admin', password: 'password' });
    await admin.save();
    adminToken = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    await Admin.deleteMany({});
  });

  it('should get all users', async () => {
    const res = await request(app)
      .get('/admin/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Additional tests for other controller methods
});
