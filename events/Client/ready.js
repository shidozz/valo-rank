const {Message, Client, ActivityType} = require('discord.js');
const { getData } = require('../../wrapper/wrapper.js');
const fs = require('fs-extra');
const path = require('path');
const colors = require('colors');

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    async execute(client) {
        client.user.setPresence({ activities: [{ name: 'Valo-Rank', type: ActivityType.Watching, state: "Finish" }], status: 'idle' });
        
        // ID de la guilde de développement
        const devGuildId = '1066343695173038120';
        const devGuild = client.guilds.cache.get(devGuildId);
        devGuild.commands.set(client.commands.map(cmd => cmd));

        //client.application.commands.set(client.commands.map(cmd => cmd));
        
        // Délai de 60 secondes avant de vérifier les membres
        setInterval(async () => {
            if (!devGuild) return;

            await devGuild.members.fetch();

            devGuild.members.cache.forEach(async (member) => {
                if (member.user.bot) return;

                // Chemin au fichier JSON de l'user
                const userFilePath = path.resolve(__dirname, `../../Valoid/${member.user.tag.toLowerCase()}.json`);

                // Vérification de l'existence du fichier JSON
                const fileExists = await fs.pathExists(userFilePath);

                if (!fileExists) {
                    // console.log(`\x1b[91mCompte non lié pour \x1b[92m${member.user.tag}\x1b[91m!`);
                    return;
                } else {
                    // Charger les données du fichier JSON
                    const userData = require(userFilePath);
                    const valorantData = userData.idValorant.split("#");
                    const data = await getData(valorantData);
                    userData.data = data;
                    fs.writeJsonSync(userFilePath, userData);
                    const rank = data.currenttierpatched.split(" ")[0];
                    console.log(`\x1b[93mCompte lié pour \x1b[92m\x1b[1m${member.user.tag}\x1b[0m\x1B[93m avec \x1b[96m\x1b[1m${data.name}\x1b[0m\x1b[36m#\x1b[96m\x1b[1m${data.tag}\x1b[0m\x1b[93m (Rank: \x1b[94m\x1b[1m${rank}\x1b[0m\x1b[93m)!\x1b[97m`);
                    const rankRoles = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'];
                    const rolesToRemove = member.roles.cache.filter(role => rankRoles.includes(role.name));
                    // Attribuer le nouveau rôle
                    const role = devGuild.roles.cache.find(role => role.name === rank);
                    if (role) {
                        await member.roles.add(role);
                    }
                }
            });
        }, 60000);

        console.log(`\x1b[93mConnecter en temps que \x1b[96m\x1b[1m${client.user.tag}\x1b[0m \x1b[93m!`);
    },
};