const Discord = require("discord.js");

let server, deletionChannel;

function primeTheSnitch(oServer, deleteChannelId) {
    server = oServer;
    deletionChannel = server.channels.resolve(deleteChannelId);
}

function handleDeletion(message) {
    server.members.fetch(message.author.id).then(member => {
        let delMsg = `**Message sent by ${member} in ${message.channel}**\n${message.content}`;
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(delMsg)
            .setFooter(`Author: ${message.author.id} \nMessage ID ${message.id} \nCreated At ${message.createdAt.toUTCString()}`);
    
            deletionChannel.send(embed);
    });
};

function handleEdit(oldMessage, newMessage) {
    server.members.fetch(newMessage.author.id).then(member => {
        let editMsg = `**Message edited in ${newMessage.channel}**\n${newMessage.url}\n\n**Before**\n${oldMessage.content}\n\n**After**\n${newMessage.content}`;
        const embed = new Discord.MessageEmbed()
            .setAuthor(newMessage.author.tag, newMessage.author.displayAvatarURL())
            .setDescription(editMsg)
            .setFooter(`Author: ${newMessage.author.id} \nEdited At ${newMessage.editedAt}`);
    
            deletionChannel.send(embed);
    });
};

function handleError(err) {
    return deletionChannel.send(`Error: ${err.name} @ ${err.fileName}(${err.lineNumber})\n${err.message}`);
}

module.exports = { primeTheSnitch, handleDeletion, handleEdit, handleError };