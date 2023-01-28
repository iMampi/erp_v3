<?php

// declare(strict_types=1);

namespace Converter;

class NewEmployee extends Converter
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
        $this->data_for_db["adress"] = \trim($input["adress"]) == "" ? \null : \trim($input["adress"]);
        $this->data_for_db["phone1"] = \trim($input["phone1"]) == "" ? \null : trim($input["phone1"]);
        $this->data_for_db["phone2"] = \trim($input["phone2"]) == "" ? \null : trim($input["phone2"]);
        $this->data_for_db["phonepro"] = \trim($input["phonepro"]) == "" ? \null : trim($input["phonepro"]);
        $this->data_for_db["mail1"] = \trim($input["mail1"]) == "" ? \null : trim($input["mail1"]);
        $this->data_for_db["mail2"] = \trim($input["mail2"]) == "" ? \null : trim($input["mail2"]);
        $this->data_for_db["mailpro"] = \trim($input["mailpro"]) == "" ? \null : trim($input["mailpro"]);
        $this->data_for_db["active_employee"] = \intval($input["actif"]) || \null;
        $this->data_for_db["note"] = \trim($input["note"]) == "" ? \null : trim($input["note"]);
        $this->data_for_db["evaluation"] = \intval($input["evaluation"]) || \null;
        $this->data_for_db["alloc_fam"] = \intval($input["alloc"]) || \null;
        $this->data_for_db["heures_supp"] = \intval($input["hs"]) || \null;
        $this->data_for_db["principal_magasin_uid"] = \intval($input["magasin"]) || \null;
        $this->data_for_db["matrimonial"] = \intval($input["matrimonial"]) || \null;
        $this->data_for_db["sexe"] = \intval($input["sexe"]) || \null;
        $this->data_for_db["smie"] = \intval($input["smie"]) || \null;
        $this->data_for_db["sal_base"] = \floatval($input["sal-base"]) || \null;
        $this->data_for_db["nb_enfants"] = \intval($input["nb-enfants"]) || \null;
        $this->data_for_db["avantages"] = \intval($input["avantages"]) || \null;
        $this->data_for_db["csp"] = \intval($input["csp"]) || \null;
        $this->data_for_db["noms"] = \trim($input["noms"]) == "" ? \null : trim($input["noms"]);
        $this->data_for_db["prenoms"] = \trim($input["prenoms"]) == "" ? \null : trim($input["prenoms"]);
        $this->data_for_db["cin"] = \trim($input["cin"]) == "" ? \null : trim($input["cin"]);
        $this->data_for_db["cin_date"] = \trim($input["cin-date"]) == "" ? \null : trim($input["cin-date"]);
        $this->data_for_db["cin_lieu"] = \trim($input["cin-lieu"]) == "" ? \null : trim($input["cin-lieu"]);
        $this->data_for_db["naissance_date"] = \trim($input["naissance-date"]) == "" ? \null : trim($input["naissance-date"]);
        $this->data_for_db["naissance_lieu"] = \trim($input["naissance-lieu"]) == "" ? \null : trim($input["naissance-lieu"]);
        $this->data_for_db["debut"] = \trim($input["debut"]) == "" ? \null : trim($input["debut"]);
        $this->data_for_db["fin"] = \trim($input["fin"]) == "" ? \null : trim($input["fin"]);
        $this->data_for_db["smie_num"] = \trim($input["smie-num"]) == "" ? \null : trim($input["smie-num"]);
        $this->data_for_db["cnaps_num"] = \trim($input["cnaps-num"]) == "" ? \null : trim($input["cnaps-num"]);
    }
}
