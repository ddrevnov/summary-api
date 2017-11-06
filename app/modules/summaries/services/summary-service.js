import { Summary } from '../models';

export default {
  async createSummary(data) {
    const { userId } = data;
    const summaryCountByUserId = await Summary.count({ userId });

    if (summaryCountByUserId === 3) {
      throw Error('User can have no more than three summary');
    }

    return Summary.create(data);
  },

  async updateSummary(data, summary) {
    summary.set(data);

    return await summary.save();
  },
};
