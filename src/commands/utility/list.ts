import dayjs from 'dayjs';
import {SlashCommandBuilder, ChatInputCommandInteraction} from 'discord.js';
import {getAll} from '../../db/service/dailyUser';
import {IUserWithData} from '../../db/dto/dailyUser';
import {findOneByServerId} from '../../db/service/dailyChannel';

export default {
  data: new SlashCommandBuilder().setName('list').setDescription('Lista a daily'),
  async execute(interaction: ChatInputCommandInteraction) {
    const serverId = interaction?.guild?.id ?? '';
    const dailyChannel = await findOneByServerId(serverId);

    if (!dailyChannel)
      return interaction.reply('Use `/daily_channel` para escolher um canal para observar');

    const data = (await getAll()) as IUserWithData[];

    const sortedData = data.sort((a, b) => a.started_at - b.started_at);
    let table = '```\n';

    const col1Width = 25;
    const col2Width = 20;

    const nomeHeader = 'Nome';
    const dataEntradaHeader = '| Data Entrada';

    table += nomeHeader.padEnd(col1Width);
    table += dataEntradaHeader.padEnd(col2Width);
    table += '\n';

    table += '-'.repeat(col1Width) + '+';
    table += '-'.repeat(col2Width) + '\n';

    sortedData.forEach(({name, started_at}) => {
      const date = dayjs(started_at).format('HH:mm:ss');
      table += name.padEnd(col1Width);
      table += `| ${date.padEnd(col2Width - 2)}`;
      table += '\n';
    });

    table += '```';

    await interaction.reply(table);
  },
};
