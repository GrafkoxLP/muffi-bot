const { SlashCommandBuilder } = require('@discordjs/builders');

const helloCommand = new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Hello World!");

module.exports = helloCommand;