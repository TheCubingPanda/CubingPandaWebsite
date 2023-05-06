const { EmbedBuilder } = require('discord.js');

const promotions = [
    'Promotion 1: ...',
    'Promotion 2: ...',
    'Promotion 3: ...',
    // Add more promotion messages here
];

function getRandomPromotion() {
    return promotions[Math.floor(Math.random() * promotions.length)];
}

async function sendEmbedMessage(interaction, title, description) {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor('#2b2d31');

    try {
        await interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error('Error sending embed message:', error);
    }
}

module.exports = { sendEmbedMessage };