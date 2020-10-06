const FuzzySearch = require('fuzzy-search');
const suitLibrary = require('../exvsConsts/suitLookupData');
const Discord = require("discord.js");

const searcher = new FuzzySearch(suitLibrary, ['shortName', 'secondaryName', 'fullName'], {
    caseSensitive: false,
    sort: true
})

function replaceWhitespace(str) {
    return str.replace(/\s/g, "+");
}

module.exports = (message, action) => {
    const lookupString = action.args.join(" ");
    const result = searcher.search(lookupString)[0];
    if (lookupString.toLowerCase() === 'fag') {
        message.channel.send("I know that's the abbreviation but could you use 'tb' for Thunderbolt next time?");
    }
    if (result) {
        const embed = new Discord.MessageEmbed()
            .setURL(result.jpWikiLink)
            .setThumbnail(`http://lmaonice.com/gundam/thumbnails/${result.shortName}.png`)
            .setTitle(result.fullName);
        
        if (result.specialVideoLink) {
            embed.setDescription(`Japanese Wiki: ${result.jpWikiLink}\nGGEZ: ${result.ggezLink}\n` + 
            `Dustloop: ${result.dustloopLink}\nYT Playlist: ${result.specialVideoLink}\n` +
            `YT Search: https://www.youtube.com/results?search_query=MBON+${replaceWhitespace(result.jpName)}&sp=CAI%253D`);
        } else {
            embed.setDescription(`Japanese Wiki: ${result.jpWikiLink}\nGGEZ: ${result.ggezLink}\n` + 
            `Dustloop: ${result.dustloopLink}\nYT Search: https://www.youtube.com/results?search_query=MBON+${replaceWhitespace(result.jpName)}&sp=CAI%253D`);
        }

        message.channel.send(embed);
    } else {
        message.channel.send("Sorry, didn't find anything");
    }
}