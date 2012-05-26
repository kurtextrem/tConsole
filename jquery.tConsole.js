/**
 * A simple jQuery Console Script.
 *
 * @author	kurtextrem <kurtextrem@gmail.com>
 * @license	LGPL
 * @copyright	2012
 * @version	1.0
 * @jquery	>= 1.6.1
 *
 */

!function($){
	"use strict"

	var tConsole = {
		$this: 0,

		main: function(options, templates){
			var _this = this,		// the real "this"
				$this = this.$this,	// the jquery object "this" -> the element where it's called from.. brainfuck
				settings = {
					vendor: 'kurtextrem',
					commandUrl: 'cmds.php?cmd=',
					year: new Date().getFullYear(),
					appname: 'tConsole',
					version: '1.0',
					json: true
				},
				tpl = {
					engine: '<span class="tConsole-appname"></span> [Version <span class="tConsole-version"></span>]',
					copyright: 'Copyright (c) <span class="tConsole-year"></span> <span class="tConsole-vendor"></span>. All rights served.',
					error: '<div class="tConsole-answer">Oups, the request\'s gone wrong! Please try again.</div>',
					header: '<header><div class="tConsole-app"></div><div class="tConsole-copyright"></div></header>',
					body: '<div class="tConsole-input"><span class="tConsole-path"></span><span class="tConsole-command"></span><span class="tConsole-cursor">_</span></div>'
				}

			if(options)
				$.extend(settings, options)

			if(templates) // extends the default object with user input
				$.extend(tpl, templates)

			// we need to fill in the gaps
			//$this.html('<div class="tConsole" unselectable="on" tabindex="1">'+tpl.header+tpl.body+'</div>')
			$this.html('<div class="tConsole" tabindex="1">' + tpl.header + tpl.body + '</div>')

			// change the parent to the real console element
			$this = this.$this = $this.find('.tConsole')

			// first fill in the templates
			$this.find('.tConsole-app').html(tpl.engine)
			$this.find('.tConsole-copyright').html(tpl.copyright)

			// and then fill in the gaps again
			$this.find('.tConsole-appname').text(settings.appname)
			$this.find('.tConsole-path').last().text(location.hostname+'>')
			$this.find('.tConsole-year').text(settings.year)
			$this.find('.tConsole-vendor').text(settings.vendor)
			$this.find('.tConsole-version').text(settings.version)

			// set the cursor blink interval
			window.setInterval(function(){
				if(!$this.data('cursor-idle'))
					$this.find('.tConsole-cursor').toggle()
				else
					$this.find('.tConsole-cursor').hide()
			}, 500)

			$this.keypress(function(e){
				if(!$this.data('cursor-idle')){
					if(e.which > 46 && e.which < 253){
						var key = String.fromCharCode(e.which)

						if(!e.shiftKey)
							key = key.toLowerCase()

						$('.tConsole-command').last().append(key)

						e.preventDefault()
					}
				}
			}).keydown(function(e){
				var cmd = $('.tConsole-command').last().text()
				var action = false

				if(e.which == 13){
					cmd = cmd.replace(/\s/, '%20')

					_this.disableCursor()

					if(settings.json && $.trim(cmd) !== '') {
						$.ajax(settings.commandUrl+cmd, {
							success: function(ret) {
								var answer = ret

								if(settings.json) {
									ret = $.parseJSON(ret)
									answer = ret.answer

									if(ret.handle)
										eval(ret.handle)
								}

								_this.newConsoleLine(answer, tpl.body)
							},

							error: function() {
								_this.newConsoleLine(tpl.error, tpl.body)
							}
						})
					} else if($.trim(cmd) === '') {
						_this.newConsoleLine(0, tpl.body)
					}
					action = true
				}

				if(e.which === 8) {
					$this.find('.tConsole-command').last().text(cmd.substr(0, cmd.length-1))
					action = true
				}

				if(e.which === 32) {
					$this.find('.tConsole-command').last().text(cmd+' ')
					action = true
				}

				_this.enableCursor()

				if(action)
					e.preventDefault()
			}).blur(function(){
				_this.disableCursor()
			}).focus(function(){
				_this.enableCursor()
			})

			// if it's not focused you can't type
			$this.focus()


			// return the finalized console object which we've created :)
			return $this
		},

		enableCursor: function() {
			this.$this.data('cursor-idle', false)
		},

		disableCursor: function() {
			this.$this.data('cursor-idle', true)
		},

		newConsoleLine: function(content, tpl) {
			if (content)
				this.$this.find('.tConsole-command').last().after('<div class="tConsole-answer">' + content + '</div>')
			this.$this.find('.tConsole-cursor').remove()
			this.$this.append(tpl)
			this.$this.find('.tConsole-path').last().text(location.hostname+'>')
		}
	}

	$.fn.tConsole = function(options, templates) {
		this.tConsole = tConsole
		this.tConsole.$this = this
		this.tConsole.main(options, templates)
	}
}(jQuery)