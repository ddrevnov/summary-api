import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export default {
  async genToken(data) {
    return await jwt.sign(data, JWT_SECRET);
  },

  async verify(token) {
    return await jwt.verify(token, JWT_SECRET);
  },
};
