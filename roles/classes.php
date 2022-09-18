<?php

//base class
class Authorization{
    public int $create;
    public int $read;
    public int $update;
    public int $delete;

    public function __construct(int $create,int $read,int $update, int $delete)
    {
        $this->read =$read;
        $this->create =$create;
        $this->update =$update;
        $this->delete =$delete;
    }
}

class AuthorizationClient extends Authorization{
    function __construct(int $create,int $read,int $update, int $delete)
    {
        parent::__construct($read,$create,$update,$delete);
    }
}
class AuthorizationFournisseur extends Authorization{
    function __construct(int $create,int $read,int $update, int $delete)
    {
        parent::__construct($read,$create,$update,$delete);
    }
}
class AuthorizationFactureClient extends Authorization{
    function __construct(int $create,int $read,int $update, int $delete)
    {
        parent::__construct($read,$create,$update,$delete);
    }
}
class AuthorizationFactureFournisseur extends Authorization{
    function __construct(int $create,int $read,int $update, int $delete)
    {
        parent::__construct($read,$create,$update,$delete);
    }
}
class AuthorizationTresorerie extends Authorization{
    function __construct(int $create,int $read,int $update, int $delete)
    {
        parent::__construct($read,$create,$update,$delete);
    }
}
class AuthorizationStock extends Authorization{
    function __construct(int $create,int $read,int $update, int $delete)
    {
        parent::__construct($read,$create,$update,$delete);
    }
}
class AuthorizationFamille extends Authorization{
    function __construct(int $create,int $read,int $update, int $delete)
    {
        parent::__construct($read,$create,$update,$delete);
    }
}
class AuthorizationCategorie extends Authorization{
    function __construct(int $create,int $read,int $update, int $delete)
    {
        parent::__construct($read,$create,$update,$delete);
    }
}
class AuthorizationItem extends Authorization{
    function __construct(int $create,int $read,int $update, int $delete)
    {
        parent::__construct($read,$create,$update,$delete);
    }
}
class AuthorizationEmployee extends Authorization{
    function __construct(int $create,int $read,int $update, int $delete)
    {
        parent::__construct($read,$create,$update,$delete);
    }
}
class AuthorizationAffaire extends Authorization{
    function __construct(int $create,int $read,int $update, int $delete)
    {
        parent::__construct($read,$create,$update,$delete);
    }
}
class AuthorizationAuthorization extends Authorization{
    function __construct(int $create,int $read,int $update, int $delete)
    {
        parent::__construct($read,$create,$update,$delete);
    }
}
class AuthorizationDevis extends Authorization{
    function __construct(int $create,int $read,int $update, int $delete)
    {
        parent::__construct($read,$create,$update,$delete);
    }
}

class UserAuthorization{
    public Authorization $client;
    public Authorization $fournisseur;
    public Authorization $facture_client;
    public Authorization $facture_fournisseur;
    public Authorization $tresorerie;
    public Authorization $stock;
    public Authorization $famille;
    public Authorization $categorie;
    public Authorization $item;
    public Authorization $employee;
    public Authorization $authorization;
    public Authorization $affaire;
    public Authorization $devis;

    function __construct(array $auth_data){
        $data=func_get_arg(0);
        for ($i=0;$i<count($data);$i++){
            $data[$i]=intval($data[$i]);
        }

        $this->client=new AuthorizationClient($data[0],
            $data[1],
            $data[2],
            $data[3]
        );
        $this->fournisseur=new AuthorizationFournisseur($data[4],
            $data[5],
            $data[6],
            $data[7]
        );
        $this->facture_client=new AuthorizationFactureClient($data[8],
        $data[9],
        $data[10],
        $data[11]
        );
        $this->facture_fournisseur=new AuthorizationFactureFournisseur($data[11],
        $data[12],
        $data[13],
        $data[14]
        );
        $this->tresorerie=new AuthorizationTresorerie($data[11],
        $data[12],
        $data[13],
        $data[14]
        );
        $this->stock=new AuthorizationStock($data[15],
        $data[16],
        $data[17],
        $data[18]
        );
        $this->famille=$this->stock=new AuthorizationFamille($data[19],
        $data[20],
        $data[21],
        $data[22]
        );
        $this->categorie=new AuthorizationCategorie($data[23],
        $data[24],
        $data[25],
        $data[26]
        );
        $this->item=new AuthorizationItem($data[27],
        $data[28],
        $data[29],
        $data[30]
        );
        $this->employee=new AuthorizationEmployee($data[31],
        $data[32],
        $data[33],
        $data[34]
        );
        $this->authorization=new AuthorizationAuthorization($data[35],
        $data[36],
        $data[37],
        $data[38]
        );
        $this->affaire=new AuthorizationAffaire($data[39],
        $data[40],
        $data[41],
        $data[42]
        );
        $this->devis=new AuthorizationAffaire($data[43],
        $data[44],
        $data[45],
        $data[46]
        );
    }
}

class User{

    public UserAuthorization $authorizations;
    public int $uid;
    public string $name;

    function __construct(int $uid, string $name, array $auth_data)
    {
        $this->uid=$uid;
        $this->name=$name;
        $this->authorizations= new UserAuthorization($auth_data);

    }
}

class Authentification{
    public string $login;
    public string $password;
    function __construct(string $login,string $password)
    {
        $this->login=$login;
        $this->password=$password;
    }
    function authentificate(){
        
        password_verify($this->password,$hashed);
    }
}
