const { SlashCommandBuilder } = require('@discordjs/builders');

const kickCommand = new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicke einen User vom Server")
    .addUserOption(option => option.setName("user").setDescription("Der User, der gekickt werden soll").setRequired(true))
    .addStringOption(option => option.setName("reason").setDescription("Der Grund, warum der User gekickt werden soll").setRequired(true));

module.exports = kickCommand;