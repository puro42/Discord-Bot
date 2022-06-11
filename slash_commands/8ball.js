const { SlashCommandBuilder } = require("@discordjs/builders")
const command = new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Ask the magic 8ball a question")
    .addStringOption(option =>
        option
            .setName("question")
            .setDescription("Ask a question")
            .setRequired(true))

module.exports = {
    data: command,
    execute: async (client, interaction) => {
        const question = interaction.options.getString("question")

        function getRandomInt(min, max) {
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min)) + min
        }

        let x = getRandomInt(0, 20)
        // Bruh Momenta
        if (x < 5) {
            if (x < 3) {
                return interaction.reply(`🎱 **Question**: ${question}\n**Answer**: Yes!`)
            } else {
                return interaction.reply(`🎱 **Question**: ${question}\n**Answer**: Maybe...`)
            }
        } else if (x <= 9) {
            if (x >= 7) {
                return interaction.reply(`🎱 **Question**: ${question}\n**Answer**: No!`)
            } else {
                return interaction.reply(`🎱 **Question**: ${question}\n**Answer**: Without a doubt!`)
            }
        } else if (x <= 12) {
            return interaction.reply(`🎱 **Question**: ${question}\n**Answer**: I honestly have no idea...`)
        } else {
            return interaction.reply(`🎱 **Question**: ${question}\n**Answer**: Very unlikely...`)
        }
    }
}