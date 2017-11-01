import app from './app';
import { PORT } from './config';

const server = app.listen(PORT, (err) => {
  if (err) console.error(err);

  console.error(`Server running on port: ${PORT}`);
});

export default server;
