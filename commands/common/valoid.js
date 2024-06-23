const { Client, Interaction, EmbedBuilder } = require('discord.js');
const fs = require('fs-extra');
const axios = require('axios');
const datajson = require('../../data.json');
const { getRank } = require('../../wrapper/wrapper.js');

module.exports = {
    name: 'valoid',
    category: 'utils',
    permissions: ['SEND_MESSAGES', 'USE_APPLICATION_COMMANDS'],
    ownerOnly: false,
    usage: 'valoid <ID-Valorant>',
    examples: ['valoid EatMyTrigger#EMT'],
    description: 'La commande valoid (Ex: valoid EatMyTrigger#EMT)',
    options: [
        {
            type: 3,
            name: 'valoid',
            description: "Valorant ID (Ex: EatMyTrigger#EMT)",
            require: true,
        },

    ],
    /**
     * 
     * @param { Client } client 
     * @param { Interaction } interaction 
     */
    async runInteraction(client, interaction) {
        const json = {
            idDiscord: interaction.user.id,
            idValorant: interaction.options.getString('valoid'),
        }
        fs.createFileSync(`./Valoid/${interaction.user.tag}.json`);
        const member = interaction.member;
        
        // Writing JSON data to the file
        fs.writeJson(`./Valoid/${interaction.user.tag}.json`, json)
        .then(async () => {
            const embed = new EmbedBuilder()
            .setColor("Green")
            .setAuthor({name: datajson.bot.name, iconURL: datajson.bot.logo, url: datajson.bot.discord_serv})
            .setThumbnail(datajson.bot.thumbnails.default)
            .setTimestamp()
            .setDescription(`Vous êtes connecter en temps que ${json.idValorant} !`);
            await interaction.reply({embeds: [embed], ephemeral: true});
        })
        .catch(err => {
            console.error('Error writing data to JSON file:', err);
        });
    }
};
