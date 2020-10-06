module.exports = (message) => {
    let messageArray = message.cleanContent.split(/\s+/),
    command,
    args;

    if (message.cleanContent.charAt(0) === "!") {
        command = messageArray[0] ? messageArray[0].toUpperCase().substring(1) : "";
        args = messageArray.slice(1);
    } else {
        command = messageArray[1] ? messageArray[1].toUpperCase() : "";
        args = messageArray.slice(2);
    }

    return { command, args };
}