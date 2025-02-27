import {VoiceState} from 'discord.js';
import {insertOrUpdate} from '../../db/service/dailyUser';
import {IUser} from '../../db/dto/dailyUser';

export default async (state: VoiceState) => {
  const user: IUser = {
    id: state.member?.id ?? '',
    name: state.member?.displayName ?? '',
    started_at: null,
  };

  await insertOrUpdate(user);
};
