import faker from 'faker/locale/ru';
import _ from 'lodash';
import { User } from '../modules/users';

export default () => {
  const promises = [];

  _.times(20, () => {
    const userPromise = User.create({
      email: `${faker.lorem.word(1, 10)}@${faker.lorem.word(1, 10)}`,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: 1111,
    });

    promises.push(userPromise);
  });

  return Promise.all(promises);
};
