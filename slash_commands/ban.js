const { SlashCommandBuilder } = require("@discordjs/builders")
const { Permissions,MessageEmbed  } = require('discord.js');
const command = new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Allows people to ban users")
    .addStringOption(option =>
        option
            .setName("user")
            .setDescription("The user to be banned")
            .setRequired(true))

module.exports = {
    data: command,
    execute: async (client, interaction) => {
      const user = interaction.options.getString("user")
      const embed_unex_error = new MessageEmbed()
      console.log(/^\d+$/.test(user))
      console.log(user.lenght)
      if(!user) return interaction.reply("An unexpected error occured") 
      if(/^\d+$/.test(user) && user.lenght == 18) {
        console.log("here")
        interaction.guild.members.fetch(user)
            .then(user =>{console.log(user)})
      }
    }
}