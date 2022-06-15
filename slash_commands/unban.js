const { SlashCommandBuilder } = require("@discordjs/builders")
const command = new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Allows people to unban users")
    .addStringOption(option =>
        option
            .setName("user")
            .setDescription("The user to be unbanned")
            .setRequired(true))

module.exports = {
    data: command,
    execute: async (client, interaction) => {
        const user = interaction.options.getString("user")
      
    }
}