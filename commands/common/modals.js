const { Client, Interaction, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ComponentType, ActionRowBuilder } = require('discord.js');
const fs = require('fs-extra');
const axios = require('axios');
const datajson = require('../../data.json');
const env = process.env;
const headers = {
    Authorization: env.VALOKEY,
};

async function getRank(val){
    try {
        const response = await axios(`https://api.henrikdev.xyz/valorant/v1/mmr/eu/${val[0]}/${val[1]}`, { 
            headers: {
                "Authorization": env.VALOKEY,
            }
        });
        const rank = response.data.data.currenttierpatched.split(" ")[0];
        return rank;  // Correctly returning the rank here
    } catch (error) {
        console.error('Error fetching rank:', error);
        return null;
    }
}

module.exports = {
    name: 'modals',
    category: 'utils',
    permissions: ['SEND_MESSAGES', 'USE_APPLICATION_COMMANDS'],
    ownerOnly: false,
    usage: 'modals <ID Discord>',
    examples: ['modals @Shidozz'],
    description: 'La commande modals',
    /**
     * 
     * @param { Client } client 
     * @param { Interaction } interaction 
     */
    async runInteraction(client, interaction) {
        const modal = new ModalBuilder({
            customId: `valorank_con_${interaction.user.id}`,
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

        const filter = (interaction) => interaction.customId === `valorank_con_${interaction.user.id}`;
       
        interaction.awaitModalSubmit({filter, time: 10000}).then(async (modalInteraction) => {
            const pseudoValue = modalInteraction.fields.getTextInputValue('pseudo');
            const json = {
                idDiscord: modalInteraction.user.id,
                idValorant: pseudoValue,
            }
            fs.createFileSync(`./Valoid/${modalInteraction.user.tag}.json`);
            const member = modalInteraction.member;
            const rankRoles = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'];
            const rolesToRemove = member.roles.cache.filter(role => rankRoles.includes(role.name));
            try {
                await member.roles.remove(rolesToRemove);
            } catch (error) {
                channel.send('Erreur lors de l\'attribution du rôle.');
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
                await interaction.reply({embeds: [embed], ephemeral: true});
            })
            .catch(err => {
                console.error('Error writing data to JSON file:', err);
            });
    
            const val = pseudoValue.split("#");
            const rank = await getRank(val);
            // Attribuer le nouveau rôle
            const role = modalInteraction.guild.roles.cache.find(role => role.name === rank);
            if (role) {
                await member.roles.add(role);
            }
        });
        
    }
};