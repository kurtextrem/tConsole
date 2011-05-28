<?php

$commands = array(
	"hello world" => array(
		"answer" => "I'm a console, not a world -.-''",
		"handle" => ""
	),
	"HELLO WORLD" => array(
		"answer" => "I'M A CONSOLE, NOT A WORLD -.-'''",
		"handle" => ""
	),
	"help" => array(
		"answer" => "Well... go and die!",
		"handle" => ""
	),
	"_MaX_" => array(
		"answer" => "Max is a dirty bit.",
		"handle" => "$('body').css('color', 'blue'); $('#path').last().text('_MaX_>');"
	)
);

$cmd = urldecode($_GET['cmd']);
$cmd = trim($cmd);
//$cmd = preg_replace('/\s/', '', $cmd);
//$cmd = str_replace('Â', '', $cmd); // i dunno where it comes from...
//var_dump($cmd);
if(isset($commands[$cmd])){
	echo json_encode($commands[$_GET['cmd']]);
}else{
	echo '{"answer": "Command not found.", "handle": "", "get": "'.$_GET['cmd'].'"}';
}

?>