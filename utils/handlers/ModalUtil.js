const { promisify } = require("util");
const { glob } = require("glob");
const path = require("path");
const pGlob = glob;

module.exports = async client => {
    (await pGlob(path.join(process.cwd(), "modals", "*", "*.js"))).map(async (modalsFile) => {         
        const modals = require(modalsFile);
        
        if(!modals.id) return console.log(`Bouton non-déclenché: ajouter un id à votre bouton ↓\nFichier -> ${modalsFile}`);


        client.modals.set(modals.id, modals);
        console.log(`\x1b[92m- \x1b[93m\x1b[1m${modals.id}\x1b[0m\x1b[92m Modals Loaded !\x1b[0m`);
    });
};
