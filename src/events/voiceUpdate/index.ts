import {VoiceState} from 'discord.js';
import channelIn from './channelIn';
import channelOut from './channelOut';
import channelChange from './channelChange';

export default async (newState: VoiceState, oldState: VoiceState) => {
  if (!oldState.channel && newState.channel) await channelIn(newState);
  if (oldState.channel && !newState.channel) await channelOut(oldState);
  if (oldState.channel && newState.channel) await channelChange(oldState, newState);
};
