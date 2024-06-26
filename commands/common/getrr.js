const { Client, Interaction, EmbedBuilder } = require('discord.js');
const fs = require('fs-extra');
const axios = require('axios');
const datajson = require('../../data.json');
const { getData } = require('../../wrapper/wrapper.js');
const path = require('path');

module.exports = {
    name: 'getrr',
    category: 'utils',
    permissions: ['SEND_MESSAGES', 'USE_APPLICATION_COMMANDS'],
    ownerOnly: false,
    usage: 'getRR <ID Discord>',
    examples: ['getRR @Shidozz'],
    description: 'La commande getRR (Ex: getRR @Shidozz)',
    options: [
        {
            type: 6,
            name: 'discid',
            description: "Discord ID (Ex: @Shidozz)",
            require: true,
        },
    ],
    /**
     * 
     * @param { Client } client 
     * @param { Interaction } interaction 
     */
    async runInteraction(client, interaction) {
        let discid = interaction.options.getMember('discid');
        var isItself = false;
        if(discid == null){
            discid = interaction.member;
            isItself = true;
        }
        console.log(discid.user.tag);

        // Chemin au fichier JSON de l'user
        const userFilePath = path.resolve(__dirname, `../../Valoid/${discid.user.tag.toLowerCase()}.json`);

        // Vérification de l'existence du fichier JSON
        const fileExists = await fs.pathExists(userFilePath);
        if(!fileExists){
            await interaction.reply({content: "Aucun compte lier !", ephemeral: true});
            return;
        }

        const te = require(`../../Valoid/${discid.user.tag.toLowerCase()}.json`);

        const value = te.data;

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setAuthor({name: datajson.bot.name, iconURL: datajson.bot.logo, url: datajson.bot.discord_serv})
            .setThumbnail(datajson.bot.thumbnails.default)
            .setTimestamp()
            .setDescription(`${isItself ? "Vous êtes" : `${discid.user.tag} est`} a \`${value.ranking_in_tier}\`rr (avec \`${value.mmr_change_to_last_game}\`rr a la dernière game) !`);
            
        await interaction.reply({embeds: [embed], ephemeral: true});
    }
};
