import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';

mongoose.plugin(uniqueValidator);

const UserSchema = new Schema({
  email: {
    type: String,
    unique: 'User with email "{VALUE}" already exist',
    lowercase: true,
    required: 'Email is required',
  },
  password: {
    type: String,
    required: 'Password is required',
  },
  firstName: {
    type: String,
    lowercase: true,
    required: true,
  },
  lastName: {
    type: String,
    lowercase: true,
    required: true,
  },
}, {
  timestamp: true,
});

UserSchema.statics.createFields = ['email', 'firstName', 'lastName', 'password'];

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.methods.comparePasswords = function(password) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model('user', UserSchema);
