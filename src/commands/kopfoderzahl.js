const { SlashCommandBuilder } = require('@discordjs/builders');

const kopfoderzahlCommand = new SlashCommandBuilder()
    .setName("kopfoderzahl")
    .setDescription("Würfelt eine Münze");

module.exports = kopfoderzahlCommand;