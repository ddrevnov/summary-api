import { Summary } from '../models';

export default {
  async createSummary(data) {
    const { userId } = data;
    const summaryCountByUserId = await Summary.count({ userId });

    if (summaryCountByUserId === 3) {
      throw Error('The user cannot create more 3 Summary');
    }

    return Summary.create(data);
  },
};
