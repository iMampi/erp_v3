<?php

namespace Database;


class Queries
{
    public string $mode;
    public string $query;
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

// $arr["type_personnality_uid"],
//             $arr["adress"],
//             $arr["nif"],
//             $arr["stat"],
//             $arr["rcs"],
//             $arr["phone1"],
//             $arr["phone2"],
//             $arr["mail1"],
//             $arr["mail2"],
//             $arr["active_"],
//             $arr["note"],
//             $arr["nom_commercial"],
//             $arr["raison_sociale"],
//             $arr["noms"],
//             $arr["prenoms"],
//             $arr["cin"],
//             $arr["cin_date"],
//             $arr["cin_lieu"],
//             $arr["naissance_date"],
//             $arr["naissance_lieu"],
//             $arr["type_vente"],
//             $arr["encours"],
//             $arr["nb_jour"],
//             $arr["evaluation"],
//             $arr["declarable"],
//             $arr["commissionable"]
