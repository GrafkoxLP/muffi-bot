const { SlashCommandBuilder } = require('@discordjs/builders');

const pingCommand = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");

module.exports = pingCommand;