const csf = require("../discordConsts/channelSnowflakes");
const emojis = require("../discordConsts/emojis");
const roles = require("../discordConsts/roles");
module.exports = server => {
    server.channels
        .resolve(csf.RULES_CHAN).messages
        .fetch(csf.RULES_MSG).then(message => {
            const filter = (reaction, user) =>  reaction.emoji.identifier === emojis.REACTION_KEY;
            const collector = message.createReactionCollector(filter);

            collector.on('collect',  (reaction, user) => {
                console.log(`Picked up reaction to the rules message. It was ${reaction.emoji.name} from ${user.username}`)
                server.members.fetch(user.id).then((guildMember) => {
                    console.log(guildMember.displayName);
                    guildMember.roles.add(roles.NEWTYPE);
                    reaction.users.remove(user.id);
                    console.log(`Added the Newtype Role to ${guildMember.displayName}`);
                });
            });
    });
}