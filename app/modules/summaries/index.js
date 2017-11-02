import Router from 'koa-router';
import summariesController from './controllers/summaries-controller';
import checkUser from '../../handlers/checkUser';

const router = new Router({ prefix: '/summaries' });

router
  .post('/', checkUser(), summariesController.create);

export default router.routes();
