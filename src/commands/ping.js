const { SlashCommandBuilder } = require('@discordjs/builders');

const pingCommand = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Zeigt dir den aktuellen Ping an");

module.exports = pingCommand;