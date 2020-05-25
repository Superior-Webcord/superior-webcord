# Webcord
The first DiscordAPI for HTML!

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
```

## TODO / In work
* If/else statements in the HTML itself
* More events
