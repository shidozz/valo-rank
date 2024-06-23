const { promisify } = require("util");
const { glob } = require("glob");
const path = require("path");
const pGlob = glob;

module.exports = async client => {
    (await pGlob(path.join(process.cwd(), "buttons", "*", "*.js"))).map(async (btnFile) => {         
        const btn = require(btnFile);
        
        if(!btn.id) return console.log(`Bouton non-déclenché: ajouter un id à votre bouton ↓\nFichier -> ${btnFile}`);


        client.buttons.set(btn.id, btn);
        console.log(`\x1b[92m- \x1b[95m\x1b[1m${btn.id}\x1b[0m\x1b[92m bouton Loaded !\x1b[0m`);
    });
};
