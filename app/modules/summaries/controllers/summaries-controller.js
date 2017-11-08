import pick from 'lodash/pick';
import { Summary } from '../models';
import { SummaryService } from '../services';

export default {
  async create(ctx) {
    const summaryData = {
      ...pick(ctx.request.body, Summary.createFields),
      userId: ctx.user._id,
    };

    const { _id } = await SummaryService.createSummary(summaryData);
    const summary = await Summary.findOne({ _id });

    ctx.status = 201;
    ctx.body = { data: summary };
  },

  async update(ctx) {
    const {
      request: {
        body,
      },
      user: {
        _id: userId,
      },
      summary,
    } = ctx;

    if (summary.userId !== userId.toHexString()) {
      ctx.throw(403, `Forbidden. Summary with id "${summary._id}" dont belong to user with id ${userId}`);
    }

    const newData = pick(body, Summary.createFields);
    const updatedSummary = await SummaryService.updateSummary(newData, summary);

    ctx.body = { data: updatedSummary };
  },

  async delete(ctx) {
    const {
      user: {
        _id: userId,
      },
      summary,
    } = ctx;

    if (summary.userId !== userId.toHexString()) {
      ctx.throw(403, `Forbidden. Summary with id "${summary._id}" dont belong to user with id ${userId}`);
    }

    await summary.remove();

    ctx.body = { data: { id: summary._id } };
  },
};
