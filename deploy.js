const { REST, Routes } = require('discord.js');
const { CLIENT_ID, GUILD_ID, DISCORD_BOT_TOKEN } = process.env;
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// 各スラッシュコマンドのJSON形式で格納する
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(JSON.stringify(command.data));
}

// スラッシュコマンドを登録するためのAPI
const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);

// デプロイ
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();