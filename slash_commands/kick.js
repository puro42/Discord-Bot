const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick an user from the guild')
    .addUserOption((option) => option.setName('member')
      .setDescription('Who are you kicking?')),
  async execute(interaction) {

    await interaction.deferReply();

    // Notice we are fetching the member? We have to get the member so we can kick it, an user is just an user 😅
    const member = interaction.options.getMember('member');

    // If the person who ran the command doesn't have permissions, it will deny
    if (!interaction.member.permissions.has('KICK_MEMBERS')) {
      return interaction.editReply({ content: 'You do not have permissions to use this commands!' });
    }

    // We kick them
    member.kick().catch(err => {
      interaction.editReply({ content: `Oops, I ran into an error\n${err}`})
    })

    await interaction.editReply({ content: `${member} has succesfully been kicked!` });
  },
};