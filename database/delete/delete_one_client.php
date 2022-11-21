<?php

use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use Converter\DeleteClient;
use Database\StandardPreparedStatement;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

new DbHandler();

$data = json_decode(file_get_contents('php://input'), true);

$DeleteClientObj = new DeleteClient($data);

$Query = new Queries("delete_client");
$Binding = new Bindings($DeleteClientObj);
$Statement = new StandardPreparedStatement($Query, $Binding);
print(json_encode(DbHandler::execute_prepared_statement($Statement)));
