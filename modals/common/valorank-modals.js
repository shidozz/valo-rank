const { Client, Interaction, ModalBuilder, TextInputBuilder, TextInputStyle, ComponentType, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs-extra');
const axios = require('axios');
const datajson = require('../../data.json');
const { getData } = require("../../wrapper/wrapper");

module.exports = {
    id: 'valorank-modals',
    category: 'utils',
    /**
     * 
     * @param { Client } client 
     * @param { Interaction } interaction 
     */
    async runInteraction(client, modalInteraction) {
        const pseudoValue = modalInteraction.fields.getTextInputValue('pseudo');
            
        fs.createFileSync(`./Valoid/${modalInteraction.user.tag}.json`);
        const member = modalInteraction.member;
        const val = pseudoValue.split("#");
        let data = await getData(val);
        const json = {
            idDiscord: modalInteraction.user.id,
            idValorant: pseudoValue,
            data: data,
        }
        
        // Writing JSON data to the file
        fs.writeJson(`./Valoid/${modalInteraction.user.tag}.json`, json)
        .then(async () => {
            const embed = new EmbedBuilder()
            .setColor("Green")
            .setAuthor({name: datajson.bot.name, iconURL: datajson.bot.logo, url: datajson.bot.discord_serv})
            .setThumbnail(datajson.bot.thumbnails.default)
            .setTimestamp()
            .setDescription(`Vous êtes connecter en temps que ${json.idValorant} !`);
            await modalInteraction.reply({embeds: [embed], ephemeral: true});
        })
        .catch(err => {
            console.error('Error writing data to JSON file:', err);
        });
    }

}