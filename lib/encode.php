#!/usr/bin/php
<?php
$fp = fopen('php://stdin', 'rb');  
if(!$fp) exit;  
$stdin = '';  
do {  
    $line = fread($fp, 8192);  
    if (strlen($line) == 0) break;  
    $stdin .= $line . PHP_EOL;  
} while(true);  
fclose($fp);

$data = base64_decode($stdin);
$fromCharCode = $argv[1];
$toCharCode = $argv[2];
print mb_convert_encoding($data, $toCharCode, $fromCharCode);
