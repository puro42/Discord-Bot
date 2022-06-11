const { SlashCommandBuilder } = require("@discordjs/builders")
const command = new SlashCommandBuilder()
    .setName("randomnumber")
    .setDescription("Gives you a random number")

module.exports = {
    data: command,
    execute: async (client, interaction) => {
        await interaction.reply(`Your number is: ${Math.floor((Math.random() * 100) + 1)}`)
    }
}