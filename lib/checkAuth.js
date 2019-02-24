const { default: magister, getSchools } = require('magister.js');
const Discord = require('discord.js');
var getAuthCode = require('./authCode')

module.exports = async function(msg, data){
    getAuthCode()
        .then((code => {
            magister({
                school: data.school,
                username: data.username,
                password: data.password,
                authCode: code
            })
            .then((m) => {
                msg.author.send(`Als je ${m.profileInfo.firstName} ${m.profileInfo.lastName} heet, kloppen je gegevens, en je kunt vanaf nu gebruik gaan maken van commands zoals \`!cijfers\``)
            }, (err) => {
                msg.author.send(err)
                console.dir(err)
            });
        }))
}