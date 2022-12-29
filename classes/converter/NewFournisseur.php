<?php

// declare(strict_types=1);

namespace Converter;

class NewFournisseur extends Converter
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }

    public function converter_for_db()
    {
        $input = $this->data_from_user;
        $this->data_for_db["uid"] = $input["uid"] || \null;
        $this->data_for_db["type_personnality_uid"] = \intval($input["type-personnality"]);
        $this->data_for_db["adress"] = $input["adress"];
        $this->data_for_db["nif"] = $input["nif"];
        $this->data_for_db["stat"] = $input["stat"];
        $this->data_for_db["rcs"] = $input["rcs"];
        $this->data_for_db["phone1"] = $input["phone1"];
        $this->data_for_db["phone2"] = $input["phone2"];
        $this->data_for_db["mail1"] = $input["mail1"];
        $this->data_for_db["mail2"] = $input["mail2"];
        $this->data_for_db["active_fournisseur"] = \intval($input["actif"]);
        $this->data_for_db["note"] = $input["note"];
        $this->data_for_db["encours"] = \floatval($input["encours"]) || 0;
        $this->data_for_db["nb_jour"] = \intval($input["echeance"]) || 0;
        $this->data_for_db["evaluation"] = \intval($input["evaluation"]);
        $this->data_for_db["declarable"] = \intval($input["declarable"]);

        if ($input["type-personnality"] == "1") {
            // for human   

            $this->data_for_db["nom_commercial"] = \null;
            $this->data_for_db["raison_sociale"] = \null;
            $this->data_for_db["noms"] = $input["noms"];
            $this->data_for_db["prenoms"] = $input["prenoms"];
            $this->data_for_db["cin"] = $input["cin"];
            $this->data_for_db["cin_date"] = $input["cin-date"];
            $this->data_for_db["cin_lieu"] = $input["cin-lieu"];
            $this->data_for_db["naissance_date"] = $input["naissance-date"];
            $this->data_for_db["naissance_lieu"] = $input["naissance-lieu"];
        } else {

            // for company
            $this->data_for_db["nom_commercial"] = $input["nom-commercial"];
            $this->data_for_db["raison_sociale"] = $input["raison-sociale"];
            $this->data_for_db["noms"] = \null;
            $this->data_for_db["prenoms"] = \null;
            $this->data_for_db["cin"] = \null;
            $this->data_for_db["cin_date"] = \null;
            $this->data_for_db["cin_lieu"] = \null;
            $this->data_for_db["naissance_date"] = \null;
            $this->data_for_db["naissance_lieu"] = \null;
        }
    }
}
