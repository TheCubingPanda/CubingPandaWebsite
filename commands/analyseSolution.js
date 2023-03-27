const { SlashCommandBuilder } = require('discord.js');
const solutionAnalyzer = require('solution-analyzer');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('analyse-solution')
        .setDescription('Use solution-analyser to analyse your 3x3 solution!')

        .addStringOption(option =>
            option.setName('scramble')
                .setDescription('scramble'))

        .addStringOption(option =>
            option.setName('solution')
                .setDescription('solution'))

        .addStringOption(option =>
            option.setName('method')
                .setDescription('method')
                .addChoices(
                    { name: 'CFOP', value: 'cfop' }
                )),

    async execute(interaction) {
        try {
            let scramble = await interaction.options.getString('scramble');
            let solution = await interaction.options.getString('solution');
            let method = await interaction.options.getString('method');
    
            // I believe CFOP is the only possibly parameter for method?
            let analysis = await solutionAnalyzer.analyzeSolution(scramble, solution, 'CFOP');
            console.log(analysis);
    
            let steps = "";
            await analysis.steps.forEach(step => {
                steps = steps + "\n_ _ " + step.label + ": " + step.moves;
            });
            console.log(steps);
    
            await interaction.reply({
                content: "Solved? \`" + analysis.solved + "\`\nSteps:\n" + steps
            });
        } catch(e) {
            await interaction.reply("Whoops! There was an error :(");
        }
    }
};