const { SlashCommandBuilder } = require("@discordjs/builders")
const command = new SlashCommandBuilder()
    .setName("owo")
    .setDescription("OwO")
    .addStringOption(option =>
        option
            .setName("text")
            .setDescription("The text to change")
            .setRequired(true))

module.exports = {
    data: command,
    execute: async (client, interaction) => {
        const text = interaction.options.getString("text")
        const modifiedText = text
            .replaceAll("l", "w")
            .replaceAll("r", "w")
            .replaceAll("L", "W")
            .replaceAll("R", "W")
            .replaceAll("?", " UwU?")
            .replaceAll("!", " OwO!")
        await interaction.reply(`*${modifiedText}*`)
    }
}