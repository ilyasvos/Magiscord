'use strict';

const Discord = require('discord.js');
const client = new Discord.Client();

var schoolFunc = require('./lib/school')
var cijfersFunc = require('./lib/cijfers')
var passwordFunc = require('./lib/pasword')
var usernameFunc = require('./lib/username')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('Magister', { type: 'WATCHING' })

  // const channel = client.channels.get("463416559990341647");
  // if (!channel) return console.error("The channel does not exist!");
  // channel.join().then(connection => {
  //   console.log("Connected.");
  // }).catch(e => {
  //   console.log('Something went fout: )
  //   console.error(e);
  // });
});

client.on('message', msg => {
    // Command !login
    // Sends an PM with login instructions
    if(msg.content === '!login') {
        msg.reply('er is een persoonlijk bericht gestuurd met de instructies. Check je pm');
        msg.author.send(`**Welkom bij Magiscord!** \nOm in te loggen, stuur eerst je school met het command \`!school\` gevolgd door de naam van je school. \nStuur dan \`!naam\` gevolgd door je gebruikersnaam van Magister. \nStuur als laatste je wachtwoord met het command \`!wachtwoord\` gevold door je Magister wachtwoord.`);
    }

    // Command: !school
    // Searches school and saves it
    if(msg.content.substring(0, 7) === '!school') schoolFunc(msg)

    // Command: !naam
    // Saves username
    if(msg.content.substring(0, 5) === '!naam') usernameFunc(msg)

    // Command: !wachtwoord
    // Saves password
    if(msg.content.substring(0, 11) === '!wachtwoord') passwordFunc(msg)

    // Command: !cijfers
    // Returns average grades from message author of person tagged in the message
    if(msg.content.substring(0, 8) === '!cijfers') cijfersFunc(msg)
});

client.login(require('./secret'));







                        
/////////////////////////////////////////////////////////
//                                                     //
//                                                     //
//    OOOOO  L     DDDD      CCCC  OOOO  DDD   EEEE    //
//    O   O  L     D   D     C     O  O  D  D  E       //
//    O   O  L     D   D     C     O  O  D  D  EEE     //
//    O   O  L     D   D     C     O  O  D  D  E       //
//    OOOOO  LLLLL DDDD      CCCC  OOOO  DDD   EEEE    //
//                                                     //
//                                                     //
/////////////////////////////////////////////////////////



// msg.author.send(`Aan het zoeken naar school: ${msg.content.substring(8, msg.content.length)}`)
// getSchools(msg.content.substring(7, msg.content.length))
// .then((schools => {
//     if(schools.length > 1) {
//         var schoolstring = ''
//         schools.forEach(school => {
//             schoolstring = schoolstring + ', ' + school.name
//         })
//         msg.author.send(`Meerdere scholen gevonden, namelijk: \`${schoolstring.substring(2, schoolstring.length)}\` Welke bedoelde je?`)
//     } else {
//         msg.author.send(`School gevonden en opgeslagen: \`${schools[0].name}\`. Stuur nu je gebruikersnaam met het command \`!naam\`+gebruikersnaam`)
//         var json = {
//             school: schools[0],
//             username: '',
//             password: ''
//         }
//         fs.writeFile(`db/${msg.author.id}.json`, JSON.stringify(json), function(){});
//     }
// }))



// msg.author.send(`Gebruikersnaam \`${msg.content.substring(5, msg.content.length)}\` opgeslagen! Stuur nu je wachtwoord met het command \`!wachtwoord\`+wachtwoord`)
// fs.readFile(`db/${msg.author.id}.json`, 'utf8', function(err, data) {
//     data = JSON.parse(data)
//     data.username = msg.content.substring(6, msg.content.length)
//     fs.writeFile(`db/${msg.author.id}.json`, JSON.stringify(data), function (err) {
//         if (err) msg.author.send(err);
//     });
// });



// fs.readFile(`db/${msg.author.id}.json`, 'utf8', function(err, data) {
//     data = JSON.parse(data)
//     data.password = msg.content.substring(12, msg.content.length)
//     fs.writeFile(`db/${msg.author.id}.json`, JSON.stringify(data), function (err) {
//         if (err) msg.author.send(err);
//     });
// })



//     fs.readFile(`db/${msg.author.id}.json`, 'utf8', function(err, data) {
//         var klas = ''
//         data = JSON.parse(data)
//         msg.channel.send(`Aan het inloggen als ${data.username} bij school ${data.school.name}...`)
//         getAuthCode()
//         .then((code => {
//             magister({
//                 school: data.school,
//                 username: 'sjoerd.bolten',
//                 password: 'Audiobox$123',
//                 authCode: code
//             })
//             .then((m) => {
//                 // console.dir(m.profileInfo)
//                 msg.channel.send(`Succesvol ingelogd als: ${m.profileInfo.firstName + ' ' + m.profileInfo.lastName}, nu cijfers binnenhalen...`)
//                 klas = m.profileInfo.firstName + ' ' + m.profileInfo.lastName
//                 m.courses()
//                 .then(courses => courses.find(c => c.current).grades())
//                 .then(grades => {
//                     // klas = klas + courses[courses.length-1].group.description + ' met profiel ' + courses[courses.length-1].curricula
//                     const embed = new Discord.RichEmbed().setColor("#0096db").setTitle(`**Cijfers van ${klas}**`);
//                     var sorted = {}
//                     grades.forEach(grade => {
//                         if(sorted[grade.class.id]==null){sorted[grade.class.id]=[]}
//                         sorted[grade.class.id].push(grade)
//                     })
//                     for(var vak in sorted) {
//                         for(var j = 0; j < sorted[vak].length-1; j++) {
//                             if(sorted[vak][j].type.header == 'Gem. cijfer') {
//                                 embed.addField([sorted[vak][j].class.description.charAt(0).toUpperCase() + sorted[vak][j].class.description.slice(1)], sorted[vak][j].grade);
//                             }
//                         }
//                     }
//                     msg.channel.send(embed);
//                 })
//             }, (err) => {
//                 console.error('something went wrong:', err);
//             });
//         }))
//     })