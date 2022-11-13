<?php

namespace Database;

class Result
{
    public $dataObj;
    public $dataArray;

    function __construct($dataObj, $mode = MYSQLI_BOTH)
    {
        if ($dataObj != \null) {

            $this->dataObj = $dataObj;
            $this->dataArray = $this->result_to_array($dataObj, $mode);
        } else {
            $this->dataObj = \null;
            $this->dataArray = \null;
        }
    }

    function result_to_array(object $result, $mode)
    {
        if (!in_array($mode, [MYSQLI_NUM, MYSQLI_ASSOC, MYSQLI_BOTH])) {
            throw new \Exception("Mode is neither MYSQLI_NUM or MYSQLI_ASSOC or MYSQLI_BOTH");
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
