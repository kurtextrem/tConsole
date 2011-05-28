tConsole - tinyConsole
========================
This is a jQuery Plugin. Works great with jQuery 1.6.1.<br>
Minified with [UglifyJS](http://marijnhaverbeke.nl/uglifyjs)<br>
A demo is available [here](http://kurtextrem.tk/console).<br>
Files needed: jquery.tConsole(.min).js<br>
Files you should use: console.css, cmds.php

Howto use
---------
First setup a div or something else (I prefer section, cause of HTML5 :)<br>
`<div id="console"></div>`<br>
Then call tConsole.<br>
`<script>$(document).ready(function(){ $('#console').tConsole(); });</script>`<br>
Finished, that was easy, right?<br>

What about commands?
--------------------
You have to setup them serverside. Look at `cmds.php` for example php code.

Customize
---------
tConsole(settings, templates)<br>
Settings are<br>
`{
	"name": "<insert your whatever here>",
	"url": "cmds.php?cmd=",
	"title": location.href,
	"json": true
}`. `.tConsole({name: "moepmoep"})` would change the name after copyright to "moepmoep", try to play around with them!<br>
Templates are<br>
`{
	"engine": appname+" [Version "+(0|Math.random()*10)+"."+(0|Math.random()*10)+"."+(0|Math.random()*10000)+"]", // this is eq. to Math.floor
	"copyright": "Copyright (c) "+new Date().getFullYear()+" "+settings.name+". All rights served.",
	"header": '<header><div id="appname"></div><div id="copyright"></div></header>',
	"body": '<div class="input"><span class="path"></span><span class="command"></span><span id="cursor">_</span></div>'
}`. Play around, if you know, what are u doing.

Aww... I think Windows is not my type... I like the Unix Console more!
----------------------------------------------------------------------
Aww, crap. Use [this](https://github.com/Evil-Code/UCE) one.<br>
<br>
More coming soon!<br>
<br>
Youre Kurtextrem.