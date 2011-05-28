<?php

$version = 0.3;

$commands = array( // extend your commands here
	"hello world" => array(
		"answer" => "I'm a console, not a world -.-''",
		"handle" => ""
	),
	"HELLO WORLD" => array(
		"answer" => "I'M A CONSOLE, NOT A WORLD -.-'''",
		"handle" => ""
	),
	"help" => array(
		"answer" => "Here is your help: <a href='https://github.com/kurtextrem/tConsole'>GitHub</a>",
		"handle" => ""
	),
	"_MaX_" => array(
		"answer" => "Max is a dirty bit.",
		"handle" => "$('body').css('color', 'blue'); $('#path').last().text('_MaX_>');"
	),
	"version" => array(
		"answer" => "Wait... I have a version number? D:<br>Ok ok, my version is ".$version,
		"handle" => ""
	)
);

$cmd = urldecode($_GET['cmd']);
$cmd = trim($cmd);

if(isset($commands[$cmd])){
	echo json_encode($commands[$_GET['cmd']]); // echo the answer
}else{
	echo '{"answer": "Command not found.", "handle": "", "get": "'.$_GET['cmd'].'"}'; // command not found
}

?>