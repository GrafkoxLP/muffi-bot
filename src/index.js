const { Client, ActivityType, GatewayIntentBits, Collection, ActionRow, EmbedBuilder, Routes, PermissionsBitField } = require("discord.js")
const { REST } = require('@discordjs/rest');
require("dotenv").config()

// Import all the commands
const pingCommand = require("./commands/ping.js")
const kopfoderzahlCommand = require("./commands/kopfoderzahl.js")
const kickCommand = require("./commands/kick.js")

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
    const commands = [pingCommand, kopfoderzahlCommand, kickCommand];
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



// Commands
client.on('interactionCreate', (interaction) => {
    if (interaction.commandName === 'ping') {
        interaction.reply({content: `🏓 | Ping beträgt **${client.ws.ping} ms**!`, ephemeral: true});
    }
    if (interaction.commandName === 'kopfoderzahl') {
        const random = Math.floor(Math.random() * 2);
        if (random == 0) {
            interaction.reply({content: 'Die Münze landet auf Kopf'});
        } else {
            interaction.reply({content: 'Die Münze landet auf Zahl'});
        }
    }
    if (interaction.commandName === 'kick') {
        if (interaction.member.permissions.has([PermissionsBitField.Flags.KickMembers])) {
            const user = interaction.options.getUser('user');
            const reason = interaction.options.getString('reason');
            interaction.guild.members.kick(user.id, reason);
            interaction.reply({content: `Der User ${user.username} wurde gekickt!\nGrund: ${reason}`, ephemeral: true});
        } else {
            interaction.reply({content: "Du hast nicht die Berechtigung, um diesen Command auszuführen!", ephemeral: true});
        }
    }
});