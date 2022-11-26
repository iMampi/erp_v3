<?php

namespace Database;


class Queries
{
    public string $mode;
    public string $query;
    static public $update_client = "
    select update_client(?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?)
    ";
    
    static public $delete_client = "
    update clients set active_client='0' where uid=? 
    ";
    static public $select_one_client = "
    call one_client_details(?) 
    ";
    static public $select_all_clients = "
    call all_clients 
    ";
    static public $save_new_client = "
    SELECT new_client(?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?)
";

    public function __construct($mode)
    {
        $this->mode = $mode;
        switch ($this->mode) {
            case 'save_new_client':
                $this->query = self::$save_new_client;
                break;
            case 'select_all_clients':
                $this->query = self::$select_all_clients;
                break;
            case 'select_one_client':
                $this->query = self::$select_one_client;
                break;
            case 'delete_client':
                $this->query = self::$delete_client;
                break;

            case 'update_client':
                $this->query = self::$update_client;
                break;
            case 'test':
                $this->query = self::$test;
                break;

            default:
                # code...
                break;
        }
    }

    // public function save_new_client(){
    //     // $arr=$this->converter->data_for_db;
    //     $query=<<<END
    //         SELECT new_client(?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?,
    //         ?)
    //     END;

    //     $binding
    // }


}
