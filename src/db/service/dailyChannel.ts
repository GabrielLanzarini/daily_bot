import {IChannel} from '../dto/dailyChannel';
import {dbQuery, dbRunner} from '../utils/commands';

export const createDailyChannelTableDB = async () => {
  try {
    await dbRunner(`
      CREATE TABLE IF NOT EXISTS daily_channel (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        guild_id TEXT NOT NULL,
        name TEXT NOT NULL
      )
    `);
  } catch (err) {
    throw err;
  }
};

export const findOneByServerId = async (guild_id: string) => {
  try {
    return await dbQuery(`SELECT * FROM daily_channel WHERE guild_id = ?`, [guild_id]);
  } catch (err) {
    console.error('Error getting channel', err);
    throw err;
  }
};

export const insertOrUpdate = async (newChannel: IChannel) => {
  try {
    const channel = (await findOneByServerId(newChannel.guild_id)) as IChannel;

    if (channel?.id !== undefined) {
      updateOneById(newChannel, channel.id);
      return 'update';
    }

    await dbRunner(
      `
        INSERT INTO daily_channel (guild_id, name)
        VALUES (?, ?)
      `,
      [newChannel.guild_id, newChannel.name]
    );
    return 'create';
  } catch (err) {
    console.error('Error adding channel:', err);
    throw err;
  }
};

const updateOneById = async ({guild_id, name}: IChannel, id: number) => {
  try {
    return await dbRunner(
      `
      UPDATE daily_channel
      SET name = ?, guild_id = ?
      WHERE id = ?
    `,
      [name, guild_id, id]
    );
  } catch (err) {
    throw err;
  }
};
