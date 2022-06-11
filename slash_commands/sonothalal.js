const { SlashCommandBuilder } = require("@discordjs/builders")
const command = new SlashCommandBuilder()
    .setName("sonothalal")
    .setDescription("Displays a gif")

module.exports = {
    data: command,
    execute: async (client, interaction) => {
        await interaction.reply("https://tenor.com/view/halal-halal-mode-so-not-halal-mode-gif-25086879")
    }
}