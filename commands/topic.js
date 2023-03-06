const { SlashCommandBuilder } = require('discord.js');
const topic = require('../topics.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('topic')
		.setDescription('Generates a cubing related topic for conversation!'),
	async execute(interaction) {
		await interaction.reply(topic.topics[Math.floor(Math.random() * topic.topics.length)]);
	},
};