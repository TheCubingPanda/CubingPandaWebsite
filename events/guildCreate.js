const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildCreate,
    async execute(guild, bot) {
        // Find a channel where the bot has permissions to send messages
        const channel = await guild.channels.cache.find(channel => channel.type === 'text');

        try {
            await channel.send('Hi there! I was just added to this server, thanks for having me! Type `/` and click on my icon to see my features!');
            await bot.logToDiscord(`Waz just added to ${guild.name} (${guild.id}).`);
        } catch (e) {
            await bot.logToDiscord(`I couldn't find a channel to send a welcome message in the guild ${guild.name} (${guild.id}).`);
        }
    },
};