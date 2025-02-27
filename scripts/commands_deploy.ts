import {REST, Routes} from 'discord.js';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
dotenv.config();

const token = process.env.DISCORD_TOKEN ?? '';
const mode = process.env.MODE ?? '';
const clientId = process.env.CLIENT_ID ?? '';
const guildId = process.env.GUILD_ID ?? '';

const commands = [];
const foldersPath = path.join(__dirname, '../src/commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath).default;

    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const rest = new REST().setToken(token);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    const body = commands;

    if (mode == 'prod') {
      const data = await rest.put(Routes.applicationCommands(clientId), {body});
      console.log('data', data);
      console.log(`Successfully reloaded in all servers.`);
    }

    if (mode == 'dev') {
      const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), {body});
      console.log('data', data);
      console.log(`Successfully reloaded in guilds development.`);
    }
  } catch (error) {
    console.error(error);
  }
})();
