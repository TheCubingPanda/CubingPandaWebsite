const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dm')
        .setDescription('[ Private Command ]')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('user')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('message')
                .setRequired(true)),

    async execute(interaction, bot) {
        let message = interaction.options.getString('message');
        let user = interaction.options.getUser('user');

        if (interaction.guild.id == "944820398518837258") {
            if (interaction.member.roles.cache.has("967718875359756349")) {
                await interaction.reply({
                    content: `Messaging now`,
                    ephemeral: true
                });

                await user.send(message);

                await interaction.followUp({
                    content: `Hopefully that worked, I sent the message ${interaction.user.id} sent a msg to ${user.id}`,
                    ephemeral: false
                }) 

            } else {
                return await interaction.reply({
                    content: `Sorry, it seems you need the <@&967718875359756349> role to run this command. If this is a mistake, message Jamie.`,
                    ephemeral: true
                });
            }
        } else {
            return await interaction.reply({
                content: `Sorry, this command isn't for you. This is a private testing commmand that I can't be bothered setting to guild-only.`,
                ephemeral: true
            })
        }
    },
};