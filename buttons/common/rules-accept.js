const { Client, Interaction, ModalBuilder, TextInputBuilder, TextInputStyle, ComponentType, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs-extra');
const axios = require('axios');
const datajson = require('../../data.json');
const { getData } = require("../../wrapper/wrapper");

module.exports = {
    id: 'rules-accept',
    category: 'utils',
    /**
     * 
     * @param { Client } client 
     * @param { Interaction } interaction 
     */
    async runInteraction(client, interaction) {
        const modal = new ModalBuilder({
            customId: `valorank-modals`,
            title: "Valorant Rank Connexion",
        });
    
        const pseudo = new TextInputBuilder({
            customId: `pseudo`,
            label: `Id Valorant:`,
            style: TextInputStyle.Short,
            placeholder: `Pseudo#EUW`,
            maxLength: 21,
            minLength: 5,
            required: true,
            type: ComponentType.TextInput,
        });

        const oneAction = new ActionRowBuilder().addComponents(pseudo);
        modal.addComponents(oneAction);

        await interaction.showModal(modal);
    }
}