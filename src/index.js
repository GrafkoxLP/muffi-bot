// Load all files and conntect bot
require("dotenv").config()
const fs = require("fs")
const { Client, ActivityType, GatewayIntentBits, Collection, ActionRow, EmbedBuilder } = require("discord.js")
const { InteractionType } = require("discord-api-types/v9")
const welcome_channel = '940232290628419649'
const log_channel = '940232291488268366'
const prefix = '!';
const { default: SpotifyPlugin } = require("@distube/spotify")
const { YtDlpPlugin } = require("@distube/yt-dlp")
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
    GatewayIntentBits.GuildScheduledEvents]})
client.commands = new Collection()
client.login(process.env.DISCORD_BOT_TOKEN)
const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"))
commandFiles.forEach(commandFile => {
    const command = require(`./commands/${commandFile}`)
    client.commands.set(command.data.name, command)
})
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return
    const command = client.commands.get(interaction.commandName)
    if (command) {
        try {
            await command.execute(interaction)
        } catch (error) {
            console.error(error)
            
            if(interaction.deferred || interaction.replied) {
                interaction.editReply({content: "There was an error while executing this command!", ephemeral: true});
                console.log("Fehler beim Ausführen eines Befehls")
            } else {
                interaction.reply({content: "There was an error while executing this command!", ephemeral: true});
                console.log("Fehler beim Ausführen eines Befehls")
            }
        }
    }
})
const statusArray = [
    {
        name: "auf Dead City",
        type: ActivityType.Playing,
        statusbar: "online"
    },
    {
        name: "!help | Dead City",
        type: ActivityType.Playing,
        statusbar: "online"
    }
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
}
client.once("ready", () => {
    console.log("Bot ist online!")
})
setInterval(pickPresence, 30 * 1000);
client.on('guildMemberAdd', (member) => {
    const message = "Hey <@" +member.user+ "> Herzlich willkommen auf **Dead City**! 🎉🤗\nGehe bitte zu <#940232290628419650> und bestätige sie bitte mit ✅.\nDu kannst dir außerdem in <#940232290628419652> eigene Rollen geben."
    const channel = member.guild.channels.cache.get(welcome_channel)
    channel.send(message)
    member.send("Hey <@" +member.user+ ">! Das ganze Team von **Dead City** wünscht dich noch einmal herzlich willkommen auf unserem Server und wir wünschen dir viel Spaß.\nFalls du es noch nicht gesehen hast, um unserem Server zu joinen, gehe bitte zu <#940232290628419650> und bestätige unsere Regeln bitte mit ✅.\nBei Fragen kannst du unter <#940232291018473491> ein Ticket erstellen.")
})



// Message Logger
client.on('messageCreate', (message) => {
    console.log('---------------------');
    console.log('Message: ' + message.content);
    console.log(message.createdAt.toDateString());
    console.log(message.author.tag);
    console.log('---------------------');
})


// Command Handler
client.on("messageCreate", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];
