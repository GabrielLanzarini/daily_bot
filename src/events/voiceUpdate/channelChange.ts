import {VoiceState} from 'discord.js';
import {IChannel} from '../../db/dto/dailyChannel';
import {IUser} from '../../db/dto/dailyUser';
import dayjs from 'dayjs';
import {findOneByServerId} from '../../db/service/dailyChannel';
import {insertOrUpdate} from '../../db/service/dailyUser';

export default async (oldState: VoiceState, newState: VoiceState) => {
  if (oldState.channelId === newState.channelId) return;

  const channelToMonitor = (await findOneByServerId(newState.guild.id)) as IChannel;

  const user: IUser = {
    id: newState.member?.id ?? '',
    name: newState.member?.displayName ?? '',
    started_at: dayjs().toDate(),
  };

  if (newState.channel?.name === channelToMonitor.name) return insertOrUpdate(user);

  user.started_at = null;

  if (oldState.channel?.name === channelToMonitor.name) return insertOrUpdate(user);
};
