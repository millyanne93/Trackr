const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');

describe('Auth Middleware Tests', () => {

  // Testing token tampering (Security Feature)
  it('should return 400 if token is tampered with', () => {
    const req = { header: jest.fn().mockReturnValue('Bearer tamperedToken') };
    const res = { status: jest.fn().mockReturnValue({ send: jest.fn() }) };
    const next = jest.fn();

    jwt.verify = jest.fn().mockImplementation(() => { throw new Error(); });

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().send).toHaveBeenCalledWith('Invalid token.');
  });

  // Testing unauthorized access (Security Feature)
  it('should return 403 if user does not have the right permissions', async () => {
    const res = await request(app)
      .get('/admin/users')
      .set('Authorization', `Bearer userTokenWithoutAdminRights`);
    
    expect(res.statusCode).toEqual(403);
    expect(res.body.error).toEqual('Access denied');
  });

});
