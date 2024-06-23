const { Client, Interaction, EmbedBuilder } = require('discord.js');
const fs = require('fs-extra');
const axios = require('axios');
const datajson = require('../../data.json');

module.exports = {
    id: 'rules-denied',
    category: 'utils',
    /**
     * 
     * @param { Client } client 
     * @param { Interaction } interaction 
     */
    async runInteraction(client, interaction) {
        await interaction.reply({content: "Vous êtes obligé d'accepter les règles sous peine de kick/ban !", ephemeral: true});
    }
}