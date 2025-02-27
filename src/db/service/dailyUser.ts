import {dbQuery, dbQueryAll, dbRunner} from '../utils/commands';
import {IUser} from '../dto/dailyUser';

export const createDailyListTableDB = async () => {
  try {
    await dbRunner(`CREATE TABLE IF NOT EXISTS daily_users (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      started_at DATE NULL
    )`);
  } catch (err) {
    throw err;
  }
};

export const getAll = async () => {
  try {
    return await dbQueryAll(
      `
      SELECT * FROM daily_users WHERE started_at IS NOT NULL
    `
    );
  } catch (err) {
    throw err;
  }
};

export const findOneById = async (id: string) => {
  try {
    return await dbQuery(
      `
      SELECT * FROM daily_users WHERE id = ?
    `,
      [id]
    );
  } catch (err) {
    throw err;
  }
};

export const updateOneById = async (user: IUser) => {
  try {
    return await dbRunner(
      `
      UPDATE daily_users
      SET name = ?, started_at = ?
      WHERE id = ?
    `,
      [user.name, user.started_at, user.id]
    );
  } catch (err) {
    throw err;
  }
};

export const insertOrUpdate = async (user: IUser) => {
  try {
    const existingUser = await findOneById(user.id);
    if (existingUser) return updateOneById(user);

    await dbRunner(
      `
      INSERT INTO daily_users (id, name, started_at)
      VALUES (?, ?, ?)
    `,
      [user.id, user.name, user.started_at]
    );
  } catch (err) {
    console.error('Error adding user:', err);
    throw err;
  }
};

export const resetAll = async () => {
  try {
    return await dbRunner(
      `
      UPDATE daily_users
      SET started_at = NULL
    `
    );
  } catch (err) {
    throw err;
  }
};
