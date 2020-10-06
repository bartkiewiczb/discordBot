const roles = require("../discordConsts/roles");
const csf = require("../discordConsts/channelSnowflakes");

function toggleRole(guildMember, role) {
    const roleName = guildMember.guild.roles.resolve(role).name;
    if (guildMember.roles.cache.has(role)) {
        guildMember.roles.remove(role);
        return `Removed the ${roleName} from ${guildMember.displayName}.`
    } else {
        guildMember.roles.add(role);
        return `Gave ${guildMember.displayName} the ${roleName} role.`
    }
}

module.exports = (message, action) => {
    if (message.channel.id !== csf.ROLES_CHAN) {
        return;
    }

    const requestedRole = action.args[0].toUpperCase();
    let intendedRole;
    switch(requestedRole) {
        case "SHE":
        case "HER":
        case "SHE/HER":
            intendedRole = roles.SHE;
        break;
        case "HE":
        case "HIM":
        case "HE/HIM":
            intendedRole = roles.HE;
        break;
        case "THEY":
        case "THEM":
        case "THEY/THEM":
            intendedRole = roles.THEY;
        break;
        case "ZE":
        case "HIR":
        case "ZE/HIR":
            intendedRole = roles.ZI;
        break;
        case "ANY":
        case "ANY PRONOUNS":
            intendedRole = roles.ANY_PRONOUNS;
        break;
        case "FEEDBACK":
            intendedRole = roles.FEEDBACK_ON;
        break;
        case "NA":
            switch(action.args[1].toUpperCase()) {
                case "WEST":
                    intendedRole = roles.NA_WEST;
                break;
                case "CENTRAL":
                    intendedRole = roles.NA_CENTRAL;
                break;
                case "EAST":
                    intendedRole = roles.NA_EAST;
                break;
                default:
                    indentedRole = null;
                break;
            }
        break;
        case "EU":
            intendedRole = roles.EU;
        break;
        case "SEA":
            intendedRole = roles.SEA;
        break;
        case "BEGINNER":
            intendedRole = roles.BEGINNER;
        break;
        case "LFG":
        case "LOOKING":
            intendedRole = roles.LFG;
        break;
        default:
            indentedRole = null;
        break;
    }
    if (intendedRole) {
        message.channel.send(toggleRole(message.member, intendedRole));
    } else {
        message.channel.send(`Sorry, couldn't match "${action.args[0]}" to a role.`);

    }
};