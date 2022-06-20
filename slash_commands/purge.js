const { SlashCommandBuilder } = require("@discordjs/builders")
const command = new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Removes a desired amount of messages from a channel!")

module.exports = {
    data: command,
    execute: async (client, interaction) => {
              const user = interaction.options.getString("user")
      const embed_unex_error = new MessageEmbed()
                                        .setTitle("There has been an error")
                                        .setDescription(`Warning there has been an unexpected error while executing the command`)
                                        .setColor('#b03350')
                                        .setTimestamp()
      const embed_permission_error = new MessageEmbed()
                                        .setTitle("You dont have permissions to execute that command")
                                        .setDescription(`Please check your role permissions`)
                                        .setColor('#b03350')
                                        .setTimestamp()
        if(!interaction.guild) return interaction.reply({ embeds: [embed_unex_error] })
        const member = await interaction.guild.members.fetch(interaction.user.id)
        if(!member.permissions.has([Permissions.FLAGS.MANAGE_MESSAGES])) return interaction.reply({ embeds: [embed_permission_error] })

      const embed_success = new MessageEmbed()
                                        .setTitle("Success!")
                                        .setDescription(`${user} has successfully been unbanned`)
                                        .setColor('#82db5c')
                                        .setTimestamp()
        await interaction.channel
          .then(interaction.reply({ embeds: [embed_success] }))
          .catch(() => interaction.reply({ embeds: [embed_unex_error] }))
    }
    }
