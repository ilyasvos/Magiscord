'use strict';

const Discord = require('discord.js');
const client = new Discord.Client();

var schoolFunc = require('./lib/school')
var cijfersFunc = require('./lib/cijfers')
var passwordFunc = require('./lib/pasword')
var usernameFunc = require('./lib/username')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('Magister', {
    type: 'WATCHING'
  })
});

client.on('message', msg => {
  // Command !login
  // Sends an PM with login instructions
  if (msg.content === '!login') {
    msg.reply('er is een persoonlijk bericht gestuurd met de instructies. Check je pm');
    msg.author.send(`**Welkom bij Magiscord!** \nOm in te loggen, stuur eerst je school met het command \`!school\` gevolgd door de naam van je school. \nStuur dan \`!naam\` gevolgd door je gebruikersnaam van Magister. \nStuur als laatste je wachtwoord met het command \`!wachtwoord\` gevold door je Magister wachtwoord.`);
  }

  // Command: !school
  // Searches school and saves it
  if (msg.content.substring(0, 7) === '!school') schoolFunc(msg)

  // Command: !naam
  // Saves username
  if (msg.content.substring(0, 5) === '!naam') usernameFunc(msg)

  // Command: !wachtwoord
  // Saves password
  if (msg.content.substring(0, 11) === '!wachtwoord') passwordFunc(msg)

  // Command: !cijfers
  // Returns average grades from message author of person tagged in the message
  if (msg.content.substring(0, 8) === '!cijfers') cijfersFunc(msg)
});

// Takes secret Discord bot token and logs in with it
client.login("VUL HIER JE DISCORD BOT TOKEN IN. HOUD DEZE GEHEIM!");