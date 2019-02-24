var fs = require('fs');

module.exports = async function(msg){
    if(!fs.existsSync(`db/${msg.author.id}.json`)) {
        msg.channel.send(`Vul eerst je school in met het command \`!school\` gevolgd door de eerste letters van je school`)
        return
    }
    fs.readFile(`db/${msg.author.id}.json`, 'utf8', function(err, data) {
        // if(err) return `Helaas is <@!${msg.author.id}> niet te vinden in onze database. Vraag of <@!${msg.author.id}> zich kan aanmelden met \`!login\`.`
        if(err) msg.author.send(`Helaas is <@!${msg.author.id}> niet te vinden in onze database. Vraag of <@!${msg.author.id}> zich kan aanmelden met \`!login\`.`)   
        data = JSON.parse(data)
        data.username = msg.content.substring(6, msg.content.length)
        fs.writeFile(`db/${msg.author.id}.json`, JSON.stringify(data), function (err) {
            if (err) return  msg.author.send(err);
            msg.author.send(`Gebruikersnaam \`${msg.content.substring(5, msg.content.length)}\` opgeslagen! Stuur nu je wachtwoord met het command \`!wachtwoord\`+wachtwoord`)   
            // return `Gebruikersnaam \`${msg.content.substring(5, msg.content.length)}\` opgeslagen! Stuur nu je wachtwoord met het command \`!wachtwoord\`+wachtwoord`
        });
    });
}