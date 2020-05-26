# Webcord
The first DiscordAPI for HTML!

## Set activity/presence
```html
<activity>
    <text>Your heart</text>
    <type>LISTENING</text>
</activity>
```

## Currently supported events
```html
<onjoin>
    <channel>CHANNELID</channel>
    <channelmessage>Message in the message channel</channelmessage>
    <!--EITHER DON'T ADD THIS CHILD OR SET THE VALUE TO
    NOT DM THE MEMBER-->
    <messagemember>DM message</messagemember>
</onjoin>

<onleave>
    <channel>CHANNELID</channel>
    <channelmessage>Message in the message channel</channelmessage>
    <!--EITHER DON'T ADD THIS CHILD OR SET THE VALUE TO
    NOT DM THE MEMBER-->
    <messagemember>DM message</messagemember>
</onleave>


<onmessage>
    <reply>Reply the message author</reply>
    <message>Send another message after the response</message>
</onmessage>

<!--HOW TO DO COMMANDS-->
<onmessage trigger="!help">
    <reply>Simple help command</reply>
    <message>Another message</message>
</onmessage>
```

## TODO / In work
* If/else statements in the HTML itself
* More events
