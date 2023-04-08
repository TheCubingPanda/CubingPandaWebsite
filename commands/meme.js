const { SlashCommandBuilder } = require('discord.js');
const Reddit = require('simple-reddit-api');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Get a cubing meme!'),

    async execute(interaction) {
        try {
            // Fetch a random post from CubingMemes
            Reddit.randomPost({ subreddit: 'cubingmemes', count: 1, is_meme: false, fulldata: false }).then(res => {
                console.log(res);
            
                console.log(`Title: ${res.posts[0].data.title}`);
                console.log(`URL: ${res.posts[0].data.url}`);
    
                interaction.reply({ content: ":rofl: " + res.posts[0].data.title + res.posts[0].data.url });
            });

          } catch (error) {
            console.error('Error fetching random image post:', error);
          }
    },
};