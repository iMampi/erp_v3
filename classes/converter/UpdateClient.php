<?php

// declare(strict_types=1);

namespace Converter;

class UpdateClient extends Converter
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }

    public function converter_for_db()
    {
        $input = $this->data_from_user;
        $this->data_for_db["uid"] = \intval(\trim($input["uid"])) != 0 ? intval($input["uid"]) : \null;
        $this->data_for_db["type_personnality_uid"] = \in_array(\intval($input["type-personnality"]), [1, 2], \true);
        $this->data_for_db["adress"] = \trim($input["adress"]) == "" ? \null : \trim($input["adress"]);
        $this->data_for_db["nif"] = \trim($input["nif"]) == "" ? \null : trim($input["nif"]);
        $this->data_for_db["stat"] = \trim($input["stat"]) == "" ? \null : trim($input["stat"]);
        $this->data_for_db["rcs"] = \trim($input["rcs"]) == "" ? \null : trim($input["rcs"]);
        $this->data_for_db["phone1"] = \trim($input["phone1"]) == "" ? \null : trim($input["phone1"]);
        $this->data_for_db["phone2"] = \trim($input["phone2"]) == "" ? \null : trim($input["phone2"]);
        $this->data_for_db["mail1"] = \trim($input["mail1"]) == "" ? \null : trim($input["mail1"]);
        $this->data_for_db["mail2"] = \trim($input["mail2"]) == "" ? \null : trim($input["mail2"]);
        $this->data_for_db["active_client"] = \intval($input["actif"]) || \null;
        $this->data_for_db["note"] = \trim($input["note"]) == "" ? \null : trim($input["note"]);
        $this->data_for_db["type_vente"] = intval($input["type-vente"]) || \null;
        $this->data_for_db["encours"] = $input["encours"] ? \floatval($input["encours"]) : \null;
        $this->data_for_db["nb_jour"] = $input["echeance"] ? \intval($input["echeance"]) : 0;
        $this->data_for_db["evaluation"] = \intval($input["evaluation"]) || \null;
        $this->data_for_db["declarable"] = \intval($input["declarable"]) || \null;
        $this->data_for_db["commissionable"] = \intval($input["commissionable"]) || \null;

        if ($input["type-personnality"] == "1") {
            // for human   

            $this->data_for_db["nom_commercial"] = \null;
            $this->data_for_db["raison_sociale"] = \null;
            $this->data_for_db["noms"] = \trim($input["noms"]) == "" ? \null : trim($input["noms"]);
            $this->data_for_db["prenoms"] = \trim($input["prenoms"]) == "" ? \null : trim($input["prenoms"]);
            $this->data_for_db["cin"] = \trim($input["cin"]) == "" ? \null : trim($input["cin"]);
            $this->data_for_db["cin_date"] = \trim($input["cin-date"]) == "" ? \null : trim($input["cin-date"]);
            $this->data_for_db["cin_lieu"] = \trim($input["cin-lieu"]) == "" ? \null : trim($input["cin-lieu"]);
            $this->data_for_db["naissance_date"] = \trim($input["naissance-date"]) == "" ? \null : trim($input["naissance-date"]);
            $this->data_for_db["naissance_lieu"] = \trim($input["naissance-lieu"]) == "" ? \null : trim($input["naissance-lieu"]);
        } else {

            // for company
            $this->data_for_db["nom_commercial"] = \trim($input["nom-commercial"]) == "" ? \null : trim($input["nom-commercial"]);
            $this->data_for_db["raison_sociale"] = \trim($input["raison-sociale"]) == "" ? \null : trim($input["raison-sociale"]);
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
