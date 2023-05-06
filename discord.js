const { DiscordBot } = require('./classes/DiscordBot');

function startBot() {
    let bot = new DiscordBot();
    bot.start();
}

module.exports = { startBot };