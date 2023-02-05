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
        $this->data_for_db["uid"] = \array_key_exists("uid", $input) ? \intval($input["uid"]) != 0 ?  \intval($input["uid"]) : \null : \null;

        $this->data_for_db["type_personnality_uid"] = \array_key_exists("type_personnality_uid", $input) ?
            $this->data_for_db["type_personnality_uid"] = \in_array(\intval($input["type-personnality"]), [1, 2], \true) ?
            \intval($input["type-personnality"])
            : \null : \null;

        $this->data_for_db["adress"] = \array_key_exists("adress", $input) ? \trim($input["adress"]) != "" ?  \trim($input["adress"]) : \null : \null;

        $this->data_for_db["nif"] = \array_key_exists("nif", $input) ? \trim($input["nif"]) != "" ?  \trim($input["nif"]) : \null : \null;

        $this->data_for_db["stat"] = \array_key_exists("stat", $input) ? \trim($input["stat"]) != "" ?  \trim($input["stat"]) : \null : \null;

        $this->data_for_db["rcs"] = \array_key_exists("rcs", $input) ? \trim($input["rcs"]) != "" ?  \trim($input["rcs"]) : \null : \null;

        $this->data_for_db["phone1"] = \array_key_exists("phone1", $input) ? \trim($input["phone1"]) != "" ?  \trim($input["phone1"]) : \null : \null;

        $this->data_for_db["phone2"] = \array_key_exists("phone2", $input) ? \trim($input["phone2"]) != "" ?  \trim($input["phone2"]) : \null : \null;

        $this->data_for_db["mail1"] = \array_key_exists("mail1", $input) ? \trim($input["mail1"]) != "" ?  \trim($input["mail1"]) : \null : \null;

        $this->data_for_db["mail2"] = \array_key_exists("mail2", $input) ? \trim($input["mail2"]) != "" ?  \trim($input["mail2"]) : \null : \null;

        $this->data_for_db["active_fournisseur"] = \array_key_exists("actif", $input) ? \intval($input["actif"]) != 0 ?  \intval($input["actif"]) : \null : \null;

        $this->data_for_db["note"] = \array_key_exists("note", $input) ? \trim($input["note"]) != "" ?  \trim($input["note"]) : \null : \null;

        $this->data_for_db["encours"] = \array_key_exists("encours", $input) ? \floatval($input["encours"]) != 0 ?  \floatval($input["encours"]) : \null : \null;

        $this->data_for_db["nb_jour"] = \array_key_exists("echeance", $input) ? \intval($input["echeance"]) != 0 ?  \intval($input["echeance"]) : \null : \null;

        $this->data_for_db["evaluation"] = \array_key_exists("evaluation", $input) ? \intval($input["evaluation"]) != 0 ?  \intval($input["evaluation"]) : \null : \null;

        $this->data_for_db["declarable"] =  \array_key_exists("declarable", $input) ? \intval($input["declarable"]) != 0 ?  \intval($input["declarable"]) : \null : \null;

        if ($input["type-personnality"] == "1") {
            // for human   

            $this->data_for_db["nom_commercial"] = \null;

            $this->data_for_db["raison_sociale"] = \null;

            $this->data_for_db["noms"] = \array_key_exists("noms", $input) ? \trim($input["noms"]) != "" ?  \trim($input["noms"]) : \null : \null;

            $this->data_for_db["prenoms"] = \array_key_exists("prenoms", $input) ? \trim($input["prenoms"]) != "" ?  \trim($input["prenoms"]) : \null : \null;

            $this->data_for_db["sexe"] = \array_key_exists("sexe", $input) ? \intval($input["sexe"]) != 0 ?  \intval($input["sexe"]) : \null : \null;

            $this->data_for_db["cin"] = \array_key_exists("cin", $input) ? \trim($input["cin"]) != "" ?  \trim($input["cin"]) : \null : \null;

            $this->data_for_db["cin_date"] = \array_key_exists("cin-date", $input) ? \trim($input["cin-date"]) != "" ?  \trim($input["cin-date"]) : \null : \null;

            $this->data_for_db["cin_lieu"] = \array_key_exists("cin-lieu", $input) ? \trim($input["cin-lieu"]) != "" ?  \trim($input["cin-lieu"]) : \null : \null;

            $this->data_for_db["naissance_date"] = \array_key_exists("naissance-date", $input) ? \trim($input["naissance-date"]) != "" ?  \trim($input["naissance-date"]) : \null : \null;

            $this->data_for_db["naissance_lieu"] = \array_key_exists("naissance-lieu", $input) ? \trim($input["naissance-lieu"]) != "" ?  \trim($input["naissance-lieu"]) : \null : \null;
        } else {

            // for company
            $this->data_for_db["nom_commercial"] = \array_key_exists("nom-commercial", $input) ? \trim($input["nom-commercial"]) != "" ?  \trim($input["nom-commercial"]) : \null : \null;

            $this->data_for_db["raison_sociale"] = \array_key_exists("raison-sociale", $input) ? \trim($input["raison-sociale"]) != "" ?  \trim($input["raison-sociale"]) : \null : \null;

            $this->data_for_db["noms"] = \null;

            $this->data_for_db["prenoms"] = \null;

            $this->data_for_db["cin"] = \null;

            $this->data_for_db["cin_date"] = \null;

            $this->data_for_db["cin_lieu"] = \null;

            $this->data_for_db["naissance_date"] = \null;

            $this->data_for_db["naissance_lieu"] = \null;

            $this->data_for_db["sexe"] = 0

        }
    }
}
