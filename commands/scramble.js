const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Scrambow = require('scrambow').Scrambow;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('scramble')
        .setDescription('Generate a cube scramble!')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('type')
                .setRequired(true)
                .addChoices(
                    { name: '2x2', value: '222' },
                    { name: '3x3', value: '333' },
                    { name: '4x4', value: '444' },
                    { name: '5x5', value: '555' },
                    { name: '6x6', value: '666' },
                    { name: '7x7', value: '777' },
                    { name: 'Megaminx', value: 'megaminx' },
                    { name: 'Pyraminx', value: 'pyraminx' },
                    { name: 'Skewb', value: 'skewb' },
                    { name: 'Square-1', value: 'square 1' }
                )),

    async execute(interaction) {
        let type = await interaction.options.getString('type');

        var scrambles = new Scrambow().setType(type).get(1);
        let image = " "

        if (parseInt(type)) {
            // number
            image = `http://cube.rider.biz/visualcube.php?fmt=png&size=150&pzl=${type.slice(0, -2)}&alg=x2${scrambles[0].scramble_string.replace(/\s/g, '')}`;
        } else {
            image = null;
        }

        const embed = new EmbedBuilder()
            .setColor("#67e473")
            .setDescription(`➡️ ${scrambles[0].scramble_string}`)
            .setImage(image)
            .setTimestamp()
            .setFooter({ text: `CubingPanda bot - ${type} scramble`, iconURL: 'https://i.imgur.com/muqwVaG.png' });

        await interaction.reply({ embeds: [embed] });
    },
};