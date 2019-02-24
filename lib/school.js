const { default: magister, getSchools } = require('magister.js');
var fs = require('fs');

module.exports = async function(msg) {
    // msg.author.send(`Aan het zoeken naar school: ${msg.content.substring(8, msg.content.length)}`)
    getSchools(msg.content.substring(7, msg.content.length))
    .then((schools => {
        if(schools.length > 1) {
            var schoolstring = ''
            schools.forEach(school => {
                schoolstring = schoolstring + ', ' + school.name
            })
            // return `Meerdere scholen gevonden, namelijk: \`${schoolstring.substring(2, schoolstring.length)}\` Welke bedoelde je?`
            msg.author.send(`Meerdere scholen gevonden, namelijk: \`${schoolstring.substring(2, schoolstring.length)}\` Welke bedoelde je?`)
        } else {
            msg.author.send(`School gevonden en opgeslagen: \`${schools[0].name}\`. Stuur nu je gebruikersnaam met het command \`!naam\`+gebruikersnaam`)
            var json = {
                school: schools[0],
                username: '',
                password: ''
            }
            fs.writeFile(`db/${msg.author.id}.json`, JSON.stringify(json), function(){});
        }
    }))
}