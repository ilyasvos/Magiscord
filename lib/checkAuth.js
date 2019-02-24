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
                var error;
                if(err.toString() == 'AuthError: Invalid password') { error = `Het lijkt erop dat het wachtwoord dat je hebt gegeven niet overeenkomt met je Magister wachtwoord. Stuur je wachtwoord opnieuw met het command \`!wachtwoord\``}
                if(err.toString() == 'AuthError: Invalid username') { error = `Het lijkt erop dat de gebruikersnaam die je hebt gegeven niet overeenkomt met je Magister gebruikersnaam. Stuur je gebruikersnaam opnieuw met het command \`!naam\``}                
                // msg.author.send(err.toString())
                msg.author.send(error)
                console.dir(err)
            });
        }))
}