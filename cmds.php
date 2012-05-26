<?php

class CMD {

	/**
	 * Contains the commands.
	 *
	 * @var		array
	 */
	private $commands = array('');

	/**
	 * Contains the answers.
	 *
	 * @var		array
	 */
	private $answers = array('The command "%s" is either wrong or could not be found.');

	/**
	 * Contains the javascript handles.
	 *
	 * @var		array
	 */
	private $handles = array(0);

	/**
	 * Contains the return type.
	 *
	 * @var		array
	 */
	private $modes = array('json');

	/**
	 * Where should we listen?
	 *
	 * @var		string
	 */
	private $protocol = 'GET';

	/**
	 * To what parameter?
	 *
	 * @var		string
	 */
	private $protocolCommand = 'cmd';


	/**
	 * Warm up.
	 *
	 * @param	string	$protocol
	 * @param	string	$protocolCommand
	 */
	public function __construct($protocol = 'GET', $protocolCommand = 'cmd') {
		$this->listenTo($protocol, $protocolCommand);
	}

	/**
	 * Config the listen settings.
	 *
	 * @param	string	$protocol
	 * @param	string	$protocolCommand
	 */
	public function listenTo($protocol = 'GET', $protocolCommand = 'cmd') {
		$this->registerProtocol($protocol);
		$this->registerProtocolCommand($protocolCommand);
	}

	/**
	 * Register answers.
	 *
	 * @param	string	$command
	 * @param	mixed	$answer
	 * @param	string	$mode
	 * @param	mixed	$handle
	 */
	public function addAnswer($command, $answer, $mode = 'json', $handle = 0) {
		$this->registerAnswer($answer);
		$this->registerCommand($command);
		$this->registerMode($mode);
		$this->registerHandle($handle);
	}

	/**
	 * Start listening.
	 *
	 * @return	boolean
	 */
	public function startListen() {
		$listen = $_GET;

		switch ($this->protocol) {
			case 'GET':
				break;

			case 'POST':
				$listen = $_POST;

			default:
				break;
		}

		$commandsLength = count($this->commands);
		$protocolCommand = $listen[$this->protocolCommand];
		
		for ($i = 0; $i < $commandsLength; $i++) {
			if ($this->commands[$i] == $protocolCommand) {
				$this->answer($this->answers[$i], $this->handles[$i], $this->modes[$i]);

				return true;
			}
		}

		return $this->answer(sprintf($this->answers[0], $protocolCommand), $this->handles[0], $this->modes[0]);
	}

	/**
	 * Register the protocol.
	 *
	 * @param	string	$protocol
	 */
	private function registerProtocol($protocol = 'GET') {
		$this->protocol = $protocol;
	}

	/**
	 * Register the protocol command.
	 *
	 * @param	string	$protocolCommand
	 */
	private function registerProtocolCommand($protocolCommand = 'cmd') {
		$this->protocolCommand = $protocolCommand;
	}

	/**
	 * Register the answer.
	 *
	 * @param	mixed	$answer
	 */
	private function registerAnswer($answer) {
		$this->answers[] = $answer;
	}

	/**
	 * Register the mode.
	 *
	 * @param	string	$mode
	 */
	private function registerMode($mode = 'json') {
		$this->modes[] = $mode;
	}

	/**
	 * Register the handle.
	 *
	 * @param	mixed	$protocolCommand
	 */
	private function registerHandle($handle = 0) {
		$this->handles[] = $handle;
	}

	/**
	 * Register the command.
	 *
	 * @param	string	$command
	 */
	private function registerCommand($command) {
		$this->commands[] = $command;
	}

	/**
	 * Answer.
	 *
	 * @param	mixed	$answer
	 * @param	mixed	$handle
	 * @param	string	$mode
	 */
	private function answer($answer, $handle = 0, $mode = 'json') {
		$echoAnswer = '';

		switch ($mode) {
			case 'json':
				$echoAnswer = $this->formatJSON($answer, $handle);
				break;

			case 'plain':
				$echoAnswer = $this->formatPlain($answer);
				break;

			default:
				$echoAnswer = $this->formatJSON($answer, $handle);
				break;
		}

		echo $echoAnswer;
	}

	/**
	 * Formats the answer to json.
	 *
	 * @param	mixed	$answer
	 * @param	mixed	$handle
	 * @return	JSON
	 */
	private function formatJSON($answer, $handle = 0) {
		$answerArray = array(
		    'answer' => $answer,
		    'handle' => $handle
		);

		return json_encode($answerArray);
	}

	/**
	 * Formats the answer to plain text.
	 *
	 * @param	mixed	$answer
	 * @return	mixed
	 */
	private function formatPlain($answer) {
		if (is_array($answer))
			$answer = implode(' ', $answer);
		return $answer;
	}

}

$cmd = new CMD();

$cmd->listenTo('GET', 'cmd');

$cmd->addAnswer('hello', 'Heyho! :)');

$cmd->startListen();