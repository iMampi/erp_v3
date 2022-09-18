<?php

class Database{
    protected $user;
    protected $password;
    protected $dbhost;
    protected $dbname;
    protected $dbhandle;

    public function __construct($user,$password,$dbhost,$dbname){
        $this->user=$user;
        $this->password=$password;
        $this->dbhost=$dbhost;
        $this->dbname=$dbname;
    }

    protected function connect(){
        $this->dbhandle=mysqli_connect($this->dbhost,$this->user,$this->password,$this->);
        if (!is_ressource($this->dbhandle)){
            throw new Exception;
        }
        if(!mysqli_select_db($this->dbname,$this->dbhost)){
            throw new Exception;
        }
    }

    public function execute($query){
        if(!$this->dbhandle){
            $this->connect();
        }
        $ret=mysqli_query($query,$dbhandle);
        if (!$ret){
            throw new Exception;
        }else if (!is_resource($ret)){
            return true;
        }else{
            $stmt=new DB_Statement($this->dbhandle, $query);
            $stmt->result=$ret;
        return $stmt;
        }

    }



}