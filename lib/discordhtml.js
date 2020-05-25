Log("Looking for token...");
var token = document.getElementsByTagName("token")[0].innerHTML;
var PREFIX = document.getElementsByName("prefix")
Log("Found token.");

const client = new Discord.Client();

client.on('message', msg => {
    var OnMessageHandlers = document.getElementsByTagName("onmessage");
    for(var i = 0; i < OnMessageHandlers.length; i++){
        if(msg.author.id != client.user.id)
            HandleOnMessage(OnMessageHandlers[i].children, msg);
    }
    Log("Received message from "+msg.author.username+": " + msg.content);
});

client.on('message', (client, message) => {
    if (message.author.bot) return
    
    if (message.contemt.startsWith(`${PREFIX}`)) {
        commandhandler(client, message)
    }
    
})

client.on('guildMemberAdd', member => {
    var OnGuildMemberAddHandlers = document.getElementsByTagName("onjoin");
    for (var i = 0; i < OnGuildMemberAddHandlers.length; i++) {
        if (member.id != client.user.id)
            HandleJoin(OnGuildMemberAddHandlers[i].children, member.guild, member);
    }
})

client.on('guildMemberRemove', member => {
    var OnGuildMemberRemoveHandlers = document.getElementsByTagName("onleave");
    for (var i = 0; i < OnGuildMemberRemoveHandlers.length; i++) {
        if (member.user.id != client.user.id)
            HandleLeave(OnGuildMemberRemoveHandlers[i].children, member.guild, member);
    }
})

/** 
client.on('error', error => {
    Log(error)
})
*/

client.login(token);

function Log(msg){
    console.log(msg);
    document.title = "DiscordHTML: " + msg;
    
    var logtags = document.getElementsByTagName("log");
    var len = logtags.length
    for(var i = 0; i < len; i++){
        logtags[i].innerHTML += msg + "<br>";
    }
}

function HandleOnMessage(children, msg){
    for(var i = 0; i < children.length; i++){
        var node = children[i];

        switch(node.tagName){
            case "REPLY":
                msg.reply(node.innerHTML);
            break;
            case "MESSAGE":
                msg.channel.send(node.innerHTML);
        }
    }
}

function HandleJoin(children, guild, member) {
    var channel = null;
    var channelmsg = null;
    var messagemember = null;

    for (var i = 0; i < children.length; i++) {
        var node = children[i];

        switch (node.tagName) {
            case "CHANNEL":
                channel = guild.channels.get(node.innerHTML);
                break;
            case "CHANNELMESSAGE":
                if (node.innerHTML != "FALSE") {
                    channelmsg = node.innerHTML.replace("%USER%", member.username).replace("%MEMBERCOUNT%", guild.members.size).replace("%SERVER%", guild.name); 
                }
                break;
            case "MESSAGEMEMBER":
                if (node.innerHTML != "FALSE") {
                    channelmsg = node.innerHTML.replace("%USER%", member.username).replace("%MEMBERCOUNT%", guild.members.size).replace("%SERVER%", guild.name); 
                }
                break;
        }

        if (channel && channelmsg) {
            channel.send(channelmsg);
        }
        if (messagemember) {
            member.user.send(messagemember).catch(error => Log(error));
        }
    }
}

function HandleLeave(children, guild, member) {
    var channel = null;
    var channelmsg = null;
    var messagemember = null;

    for (var i = 0; i < children.length; i++) {
        var node = children[i];

        switch (node.tagName) {
            case "CHANNEL":
                channel = guild.channels.get(node.innerHTML);
                break;
            case "CHANNELMESSAGE":
                if (node.innerHTML != "FALSE") {
                    channelmsg = node.innerHTML.replace("%USER%", member.username).replace("%MEMBERCOUNT%", guild.members.size).replace("%SERVER%", guild.name); 
                }
                break;
            case "MESSAGEMEMBER":
                if (node.innerHTML != "FALSE") {
                    channelmsg = node.innerHTML.replace("%USER%", member.username).replace("%MEMBERCOUNT%", guild.members.size).replace("%SERVER%", guild.name); 
                }
                break;
        }

        if (channel && channelmsg) {
            channel.send(channelmsg);
        }
        if (messagemember) {
            member.user.send(messagemember).catch(error => Log(error));
        }
    }
}

function HandleIf() {

}


function commandhandler(client, message) {
    
    let commands = document.getElementsByTagName('cmd');
    
    
    args = message.content.slice(Prefix.length).trim().split(/ +/g);
 
}