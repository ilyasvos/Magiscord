module.exports = async function(data){
    getAuthCode()
        .then((code => {
            magister({
                school: data.school,
                username: data.username,
                password: data.password,
                authCode: code
            })
            .then((m) => {
                message.author.send(`Als je ${m.profileInfo.firstName} ${m.profileInfo.lastName} heet, kloppen je gegevens, en je kunt vanaf nu gebruik gaan maken van commands zoals \`!cijfers\``)
            }, (err) => {
                msg.author.send(err)
                console.dir(err)
            });
        }))
}