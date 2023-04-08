const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask the 8ball!')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('Your question for the 8ball')),

    async execute(interaction) {
        const question = await interaction.options.getString('question');
        console.log(question);
        if (!await question) return await interaction.reply("No question asked! Try again");

        await interaction.channel.sendTyping();

        if (question.includes('jamie')) {
            return await interaction.reply("*" + question + "*\n🎱 \`" + "My answer is: Jamie is our god." + "\`");
        }

        if (question.includes('sure') || question.includes("certain")) {
            return await interaction.reply("*" + question + "*\n🎱 \`" + "Yes I am sure, who are you to challenge me?" + "\`");
        }

        let eightball = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            'Don\'t count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.',
            'No way.',
            'Maybe',
            'The answer is hiding inside you',
            'No.',
            '||No||',
            '||Yes||'
        ];
        let index = (Math.floor(Math.random() * Math.floor(eightball.length)));
        setTimeout(() => {
            interaction.reply("*" + question + "*\n🎱 \`" + eightball[index] + "\`");
        }, 750);
    },
};