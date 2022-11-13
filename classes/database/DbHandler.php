<?php

namespace Database;

use Database\PreparedStatement;


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

    static function select_query(string $myquery, $mode)
    {
        try {

            $result = self::$connection->query($myquery);
            if (!$result) die("Problem with your query");
            // echo "<br>called 1<br>";
            $result_ = new Result($result, $mode);
            // print_r($result_->dataArray);
            return $result_->dataArray;
        } catch (\Exception $e) {
            echo "<br>error <br>";

            // TODO : err will be logged
            return new Result(\null);
        }
    }


    static function execute_prepared_statement(StandardPreparedStatement $prepared_statement)
    {
        $stmt = self::$connection->stmt_init();
        $res = $stmt->prepare($prepared_statement->query);
        if (!$res) {
            echo "Échec lors de la préparation de la requête 01\n";
        } else {
            //call_user_func_array(array($stmt, "bind_param"), $binding);
            if (empty($prepared_statement->binding)) {
                echo "<br>called 2<br>";
                // TODO : pas top, à changer

                return self::select_query($prepared_statement->query);
            } else {

                $stmt->bind_param(...$prepared_statement->binding);
                try {
                    $stmt->execute();
                } catch (\Throwable $th) {
                    return "err1 : " . $th->getMessage();
                }
                // $x = $stmt->affected_rows;
                try {
                    $res = $stmt->get_result();
                    $results = $res->fetch_assoc();
                    // echo "result is : <br> ";
                    return \json_encode($results);
                } catch (\Throwable $th) {
                    return "err2 : " . $th->getMessage();
                }
            }

            // echo "affected rows are nb $x";
            $mode = "create";
            // if ($x > 0) {
            //     $insert_id = $stmt->get_result()->fetch_assoc(\MYSQLI_NUM)[0];
            //     if ($mode === "insert") {
            //         $insert_id = "-" . $stmt->insert_id;
            //     }
            //     print "$mode-ok$insert_id";
            // } else {
            //     // print "$mode-err";
            // }
        }
        // $stmt->close();
        // self::$connection->close();
    }
}
