import pick from 'lodash/pick';
import { User } from '../../users';
import jwtService from '../../../services/jwt-service';

export default {
  async signUp(ctx) {
    const { _id } = await User.create(pick(ctx.request.body, User.createFields));
    const user = await User.findOneWithPublicFields({ _id });

    ctx.body = { data: user };
  },

  async signIn(ctx) {
    const { email, password } = ctx.request.body;

    if (!email || !password) {
      ctx.throw(400, {
        message: 'Invalid data',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      ctx.throw(400, {
        message: 'User not found',
      });
    }

    if (!user.comparePasswords(password)) {
      ctx.throw(400, {
        message: 'Invalid data',
      });
    }

    const token = await jwtService.genToken({ email });

    ctx.body = { data: token };
  },
};
