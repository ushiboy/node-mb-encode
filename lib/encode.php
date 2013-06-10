#!/usr/bin/php
<?php
$fp = fopen('php://stdin', 'rb');
if (!$fp) {
    exit(1);
}
$stdin = '';
while (!feof($fp)) {
    $stdin .= fread($fp, 8192);
}
$stdin .= PHP_EOL;
fclose($fp);

$data = base64_decode($stdin);
$fromCharCode = $argv[1];
$toCharCode = $argv[2];
print mb_convert_encoding($data, $toCharCode, $fromCharCode);
exit(0);
