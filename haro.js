// Import the modules
const Discord = require("discord.js");

// Import Constants
const csf = require('./discordConsts/channelSnowflakes');
const emojis = require('./discordConsts/emojis');
// Import library code for bot
const startReactionCollector = require("./lib/reactionCollector");
const cmdCreator = require("./lib/commandCreator");
const roleMgmt = require("./lib/roleHandler");
const lookupSuit = require("./lib/suitLookup");
const snitcher = require('./lib/snitcher');
// const nickNamer = require("./lib/nickManipulator");

// Modules variables/Objects
const token = require("./discordConsts/token");
const client = new Discord.Client();
let server, biggs;

client.on("ready", () => {
    console.log("OK GO");
    server = client.guilds.resolve(csf.SERVER);
    // server = client.guilds.resolve(csf.TEST_SERVER);
    snitcher.primeTheSnitch(server, csf.DEL_CHAN)
    startReactionCollector(server);
    client.users.fetch(csf.DM_TO_BIGGS).then((oBiggs) => {
        biggs = oBiggs.dmChannel;
    }).catch((err) => {
        console.log("why");
        console.log(err);
    });
});

client.on("message", message => {
    try {
        if (message.mentions.has(client.user) || (message.cleanContent.charAt(0) === "!" && message.cleanContent.charAt(1) !== "!")) {
            let action = cmdCreator(message);
            console.log(`Was mentioned or received command.\nCMD: ${action.command}\n ARGS ${action.args}`);
        	switch (action.command) {
                case "ROLE":
                    roleMgmt(message, action);
                break;
                case "SUIT":
                    lookupSuit(message, action);
                break;
                /*
                // ECHO is for debugging purposes
                case "ECHO":
                    message.channel.send(action.args.join(" "));
                break;
                */
                default:
                message.channel.send(emojis.THINKING_HARO);
                break;
        	}
        } else {
            // Haro was not directly invoked, but we may want to do soething
            const messageString = message.cleanContent.toUpperCase();
        }
    } catch (err) {
        message.channel.send("Oops! Something broke, gotta go tell biggs, brb!", {
            files: [{
                attachment: "./images/goodnight.gif",
                name: "goodnight.gif"
            }]
        }).then(() => {
            snitcher.handleError(`errror: ${err.name} @ ${err.fileName}(${err.lineNumber})\n${err.message}`).then(() => {
                console.error(err);
                process.exit(1);
            })
        });
    }
});

client.on("messageDelete", message => {
    try {
        snitcher.handleDeletion(message);
    } catch(err) {
        snitcher.handleError(`errror: ${err.name} @ ${err.fileName}(${err.lineNumber})\n${err.message}`).then(() => {
            console.error(err);
            process.exit(1);
        });
    }
});

client.on("messageUpdate", (oldMessage, newMessage) => {
    if (oldMessage.author.id === '467562731734564874' || oldMessage.author.id === '727704225039253534') {
        // For some reason Haro wigs out and thinks he's editting himself
        return;
    }

    if (!newMessage.editedAt) {
        // EditedAt is probably null if discord did something
        return;
    }
    
    try {
        snitcher.handleEdit(oldMessage, newMessage);
    } catch(err) {
        snitcher.handleError(`errror: ${err.name} @ ${err.fileName}(${err.lineNumber})\n${err.message}`).then(() => {
            console.error(err);
            process.exit(1);
        });
    }
});

client.on("error", (e) => {console.error(e);});
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

// Log our bot in
client.login(token);