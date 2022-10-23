<?php

namespace Database;

class DbHandler
{
    static $created = 0;
    const HOST = "localhost:3306";
    const USER = "imampi";
    const PASSWORD = "2708";
    const DATABASE = "erpv2";
    static public $connection;

    function __construct()
    {
        if (self::$created != 0) {
            return;
        }
        self::connect();
        self::$created = 1;
    }



    static function connect()
    {
        self::$connection = new \mysqli(self::HOST, self::USER, self::PASSWORD, self::DATABASE);
        self::$connection->set_charset('utf8mb4');
        //add this so we can see why a query fails
        $driver = new \mysqli_driver();

        $driver->report_mode = MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT;

        if (self::$connection->connect_error) die("Cannot connect");
    }

    static function query($myquery)
    {
        $result = self::$connection->query($myquery);
        if (!$result) die("Problem with your query");
        return new Result($result);
    }
}
