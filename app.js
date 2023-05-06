const fs = require('node:fs');
const path = require('node:path');
const { startBot } = require('./discord');

const Website = require('./classes/Website');
const website = new Website();

// Start Discord bot
startBot();