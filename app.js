const { Website } = require('./classes/Website');
const { DiscordBot } = require('./classes/DiscordBot');

const website = new Website();

let bot = new DiscordBot();
bot.start()