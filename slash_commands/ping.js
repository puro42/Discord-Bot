const { SlashCommandBuilder } = require("@discordjs/builders")
const command = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!")

module.exports = {
    data: command,
    execute: async (client, interaction) => {
        let latency = Date.now() - interaction.createdTimestamp 
        await interaction.reply(`:ping_pong: Pong! \`${latency}ms\``)
    }
}