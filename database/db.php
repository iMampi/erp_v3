<?php
// require_once __DIR__ . "/../../vendor/autoload.php";

////ON RED////
define("HOST", "localhost:3306");
define("USER", "imampi");
define("PASSWORD", "2708");
define("DATABASE", "erpv2");

$connection = new mysqli(HOST, USER, PASSWORD, DATABASE);
$connection->set_charset('utf8mb4');
//add this so we can see why a query fails
$driver = new mysqli_driver();
$driver->report_mode = MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT;

if ($connection->connect_error) die("Cannot connect");

/////////functions fornmysql////////
// TODO : cahnge to prepared statement
// TODO : hash password
function login($conn, $login, $password)
{
    $myquery = "select * from users where login= '" . $login . "'";
    $result = Myquery($conn, $myquery);

    $len = $result->num_rows;
    if ($len != 1) {
        echo "problem with result";
    } else {

        $arr_ = ResultToArray($result, MYSQLI_NUM);

        // compare password
        if (($arr_[0][2] == $password) && ($arr_[0][3] == "1")) {
            $arr_[0][2] = null;
            $arr_[0]["logged"] = "logged";
            return $arr_[0];
            // TODO : return the class UserAuthorization the check if active in login;
        } else {
            return false;
        }
    }
}


function formatPermission($result)
{
}
function Myquery($conn, $query)
{
    $result = $conn->query($query);
    if (!$result) die("Problem with your query");
    return $result;
}

function Sanitize($conn, $var)
{
    if (get_magic_quotes_gpc()) {
        $var = stripslashes($var);
    }
    $var = strip_tags($var);
    $var = htmlspecialchars($var);

    return $conn->real_escape_string($var);
}

function FetchAll($conn, $table)
{
    $query = "select * from $table";
    $result = Myquery($conn, $query);
    return $result;
}

//NOTE : this function works great on $mysqli_result object from simple query.(tested : ok)
function ResultToArray(object $result, $mode = MYSQLI_BOTH)
{
    if (!in_array($mode, [MYSQLI_NUM, MYSQLI_ASSOC, MYSQLI_BOTH])) {
        throw Exception("Mode is neither MYSQLI_NUM or MYSQLI_ASSOC or MYSQLI_BOTH");
    }
    // echo "result <br>";
    // var_dump($result);
    //treating data
    //prefer using this for loop instead of while loop because, the while loop uses too much memory
    $x = [];
    $tt = $result->num_rows;
    // echo "<br> numb :";
    // echo $tt;
    for ($count = 0; $count < $tt; ++$count) {
        // $row_values =$result->fetch_array(MYSQLI_ASSOC);
        $row_values = $result->fetch_array($mode);
        //$x[$row_values[0]]=$row_values[1];
        $x[] = $row_values;
        //echo "wxc $txt_tab";
    }
    //an array of array
    return $x;
}
