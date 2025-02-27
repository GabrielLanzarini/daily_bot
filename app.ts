import {Client, Events, GatewayIntentBits} from 'discord.js';
import dotenv from 'dotenv';
import {loadCommands} from './src/utils/loadCommands';
import {createAppTables} from './src/db/utils/createTables';
import voiceUpdate from './src/events/voiceUpdate';
dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN;

const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildMessages,
];

const client = new Client({
  intents,
});

client.once(Events.ClientReady, async (client) => {
  try {
    await createAppTables();
    loadCommands(client);
    console.log('BOT READY TO CONNECT!');
  } catch (err) {
    console.log(err);
  }
});

client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
  await voiceUpdate(newState, oldState);
});

client.on(Events.InteractionCreate, async (interaction: any) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
  }
});

client.login(TOKEN);
