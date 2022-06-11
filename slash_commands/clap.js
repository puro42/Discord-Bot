const { SlashCommandBuilder } = require("@discordjs/builders")
const command = new SlashCommandBuilder()
    .setName("clap")
    .setDescription("Displays a gif of people clapping")

module.exports = {
    data: command,
    execute: async (client, interaction) => {
        await interaction.reply("https://tenor.com/view/wolf-gif-24607072")
    }
}