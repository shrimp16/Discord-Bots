const fs = require('node:fs');
const path = require('node:path');
const { Collection } = require('discord.js');

//ARRAY WITH ALL THE PATHS FOR THE FILES//
const commandsDirectories = [
    path.join(__dirname, 'commands'),
    path.join(__dirname, 'commands/Bank-And-Wallet'),
    path.join(__dirname, 'commands/Casino-Games'),
    path.join(__dirname, 'commands/Daily-Revenue'),
    path.join(__dirname, 'commands/Risky')
];

/**Creates an bi dimensional array with all the files path from each directory and returns it*/
function getFiles() {
    const commandFiles = [];
    for (const directory of commandsDirectories) {
        commandFiles.push(fs.readdirSync(directory).filter(file => file.endsWith('.js')));
    };
    return commandFiles;
}

/**Creates a collection of commands for the bot to use*/
function loadToBot() {

    const commandFiles = getFiles();
    const commandsCollection = new Collection();

    let pointer = 0;

    //This is a more functional way to get the loader to work//
    commandFiles.forEach(commands => {
        commands.forEach(command => {
            const filePath = path.join(commandsDirectories[pointer], command);
            const commandCode = require(filePath);
            commandsCollection.set(commandCode.data.name, commandCode);
        });
        pointer++;
    })

    return commandsCollection;
    
}

/**Creates and array with all the file's data as JSON to then deploy the commands*/
function loadToDeploy() {

    const commandFiles = getFiles();
    const commands = [];

    //This is the first try to get the loader to work//
    for (let i = 0; i < commandFiles.length; i++) {
        for (let b = 0; b < commandFiles[i].length; b++) {
            const filePath = path.join(commandsDirectories[i], commandFiles[i][b]);
            const command = require(filePath);
            commands.push(command.data.toJSON());
        }
    }

    return commands;

}

module.exports = {
    loadToBot: loadToBot,
    loadToDeploy: loadToDeploy
}