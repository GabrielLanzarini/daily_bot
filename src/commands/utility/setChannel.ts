import {SlashCommandBuilder, ChannelType, ChatInputCommandInteraction} from 'discord.js';
import {insertOrUpdate} from '../../db/service/dailyChannel';
import {resetAll} from '../../db/service/dailyUser';

export default {
  data: new SlashCommandBuilder()
    .setName('daily_channels')
    .setDescription('Adiciona os canais para monitorar a daily')
    .addChannelOption((option) =>
      option
        .setName('voice_channel')
        .setDescription('Canal de voz')
        .addChannelTypes(ChannelType.GuildVoice)
        .setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const voiceChannelToCheck = interaction.options.getChannel('voice_channel');

    try {
      if (!interaction.guildId)
        return await interaction.reply(
          `Ocorreu um problema ao registrar, tente novamente mais tarde!`
        );

      const voiceReponse = await insertOrUpdate({
        guild_id: interaction.guildId,
        name: voiceChannelToCheck?.name ?? '',
      });

      const isUpdatingVoice = voiceReponse === 'update' ? 'atualizado' : 'registrado';

      if (voiceReponse == 'update') resetAll();

      await interaction.reply(`Canal de voz ${isUpdatingVoice} como ${voiceChannelToCheck?.name}!`);
    } catch (err) {
      await interaction.reply(
        `Ocorreu um problema ao registrar, tente novamente mais tarde! ${err}`
      );
    }
  },
};
