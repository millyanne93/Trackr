const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  tokens: [{ token: String }]
});

// Password hashing middleware
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
// Generate a token for the user
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ id: this._id, role: this.role, username: this.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

module.exports = mongoose.model('User', userSchema);
