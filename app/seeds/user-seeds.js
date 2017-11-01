import faker from 'faker/locale/ru';
import _ from 'lodash';
import { User } from '../modules/users';

function init() {
  const promises = [];

  _.times(20, async () => {
    const userPromise = User.create({
      email: `${faker.lorem.word(1, 10)}@${faker.lorem.word(1, 10)}`,
      firstName: faker.lorem.word(1, 10),
      lastName: faker.lorem.word(1, 10),
      password: 1111,
    });

    promises.push(userPromise);
  });

  return Promise.all(promises);
}

export default init;
