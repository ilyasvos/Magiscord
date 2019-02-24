const { default: magister, getSchools } = require('magister.js');
var fs = require('fs');
const Discord = require('discord.js');

var getAuthCode = require('./authCode')

module.exports = async function(msg) {
    console.dir(msg.content)
    var id = msg.author.id;
    if(msg.content.indexOf('<@!') > 0) {
        var index = msg.content.indexOf('<@!')
        var id = msg.content.substring(index+3, msg.content.length-1)
    }
    if(!fs.existsSync(`db/${id}.json`)) {
        console.dir(`User ${id} not found in db`)
        msg.channel.send(`Helaas is <@!${id}> niet te vinden in onze database. Vraag of <@!${id}> zich kan aanmelden met \`!login\`.`)
        return
    }
    console.dir(id)
    fs.readFile(`db/${id}.json`, 'utf8', function(err, data) {
        if(err) msg.channel.send(err)
        var klas = ''
        data = JSON.parse(data)
        msg.channel.send(`Aan het inloggen als ${data.username} bij school ${data.school.name}...`).then((message) => { 
            getAuthCode()
            .then((code => {
                magister({
                    school: data.school,
                    username: data.username,
                    password: data.password,
                    authCode: code
                })
                .then((m) => {
                    // msg.channel.send(`Succesvol ingelogd als: ${m.profileInfo.firstName + ' ' + m.profileInfo.lastName}, nu cijfers binnenhalen...`)
                    message.edit(`Succesvol ingelogd als: ${m.profileInfo.firstName + ' ' + m.profileInfo.lastName}, nu cijfers binnenhalen...`)
                    klas = m.profileInfo.firstName + ' ' + m.profileInfo.lastName
                    m.courses()
                    .then(courses => courses.find(c => c.current).grades())
                    .then(grades => {
                        // klas = klas + courses[courses.length-1].group.description + ' met profiel ' + courses[courses.length-1].curricula
                        const embed = new Discord.RichEmbed().setColor("#0096db").setTitle(`**Cijfers van ${klas}**`);
                        var sorted = {}
                        grades.forEach(grade => {
                            if(sorted[grade.class.id]==null){sorted[grade.class.id]=[]}
                            sorted[grade.class.id].push(grade)
                        })
                        for(var vak in sorted) {
                            for(var j = 0; j < sorted[vak].length-1; j++) {
                                if(sorted[vak][j].type.header == 'Gem. cijfer') {
                                    embed.addField([sorted[vak][j].class.description.charAt(0).toUpperCase() + sorted[vak][j].class.description.slice(1)], sorted[vak][j].grade);
                                }
                            }
                        }
                        message.edit(embed)
                        // msg.channel.send(embed)
                        // return embed;
                    })
                }, (err) => {
                    msg.channel.send(err)
                    console.error('something went wrong:', err);
                });
            }))
        });
    })
}