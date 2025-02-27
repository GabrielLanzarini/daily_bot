import {VoiceState} from 'discord.js';
import {insertOrUpdate} from '../../db/service/dailyUser';
import {IUser} from '../../db/dto/dailyUser';
import {findOneByServerId} from '../../db/service/dailyChannel';
import {IChannel} from '../../db/dto/dailyChannel';

export default async (state: VoiceState) => {
  const channelToMonitor = (await findOneByServerId(state.guild.id)) as IChannel;

  if (state.channel?.name !== channelToMonitor.name) return;

  const user: IUser = {
    id: state.member?.id ?? '',
    name: state.member?.displayName ?? '',
    started_at: null,
  };

  await insertOrUpdate(user);
};
