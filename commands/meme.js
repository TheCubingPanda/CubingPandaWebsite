const { SlashCommandBuilder } = require('discord.js');
const Reddit = require('simple-reddit-api');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Get a cubing meme!'),

    async execute(interaction, bot) {
        try {
            // Fetch a random post from CubingMemes
            Reddit.randomPost({ subreddit: 'cubingmemes', count: 1, is_meme: false, fulldata: false }).then(res => {
                console.log(res);
            
                console.log(`Title: ${res.posts[0].data.title}`);
                console.log(`URL: ${res.posts[0].data.url}`);

                return bot.sendEmbedMessage({
                    interaction: interaction,
                    title: undefined,
                    description: res.posts[0].data.title,
                    image: res.posts[0].data.url,
                    ephemeral: false
                });
            });

          } catch (error) {
            console.error('Error fetching random image post:', error);
          }
    },
};