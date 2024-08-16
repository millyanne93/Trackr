const Admin = require('../../models/Admin');

describe('Admin Model', () => {
  it('should hash the password before saving', async () => {
    const admin = new Admin({ username: 'admin1', password: 'password' });
    await admin.save();
    expect(admin.password).not.toEqual('password');
  });

  it('should correctly compare passwords', async () => {
    const admin = new Admin({ username: 'admin2', password: 'password' });
    await admin.save();
    const isMatch = await admin.comparePassword('password');
    expect(isMatch).toBeTruthy();
  });
});
