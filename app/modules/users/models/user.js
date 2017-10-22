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

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = bcrypt.genSaltSync(10);

  this.password = bcrypt.hashSync(this.password, salt);

  next();
});

UserSchema.methods.comparePasswords = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('user', UserSchema);
