const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Get info about the server!'),

    async execute(interaction) {
        let guild = await interaction.guild;

        var description = guild.description
        if (!description) {
            description = "";
        }

        const createdAt = Math.ceil(guild.createdTimestamp / 1000);
        const membercount = await guild.members.cache.size;
        const bans = await guild.bans.cache.size;
        const emojis = await guild.emojis.cache.size;
        const roles = await guild.roles.cache.size;
        const channels = await guild.channels.channelCountWithoutThreads.toString();
        const banner = await guild.bannerURL({ size: 1024 });
        const avatar = await guild.iconURL({ size: 1024 });

        console.log(banner, avatar);

        let send = `\
        ${description}
        Guild created <t:${createdAt}:R> (<t:${createdAt}:D>)
        ${membercount} members
        ${bans} bans
        ${emojis} emojis
        ${roles} roles
        ${channels} channels
        `

        await interaction.reply(send, banner?.toString(), avatar?.toString());
    },
};