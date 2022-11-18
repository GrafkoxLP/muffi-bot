const { Client, ActivityType, GatewayIntentBits, Collection, ActionRow, EmbedBuilder, Routes } = require("discord.js")
const { REST } = require('@discordjs/rest');
require("dotenv").config()

// Import all the commands
const pingCommand = require("./commands/ping.js")
const helloCommand = require("./commands/hello.js")
const kopfoderzahlCommand = require("./commands/headortail.js")

const client = new Client({intents: [
	GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents]});
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
registerCommands();
client.login(process.env.DISCORD_BOT_TOKEN);
const statusArray = [
    {
        name: "mit (/) Commands",
        type: ActivityType.Playing,
        statusbar: "online"
    },
    //{
    //    name: "!help | Dead City",
    //    type: ActivityType.Playing,
    //    statusbar: "online"
    //}
];
async function pickPresence() {
    const option = Math.floor(Math.random() * statusArray.length);

    try {
        await client.user.setActivity({
            name: statusArray[option].name,
            type: statusArray[option].type,
            status: statusArray[option].statusbar
        })
    } catch (error) {
        console.error(error);
    }
};
setInterval(pickPresence, 30 * 1000);
client.on("ready", () => {
    console.log("Bot is ready!");
});
async function registerCommands() {
    const commands = [pingCommand, helloCommand, kopfoderzahlCommand];
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            //Routes.applicationGuildCommands(process.env.DISCORD_APPLICATION_ID, process.env.DEV_GUILD_ID), // Slash Commands for DEV Server
            Routes.applicationCommands(process.env.DISCORD_APPLICATION_ID), //For Global Commands
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}


// Message Logger
client.on('messageCreate', (message) => {
    console.log('---------------------');
    console.log('Message: ' + message.content);
    console.log(message.createdAt.toDateString());
    console.log(message.author.tag);
    console.log('---------------------');
});

client.on('interactionCreate', (interaction) => {
    if (interaction.commandName === 'ping') {
        interaction.reply({content: 'Pong!'});
    }
    if (interaction.commandName === 'hello') {
        interaction.reply({content: 'Hello User!', ephemeral: true});
    }
    if (interaction.commandName === 'kopfoderzahl') {
        const random = Math.floor(Math.random() * 2);
        if (random == 0) {
            interaction.reply({content: 'Kopf'});
        } else {
            interaction.reply({content: 'Zahl'});
        }
    }
});