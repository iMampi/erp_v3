<?php

require_once __DIR__ . "/../utilities/login_utils.php";

Destroysession();

header("Location: {$__DIR__}/../index.php");
exit();
