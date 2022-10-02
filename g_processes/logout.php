<?php

require_once __DIR__ . "/../utilities/login_utils.php";

Destroysession();
$host  = $_SERVER['HTTP_HOST'];

header("Location: http://$host/index.php");
exit;
