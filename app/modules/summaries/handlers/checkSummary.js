import { Summary } from '../models';

export default () => async (_id, ctx, next) => {
  const summary = await Summary.findOne({ _id });

  if (!summary) {
    ctx.throw(404, `Summary with id "${_id}" not found`);
  }

  ctx.summary = summary;

  await next();
};
