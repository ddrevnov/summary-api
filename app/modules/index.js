import Router from 'koa-router';
import auth from './auth';
import summaries from './summaries';

const router = new Router({ prefix: '/api' });

router.use(auth);
router.use(summaries);

export default router.routes();
