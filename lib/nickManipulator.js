module.exports = (message, action) => {
    const userName = message.member.user.username;
    const psnId = action.args[0];
    if (psnId) {
        let newNick = `${userName} (psn: ${psnId})`;
        if (newNick.length > 32) {
            newNick = `psn: ${psnId}`
        } 
        try {
            message.member.setNickname(newNick);
        } catch (error) {
            message.channel.send("I can't... change your nick for some reason?");
        }
    }
};