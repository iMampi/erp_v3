<?php

namespace Database;


class Queries
{
    // TODO : change select_all_clients into select_all_clients_name
    public string $mode;
    public string $query;
    static public $filter_client = "select * from view_all_clients";

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

    static public $update_fournisseur = "
    select update_fournisseur(?,
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
    static public $select_one_fournisseur = "
    call one_fournisseur_details(?) 
    ";
    static public $select_all_clients = "
    call all_clients 
    ";
    static public $select_all_fournisseurs = "
    call all_fournisseurs 
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

    static public $save_new_fournisseur = "
    SELECT new_fournisseur(
        ?,
        ? , 
        ? ,
        ? ,
        ? ,
        ? ,
        ? ,
        ? ,
        ? ,
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
        ?
    )";

    public function __construct($mode)
    {
        $this->mode = $mode;
        switch ($this->mode) {
            case 'save_new_client':
                $this->query = self::$save_new_client;
                break;
            case 'save_new_fournisseur':
                $this->query = self::$save_new_fournisseur;
                break;
            case 'select_all_clients':
                $this->query = self::$select_all_clients;
                break;
            case 'select_all_fournisseurs':
                $this->query = self::$select_all_fournisseurs;
                break;
            case 'select_one_client':
                $this->query = self::$select_one_client;
                break;
            case 'select_one_fournisseur':
                $this->query = self::$select_one_fournisseur;
                break;
            case 'delete_client':
                $this->query = self::$delete_client;
                break;
            case 'update_client':
                $this->query = self::$update_client;
                break;
            case 'update_fournisseur':
                $this->query = self::$update_fournisseur;
                break;
            case 'filter_clients':
                $this->query = self::$filter_client;
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
