const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Get info on CubingPanda bot!'),

    async execute(interaction) {
        await interaction.reply({
            content: `Guild count: ${interaction.client.guilds.cache.size.toString()}\n Total member count: ${interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} \nLatency is ${Date.now() - interaction.createdTimestamp}ms & API Latency is ${Math.round(interaction.client.ws.ping)}ms`
        })
    },
};