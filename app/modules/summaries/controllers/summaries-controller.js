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

      ctx.status = 201;
      ctx.body = { data: summary };
    } catch (e) {
      ctx.throw(400, e);
    }
  },

  async update(ctx) {
    const {
      params: {
        id: _id,
      },
      request: {
        body,
      },
      user: {
        _id: userId,
      },
    } = ctx;

    const summary = await Summary.findOne({ _id });

    if (!summary) {
      ctx.throw(404, `Summary with id "${_id}" not found`);
    }

    if (summary.userId !== userId.toHexString()) {
      ctx.throw(403, `Forbidden. Summary with id "${_id}" dont belong to user with id ${userId}`);
    }

    const newData = pick(body, Summary.createFields);
    const updatedSummary = await SummaryService.updateSummary(newData, summary);

    ctx.body = { data: updatedSummary };
  },
};
