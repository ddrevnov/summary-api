import { MONGO_URI } from '../config';
import mongooseConnector from './mongoose-connector';

function connectorsInit() {
  console.log(MONGO_URI);
  mongooseConnector(MONGO_URI);
}

export {
  mongooseConnector,
};

export default connectorsInit;
