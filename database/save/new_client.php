<?php
use Database\DbHandler;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

new DbHandler();


print "<br>TESTED<br>";
var_dump(DbHandler::query("select * from users")->dataArray);
print "<br>TESTED<br>";




if (($_SERVER["REQUEST_METHOD"] == "POST")) {
    $data = json_decode(file_get_contents('php://input'), true);
    var_dump($data);
    $converter_bank = [];
    // foreach ($arr_banks as $value) {
    //     $converter_bank[$value["bank_name"]] = $value["bank_table"];
}
