Log("Looking for token...");
var token = document.getElementsByTagName("token")[0].innerHTML;
var PREFIX = document.getElementsByName("prefix")
Log("Found token.");

let varcache = new Map();

readVars(varcache)

let object = varcache.entries();



// TODO: await response method
// TODO: put LOG into own consolelike div


/**
 * # does this do anything?
 */

 

  /**
   * @class
   * @memberof module:something
   */


   /**
    * @description # Okay markdown wokrs, lets see what this does: <br> Ebola
    * @summary # This is a creative summary
    * @example <caption>my caption</caption>
    * {@lang xml}
    * <mycode></mycode>
    */


 
/**
  * @module something
  */

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

function readVars(varcache) {
    let variables = document.getElementsByTagName("var");
    for (var i = 0; i < variables.length; i++) {
        var node = variables[i];
        if (node.getAttribute("name")) {
            varcache.set(node.getAttribute("name"), node.innerHTML);
        } else {
            Log("Tried to declare variable with no name with the value " + node.innerHTML);
        }
    }
}

function GetVar(string) {
    return varcache.get(string.replace(/%%/g, ""));
}


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


/**
 * @function Handleloops
 * @description This handles loops and returns a new array. IMPORTANT: Only supports discohtml functions
 * @param {object} variable - the varibale that you want to use as declarator in the loop
 * @param {number} limit - how many iterations you want the loop to go on for
 * @param {object} func - needs to be a discohtml function/method
 * @param {object} parent - this resembled the object/array, the for-loop is applied to
 * @returns {void}
 */

function Handleloops(variable, limit, func, parent) {
    let returnarray = [];
    for (let i=0; i<limit; i++) {
        let value = parent[i]
        return returnarray.push(func(value))
    }
}




/**
 * @method HandleOnMessage
 * @description This function handles incoming messages and replying/answering them.
 * @param {object} children 
 * @param {object} msg 
 * @returns {void}
 */

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




/**
 * @method HandleJoin
 * @description This method takes care of the guildMemberJoin event.
 * @param {object} children 
 * @param {object} guild 
 * @param {collection} member 
 */
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


/**
 * @method Handleleave 
 * @description Handles the guildmamber remove event.
 * @param {array} children 
 * @param {object} guild 
 * @param {object} member 
 * @returns {void}
 */
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

//!SECTION

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

/**
 * @method commandhandler
 * @description Basic commandhandler
 * @param {object} client - discords client object
 * @param {object} message - discords message object
 * @returns {void} 
 */

function commandhandler(client, message) {
    
    let commands = document.getElementsByTagName('cmd');
    
    
    args = message.content.slice(Prefix.length).trim().split(/ +/g);
 
}