const { SlashCommandBuilder } = require('discord.js');
const vars = require('../vars.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('topic')
		.setDescription('Generates a cubing related topic for conversation!'),
		
	async execute(interaction) {
		await interaction.reply(vars.topics[Math.floor(Math.random() * vars.topics.length)]);
	},
};