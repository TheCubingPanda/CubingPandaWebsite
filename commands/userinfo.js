const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Lookup a user in this server!')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('user')
        ),

    async execute(interaction, bot) {
        let user = await interaction.options.getUser('user');
        let member = interaction.guild.members.cache.get(user.id);

        const username = user.username;
        const createdAt = Math.ceil(user.createdTimestamp / 1000);
        const joinedAt = Math.ceil(member.joinedTimestamp / 1000);
        const banner = await user.bannerURL({ size: 1024 });
        const avatar = await user.displayAvatarURL();

        let send = `\
        ${username}
        Account created <t:${createdAt}:R>
        Joined <t:${joinedAt}:R>
        \`${user.id}\``

        await bot.sendEmbedMessage({
            interaction: interaction,
            title: undefined,
            description: send,
            image: avatar?.toString(),
            ephemeral: false
        });
    },
}