const { Client, Collection } = require("discord.js");
const client = new Client({intents: 3276799});
const dotenv = require('dotenv'); dotenv.config();
dotenv.config(); // Load environment variables
const env = process.env;
['commands', 'buttons', 'modals'].forEach(x => client[x] = new Collection());
['CommandUtil', 'EventUtil', 'ButtonUtil', 'ModalUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client);});
process.on('exit', code => { console.log(`Le processus s'est arrêté avec le code: ${code}!`) });

process.on('uncaughtException', (err, origin) => { 
    console.error(`UNCAUGHT_EXCEPTION: ${err}`);
    console.error(`Origine: ${origin}`) 
});

process.on('unhandledRejection', (reason, promise) => {
    console.log(`UNHANDLED_REJECTION: ${reason}`); 
    console.log(promise);
});
process.on('Warning', (...args) => console.warn(...args));
client.login(env.TOKEN);