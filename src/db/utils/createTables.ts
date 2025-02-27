import {createDailyChannelTableDB} from '../service/dailyChannel';
import {createDailyListTableDB} from '../service/dailyUser';

export const createAppTables = async () => {
  try {
    const promises = [createDailyListTableDB(), createDailyChannelTableDB()];

    await Promise.all(promises);
  } catch (err) {
    console.log(err);
  }
};
