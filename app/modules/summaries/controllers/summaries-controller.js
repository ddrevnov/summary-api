import pick from 'lodash/pick';
import { Summary } from '../models';
import { SummaryService } from '../services';

export default {
  async create(ctx) {
    const summaryData = {
      ...pick(ctx.request.body, Summary.createFields),
      userId: ctx.user._id,
    };

    try {
      const { _id } = await SummaryService.createSummary(summaryData);
      const summary = await Summary.findOne({ _id });

      ctx.body = { data: summary };
    } catch (e) {
      ctx.throw(400, e);
    }
  },
};
