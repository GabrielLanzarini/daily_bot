import {VoiceState} from 'discord.js';
import {IUser} from '../../db/dto/dailyUser';
import dayjs from 'dayjs';
import {insertOrUpdate} from '../../db/service/dailyUser';

export default async (state: VoiceState) => {
  const user: IUser = {
    id: state.member?.id ?? '',
    name: state.member?.displayName ?? '',
    started_at: dayjs().toDate(),
  };

  await insertOrUpdate(user);
};
