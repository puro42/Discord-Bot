const { SlashCommandBuilder } = require("@discordjs/builders")
const command = new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Flip a coin!")

module.exports = {
    data: command,
    execute: async (client, interaction) => {

        const num = Math.random()
        if(num > 0.5) {
            await interaction.reply(":coin: Heads!")
        } else {
            await interaction.reply(":coin: Tails!")
        }
    }
}