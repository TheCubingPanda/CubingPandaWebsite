const { Client, Events, GatewayIntentBits, REST, Routes, Collection, EmbedBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

require('dotenv').config();
const token = process.env.TOKEN;

class DiscordBot {
    constructor() {
        // Set the token and create a new Discord Client instance
        this.token = token;
        this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
        // Initialize a new Collection to store the bot commands
        this.commands = new Collection();
    }

    async start() {
        // Once the client is ready, log the bot's username and execute other necessary functions
        this.client.once(Events.ClientReady, async () => {
            console.log(`Ready! Logged in as ${this.client.user.tag}`);
            await this.startCommands();
            await this.listenCommands();
        });
        // Log in to Discord
        this.login();
    }

    async startCommands() {
        // Register commands by iterating through command files and adding them to the commands Collection
        const commandsPath = './commands';
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require('../commands' + '/' + file);
            // Ensure the command has the required "data" and "execute" properties
            if ('data' in command && 'execute' in command) {
                this.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${'../commands' + '/' + file} is missing a required "data" or "execute" property.`);
            }
        }

        // Generate JSON data for each command to be used in deployment
        const commandsData = commandFiles.map(file => require(`../commands/${file}`).data.toJSON());

        // Construct and prepare an instance of the REST module and deploy the commands
        const rest = new REST({ version: '10' }).setToken(this.token);

        try {
            console.log(`Started refreshing ${commandsData.length} application (/) commands.`);
            const data = await rest.put(
                Routes.applicationCommands(this.client.user.id),
                { body: commandsData },
            );
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    }

    async listenCommands() {
        // Listen for InteractionCreate events to handle incoming command interactions
        this.client.on(Events.InteractionCreate, async interaction => {
            if (!interaction.isChatInputCommand()) return;

            const command = this.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction, this);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        });
    }

    async logToDiscord(text, level = 'info') {
        const levels = {
            'error': '❌',
            'warn': '⚠️',
            'info': 'ℹ️',
            'debug': '🔍',
            'verbose': '📝',
        };
        const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const logChannel = this.client.channels.cache.get('1104211369697480724'); // Replace <channel-id> with the ID of your log channel
        if (logChannel) {
            logChannel.send(`\`\`\`${levels[level]} [${timestamp}] ${text}\`\`\``);
        } else {
            console.error('Log channel not found!');
        }
    }

    async sendEmbedMessage(data) {
        const embed = new EmbedBuilder()
            .setDescription(data.description)
            .setColor('#2b2d31');

        if (typeof data.title === 'string') {
            embed.setTitle(data.title);
        } else if (data.title !== undefined) {
            console.error('Error sending embed message: "title" must be a string primitive.');
            return;
        }

        try {
            await data.interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error sending embed message:', error);
        }
    }

    // Log in to Discord with the provided token
    login() {
        this.client.login(this.token);
    }
}

module.exports = { DiscordBot };
