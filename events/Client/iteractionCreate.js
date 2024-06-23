const { Client, Interaction } = require("discord.js");

const ownerId = "466673362748440579";


module.exports = {
    name: "interactionCreate",
    once: false,
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     * @returns 
     */
    async execute(client, interaction) {
        if(interaction.isModalSubmit()){
            const modal = client.modals.get(interaction.customId);
            if (!modal) return await interaction.reply('Ce modals n\'existe pas!');
            modal.runInteraction(client, interaction);
        }
        if (interaction.isCommand()) {
            const cmd = client.commands.get(interaction.commandName);
            if (!cmd) return interaction.reply(`La commande \`${interaction.commandName}\` n\'existe pas!`);

            if (cmd.ownerOnly) {
                if (ownerId !== interaction.user.id) return interaction.reply({ content: 'La seul personne pouvant taper cette commande est l\'owner du bot', ephemeral: true});
            }

            if (!interaction.member.permissions.has([cmd.permissions])) return interaction.reply({ content: `Vous n\'avez pas la/les permission(s) requise(s) (\`${cmd.permissions.join(', ')}\`) pour taper cette commande!`, ephemeral: true });


            cmd.runInteraction(client, interaction);
        } else if (interaction.isButton()) {
            const btn = client.buttons.get(interaction.customId);
            if (!btn) return interaction.reply('Ce bouton n\'existe pas!');
            btn.runInteraction(client, interaction);
        }
    },
};