/* 

    
    {
        lobbies: [
            {
                lobbyTitle: '',
                lobbyOwner: '',
                lobbyMsg: '',
                players: []
            }
        ]
        lobbyPlayers: [
            {
                name: '',
                psnID: '',
                snowflake: '',
                msg: ''
            }
        ]
    }
*/


const lobbies = new Map();
const players = new Map();

function makeNewLobby(guildMember, psnId, message) {
    return {
        lobbyTitle: message,
        lobbyOwner: guildMember.id,
        players: []
    }
}

function makeActivePlayer(guildMember, psnId) {
    return {
        name: guildMember.displayName,
        psnId: psnId,
        snowflake: guildMember.id
    }
}

function getPlayersInLobby(lobbyId) {
    let lobby = lobbies.get(lobbyId),
        playerIds = lobby.players;

    let playerList = '';
    playerIds.forEach(element => {
        let playerObj = players.get(element);
        playerList = playerList + `${emoji.DISCORD} ${playerObj.name} ${emoji.PSN} ${playerObj.psnId}\n`;
    });

    return playerList.substring(0, playerList.length-1);
}

module.exports = (action, message) => {
    let lobbyId;
    if (!action.args.length) {
        // Are there lobbies? 
        if (lobbies.size) { // Yes
            // Are you in a lobby?
            if (players.has(message.guildMember.id)) { // Yes
                // Make a list of players in that lobby
                lobbies.get(players.get(message.guildMember.id).lobbyId);
            } else { // No
                // Make a list of lobbies and owners
            }
        } else { // No
            // Ask them to make a new lobby
        }
    } 
    
    // If we're here, we need full args
    
    if (!action.args[1] || action.args[1].length === 0) {
        // Need a PSN ID when joining or making
        return;
    }

   if (action.args[0].toUpperCase() === "NEW") {
        // Making a new lobby


        // Make a new player
        // Make a new lobby
        // Put player in that lobby
        // Let them know its good
        return;
    }
    
    if (action.args[0].toUpperCase() === "JOIN") {
        if (!action.args[2] || action.args[2].length === 0) {
            // Need a PSN ID when joining or making
            return;
        }
    }
};