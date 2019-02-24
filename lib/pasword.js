var fs = require('fs');

module.exports = async function(msg){
    fs.readFile(`db/${msg.author.id}.json`, 'utf8', function(err, data) {
        // if(err) return `Helaas is <@!${msg.author.id}> niet te vinden in onze database. Vraag of <@!${msg.author.id}> zich kan aanmelden met \`!login\`.`
        if(err) msg.author.send(`Helaas is <@!${msg.author.id}> niet te vinden in onze database. Vraag of <@!${msg.author.id}> zich kan aanmelden met \`!login\`.`)   
        data = JSON.parse(data)
        data.password = msg.content.substring(12, msg.content.length)
        fs.writeFile(`db/${msg.author.id}.json`, JSON.stringify(data), function (err) {
            if (err) return err;
            msg.author.send(`Wachtwoord opgeslagen! Je gegevens worden nu gecontroleerd, en je krijgt straks een berichtje met alle opties!`)
            // return `Wachtwoord opgeslagen! Je gegevens worden nu gecontroleerd, en je krijgt straks een berichtje met alle opties!`;
        });
    })
}