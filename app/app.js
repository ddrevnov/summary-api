import Koa from 'koa';
import connectorsInit from './connectors';

connectorsInit();

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = '<h1>Summary<h1>';
});

export default app;
