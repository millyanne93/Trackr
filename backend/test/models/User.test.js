const User = require('../../models/User');

describe('User Model', () => {
  it('should hash the password before saving', async () => {
    const user = new User({ username: 'user1', password: 'password' });
    await user.save();
    expect(user.password).not.toEqual('password');
  });

  it('should correctly compare passwords', async () => {
    const user = new User({ username: 'user2', password: 'password' });
    await user.save();
    const isMatch = await user.comparePassword('password');
    expect(isMatch).toBeTruthy();
  });
});
