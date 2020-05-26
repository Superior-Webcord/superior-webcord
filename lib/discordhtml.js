Log("Looking for token...");
var token = document.getElementsByTagName("token")[0].innerHTML;
var PREFIX = document.getElementsByName("prefix")
Log("Found token.");

const client = new Discord.Client();

client.on('ready', () => {
    var activity = document.getElementsByTagName("activity");
    for (var i = 0; i < activity.length; i++) {
        HandleActivity(activity[i].children);
    }

    Log("Bot is started and ready to go.")
})

client.on('message', msg => {
    var OnMessageHandlers = document.getElementsByTagName("onmessage");
    for(var i = 0; i < OnMessageHandlers.length; i++){
        if(msg.author.id !== client.user.id) {
            HandleOnMessage(OnMessageHandlers[i].children, msg);
        }
    }
    Log("Received message from "+msg.author.username+": " + msg.content);
});

client.on('message', message => {
    if (message.author.bot) return
    
    if (message.content.startsWith(`${PREFIX}`)) {
        commandhandler(client, message)
    }
    
})

client.on('guildMemberAdd', member => {
    var OnGuildMemberAddHandlers = document.getElementsByTagName("onjoin");
    for (var i = 0; i < OnGuildMemberAddHandlers.length; i++) {
        if (member.id !== client.user.id)
            HandleJoin(OnGuildMemberAddHandlers[i].children, member.guild, member);
    }
})

client.on('guildMemberRemove', member => {
    var OnGuildMemberRemoveHandlers = document.getElementsByTagName("onleave");
    for (var i = 0; i < OnGuildMemberRemoveHandlers.length; i++) {
        if (member.user.id !== client.user.id)
            HandleLeave(OnGuildMemberRemoveHandlers[i].children, member.guild, member);
    }
})


/** 
client.on('error', error => {
    Log(error)
})
*/

client.login(token);

function HandleActivity(children){
    for(var i = 0; i < children.length; i++){
        var node = children[i];
        var text;
        var atype;

        switch(node.tagName){
            case "TEXT":
                text = node.innerHTML;
                break;
            case "TYPE":
                atype = node.innerHTML;
                break;
        }
        client.user.setActivity(text, { "type": atype }).catch(error => {console.log("error")});
    }
}


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
                msg.reply(node.innerHTML.replace(/&gt;/g, ">")).replace(/\\n/g, "\n")
                break;
            case "MESSAGE":
                msg.channel.send(node.innerHTML.replace(/&gt;/g, ">").replace(/\\n/g, "\n"));
                break;
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

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


function commandhandler(client, message) {
    
    let commands = document.getElementsByTagName('cmd');
    
    
    args = message.content.slice(Prefix.length).trim().split(/ +/g);
 
}