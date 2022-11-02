<?php

// declare(strict_types=1);

namespace Database;

use Converter\Converter;

class Bindings
{
    public Converter $converter;
    public array $binding;
    static public array $save_new_client;

    function __construct(Converter $converter)
    {
        $this->converter = $converter;
        $this->generate();
    }
    function generate()
    {
        $arr = $this->converter->data_for_db;
        // $this->converter->data_for_db;
        if ($this->converter::class == "Converter\NewClient") {
            $this->binding = [
                'issssssssissssssssssidiiii',
                $this->converter->data_for_db["type_personnality_uid"],
                $arr["adress"],
                $arr["nif"],
                $arr["stat"],
                $arr["rcs"],
                $arr["phone1"],
                $arr["phone2"],
                $arr["mail1"],
                $arr["mail2"],
                $arr["active_"],
                $arr["note"],
                $arr["nom_commercial"],
                $arr["raison_social"],
                $arr["noms"],
                $arr["prenoms"],
                $arr["cin"],
                $arr["cin_date"],
                $arr["cin_lieu"],
                $arr["naissance_date"],
                $arr["naissance_lieu"],
                $arr["type_vente"],
                $arr["encours"],
                $arr["nb_jour"],
                $arr["evaluation"],
                $arr["declarable"],
                $arr["commissionable"]
            ];
        } else {
            echo "NOT VALID";
        }
    }
}
