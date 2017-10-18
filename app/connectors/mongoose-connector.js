import mongoose from 'mongoose';

mongoose.Promise = Promise;

export default (mongoUri) => {
  if (!mongoUri) {
    throw Error('Mongo uri is undefined');
  }

  return new Promise((res, rej) => {
    mongoose
      .connect(mongoUri, { useMongoClient: true })
      .then((mongodb) => {
        res(mongodb);
        console.log('Mongo connected');
      })
      .catch((err) => {
        rej(err);
      });
  });
};
