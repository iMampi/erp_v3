<?php

namespace Database;

class DbHandler
{
    const HOST = "localhost:3306";
    const USER = "imampi";
    const PASSWORD = "2708";
    const DATABASE = "erpv2";
    public $connection;

    function connect()
    {
        $this->connection = new mysqli(self::HOST, self::USER, self::PASSWORD, self::DATABASE);
        $this->connection->set_charset('utf8mb4');
        //add this so we can see why a query fails
        $driver = new mysqli_driver();

        $driver->report_mode = MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT;

        if ($this->connection->connect_error) die("Cannot connect");
    }

    function query($myquery)
    {
        $result = $this->connection->query($myquery);
        if (!$result) die("Problem with your query");
        return $result;
    }

    function result_to_array(object $result, $mode = MYSQLI_BOTH)
    {
        if (!in_array($mode, [MYSQLI_NUM, MYSQLI_ASSOC, MYSQLI_BOTH])) {
            throw Exception("Mode is neither MYSQLI_NUM or MYSQLI_ASSOC or MYSQLI_BOTH");
        }
        // echo "result <br>";
        // var_dump($result);
        //treating data
        //prefer using this for loop instead of while loop because, the while loop uses too much memory
        $arr_ = [];
        $length = $result->num_rows;
        // echo "<br> numb :";
        // echo $tt;
        for ($count = 0; $count < $length; ++$count) {
            // $row_values =$result->fetch_array(MYSQLI_ASSOC);
            $row_values = $result->fetch_array($mode);
            //$x[$row_values[0]]=$row_values[1];
            $arr_[] = $row_values;
        }
        //an array of array
        return $arr_;
    }
}
