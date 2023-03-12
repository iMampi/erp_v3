<?php

namespace Database;


class Queries
{
    // TODO : change select_all_clients into select_all_clients_name
    public string $mode;
    public string $query;
    static public $filter_client = "select * from view_all_clients";
    static public $filter_fournisseur = "select * from view_all_fournisseurs";
    static public $filter_categorie = "select * from categories";
    static public $filter_famille = "select * from familles";

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
        select update_fournisseur(
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

    static public $update_categorie = "
        update categories set 
        name=?,
        active=?
        where uid=?
        ";
    static public $update_famille = "
        update familles set 
        name=?,
        active=?
        where uid=?
        ";

    static public $delete_client = "
        update clients set active_client='0' where uid=? 
        ";
    static public $delete_fournisseur = "
        update fournisseurs set active_fournisseur='0' where uid=? 
        ";
    static public $delete_categorie = "
        update categories set active='0' where uid=? 
        ";
    static public $delete_famille = "
        update familles set active='0' where uid=? 
        ";
    static public $delete_employee = "
        update employees set active_employee='0' where matricule=? 
        ";
    static public $select_one_client = "
        call one_client_details(?) 
        ";
    static public $select_one_employee = "
        select * from view_all_employees where matricule=? 
        ";
    static public $select_one_fournisseur = "
        call one_fournisseur_details(?) 
        ";
    static public $select_one_categorie = "
        select * from categories where  uid=? 
        ";
    static public $select_one_famille = "
        select * from familles where  uid=? 
        ";
    static public $select_one_item = "
        select * from view_all_items where code=? 
        ";
    static public $select_all_clients = "
        call all_clients 
        ";
    static public $select_all_employees_name = "
        call all_employees_active_only 
        ";
    static public $select_all_fournisseurs = "
        call all_fournisseurs 
        ";
    static public $select_all_categories_name_limit = "
        select * from categories limit 20
        ";
    static public $select_all_categories_name_nolimit = "
        select * from categories
        ";
    static public $select_all_familles_name_limit = "
        select * from familles limit 20
        ";
    static public $select_all_familles_name_nolimit = "
        select * from familles
        ";
    static public $select_all_items_name_limit = "
        select * from items where active=1 limit 20
        ";
    static public $save_new_client = "
        SELECT new_client(
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

    static public $save_new_categorie = "
    select new_categorie(?,?)
    ";
    static public $save_new_item = "
        select new_item(?,
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
        )
        ";
    static public $save_new_famille = "
        select new_famille(?,?)
        ";
    static public $save_new_employee = "
        select new_employee(
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
            case 'save_new_fournisseur':
                $this->query = self::$save_new_fournisseur;
                break;
            case 'save_new_categorie':
                $this->query = self::$save_new_categorie;
                break;
            case 'save_new_famille':
                $this->query = self::$save_new_famille;
                break;
            case 'save_new_employee':
                $this->query = self::$save_new_employee;
                break;
            case 'save_new_item':
                $this->query = self::$save_new_item;
                break;
            case 'select_all_clients':
                $this->query = self::$select_all_clients;
                break;
            case 'select_all_fournisseurs':
                $this->query = self::$select_all_fournisseurs;
                break;
            case 'select_all_categories_name_limit':
                $this->query = self::$select_all_categories_name_limit;
                break;
            case 'select_all_categories_name_nolimit':
                $this->query = self::$select_all_categories_name_nolimit;
                break;
            case 'select_all_familles_name_limit':
                $this->query = self::$select_all_familles_name_limit;
                break;
            case 'select_all_familles_name_nolimit':
                $this->query = self::$select_all_familles_name_nolimit;
                break;
            case 'select_all_employees_name':
                $this->query = self::$select_all_employees_name;
                break;
            case 'select_all_items_name_limit':
                $this->query = self::$select_all_items_name_limit;
                break;
            case 'select_one_client':
                $this->query = self::$select_one_client;
                break;
            case 'select_one_fournisseur':
                $this->query = self::$select_one_fournisseur;
                break;
            case 'select_one_categorie':
                $this->query = self::$select_one_categorie;
                break;
            case 'select_one_famille':
                $this->query = self::$select_one_famille;
                break;
            case 'select_one_item':
                $this->query = self::$select_one_item;
                break;
            case 'select_one_employee':
                $this->query = self::$select_one_employee;
                break;
            case 'delete_client':
                $this->query = self::$delete_client;
                break;
            case 'delete_fournisseur':
                $this->query = self::$delete_fournisseur;
                break;
            case 'delete_categorie':
                $this->query = self::$delete_categorie;
                break;
            case 'delete_famille':
                $this->query = self::$delete_famille;
                break;
            case 'delete_employee':
                $this->query = self::$delete_employee;
                break;
            case 'update_client':
                $this->query = self::$update_client;
                break;
            case 'update_fournisseur':
                $this->query = self::$update_fournisseur;
                break;
            case 'update_categorie':
                $this->query = self::$update_categorie;
                break;
            case 'update_famille':
                $this->query = self::$update_famille;
                break;
            case 'filter_clients':
                $this->query = self::$filter_client;
                break;
            case 'filter_fournisseurs':
                $this->query = self::$filter_fournisseur;
                break;
            case 'filter_categories':
                $this->query = self::$filter_categorie;
                break;
            case 'filter_familles':
                $this->query = self::$filter_famille;
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
