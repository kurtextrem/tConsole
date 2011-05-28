/**
 * A jQuery Console Script.
 *
 * @author kurtextrem <kurtextrem@gmail.com>
 * @license CC BY-SA http://creativecommons.org/licenses/by-sa/3.0/
 * @copyright 2011-XXXX
 * @version 0.4
 * @jquery <= 1.6.1
 *
 */
(function($){
	cursor_idle = false;

	$.fn.tConsole = function(options, templates, appname){
		$this = this;

		if(options) // its needed here because of the templates
			$.extend(settings, options);

		if(!appname)
			appname = (navigator.userAgent.search(/chrome/i) == -1)?navigator.appName:'Google Chrome';

		var settings = {
			"name": "<insert your whatever here>",
			"url": "cmds.php?cmd=",
			"title": location.href,
			"json": true
		};
		var tpl = {
			"engine": appname+" [Version "+(0|Math.random()*10)+"."+(0|Math.random()*10)+"."+(0|Math.random()*10000)+"]", // this is eq. to Math.floor
			"copyright": "Copyright (c) "+new Date().getFullYear()+" "+settings.name+". All rights served.",
			"header": '<header><div id="appname"></div><div id="copyright"></div></header>',
			"body": '<div class="input"><span class="path"></span><span class="command"></span><span id="cursor">_</span></div>'
		};

		if(templates) // extends the default object with user input
			$.extend(tpl, templates);

		this.html(tpl.header+tpl.body);
		$('#appname').text(tpl.engine);
		$('#copyright').text(tpl.copyright);
		$('.path').last().text(location.hostname+'>');

		window.title = settings.title;

		window.setInterval(function(){
			if(!cursor_idle)
				$('#cursor').toggle();
		}, 500);

		$(document).keypress(function(event){
			if(!cursor_idle){
				if(event.which > 46 && event.which < 222){
					var key = String.fromCharCode(event.which);
					if(!event.shiftKey)
						key = key.toLowerCase();
					$('.command').last().append(key);
					event.preventDefault();
				}
			}
		}).keydown(function(e){
			if(e.which == 13){
				cursor_idle = true;
				var cmd = $('.command').last().text().replace(/\s/, '%20');
				if(settings.json && $.trim($('.command').last().text()) != ''){
					$.getJSON(settings.url+cmd, function(json){

						if(json.answer)
							$('.command').last().after('<div class="answer">'+json.answer+'</div>');

						$('#cursor').remove();
						$this.append(tpl.body);
						$('.path').last().text(location.hostname+'>');

						if(json.handle != "")
							eval(json.handle);

						cursor_idle = false;
					});
				}else if($.trim($('.command').last().text()) != ''){
					$.get(settings.url+cmd, function(script){
						eval(script);

						cursor_idle = false;
					});
				}else{
					$('#cursor').remove();
					$this.append(tpl.body);
					$('.path').last().text(location.hostname+'>');

					cursor_idle = false;
				}
			}
			if(e.which == 8){
				var command = $('.command').last();
				command.text(command.text().substr(0, command.text().length-1));
				e.preventDefault();
			}
			if(e.which == 9)
				e.preventDefault();
			if(e.which == 32){
				$('.command').last().append('&nbsp;');
				e.preventDefault();
			}
		});

		return;
	};
})( jQuery );