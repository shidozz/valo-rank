const { Client, Interaction, EmbedBuilder, TextInputBuilder, TextInputStyle, ComponentType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs-extra');
const axios = require('axios');
const path = require('path');
const datajson = require('../../data.json');

module.exports = {
    name: 'rules',
    category: 'admin',
    permissions: ['SEND_MESSAGES', 'ADMINISTRATOR', 'USE_APPLICATION_COMMANDS'],
    ownerOnly: false,
    usage: 'rules',
    examples: ['rules'],
    description: 'La commande rules',
    /**
     * 
     * @param { Client } client 
     * @param { Interaction } interaction 
     */
    async runInteraction(client, interaction) {
        const btnAccept = new ButtonBuilder()
            .setCustomId("rules-accept")
            .setLabel("Accepter")
            .setStyle(ButtonStyle.Primary);

        const btnDenied = new ButtonBuilder()
            .setCustomId("rules-denied")
            .setLabel("Refuser")
            .setStyle(ButtonStyle.Danger);

        const btn = new ActionRowBuilder().addComponents(btnAccept, btnDenied);
        // Chemin absolu vers le fichier rules.txt
        const filePath = path.resolve(__dirname, 'rules.txt');
        
        // Lire le contenu du fichier rules.txt
        const rules = fs.readFileSync(filePath, 'utf-8');
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setAuthor({name: datajson.bot.name, iconURL: datajson.bot.logo, url: datajson.bot.discord_serv})
        .setThumbnail(datajson.bot.thumbnails.rules)
        .setTimestamp()
        .setDescription(rules);
        await interaction.reply({embeds: [embed], components: [btn], ephemeral: false});
    }
};