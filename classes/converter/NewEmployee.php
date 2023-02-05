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
        $this->data_for_db["uid"] = \array_key_exists("uid", $input) ? \intval($input["uid"]) != 0 ?  \intval($input["uid"]) : \null : \null;

        $this->data_for_db["matricule"] = \array_key_exists("matricule", $input) ? \intval($input["matricule"]) != 0 ?  \intval($input["matricule"]) : \null : \null;

        $this->data_for_db["adress"] = \array_key_exists("adress", $input) ? \trim($input["adress"]) != "" ?  \trim($input["adress"]) : \null : \null;

        $this->data_for_db["poste"] = \array_key_exists("poste", $input) ? \trim($input["poste"]) != "" ?  \trim($input["poste"]) : \null : \null;

        $this->data_for_db["phone1"] = \array_key_exists("phone1", $input) ? \trim($input["phone1"]) != "" ?  \trim($input["phone1"]) : \null : \null;

        $this->data_for_db["phone2"] = \array_key_exists("phone2", $input) ? \trim($input["phone2"]) != "" ?  \trim($input["phone2"]) : \null : \null;

        $this->data_for_db["phonepro"] = \array_key_exists("phonepro", $input) ? \trim($input["phonepro"]) != "" ?  \trim($input["phonepro"]) : \null : \null;

        $this->data_for_db["mail1"] = \array_key_exists("mail1", $input) ? \trim($input["mail1"]) != "" ?  \trim($input["mail1"]) : \null : \null;

        $this->data_for_db["mail2"] = \array_key_exists("mail2", $input) ? \trim($input["mail2"]) != "" ?  \trim($input["mail2"]) : \null : \null;

        $this->data_for_db["mailpro"] = \array_key_exists("mailpro", $input) ? \trim($input["mailpro"]) != "" ?  \trim($input["mailpro"]) : \null : \null;

        $this->data_for_db["active_employee"] = \array_key_exists("actif", $input) ? \intval($input["actif"]) != 0 ?  \intval($input["actif"]) : 0 : 0;

        $this->data_for_db["note"] = \array_key_exists("note", $input) ? \trim($input["note"]) != "" ?  \trim($input["note"]) : \null : \null;

        $this->data_for_db["evaluation"] = \array_key_exists("evaluation", $input) ? \intval($input["evaluation"]) != 0 ?  \intval($input["evaluation"]) : 0 : 0;

        $this->data_for_db["alloc_fam"] = \array_key_exists("alloc", $input) ? \intval($input["alloc"]) != 0 ?  \intval($input["alloc"]) : 0 : 0;

        $this->data_for_db["heures_supp"] = \array_key_exists("hs", $input) ? \intval($input["hs"]) != 0 ?  \intval($input["hs"]) : 0 : 0;

        $this->data_for_db["principal_magasin_uid"] = \array_key_exists("magasin", $input) ? \intval($input["magasin"]) != 0 ?  \intval($input["magasin"]) : 1 : 1;

        $this->data_for_db["matrimonial"] = \array_key_exists("matrimonial", $input) ? \intval($input["matrimonial"]) != 0 ?  \intval($input["matrimonial"]) : 0 : 0;

        $this->data_for_db["sexe"] = \array_key_exists("sexe", $input) ? \intval($input["sexe"]) != 0 ?  \intval($input["sexe"]) : \null : \null;

        $this->data_for_db["smie_uid"] = \array_key_exists("smie", $input) ? \intval($input["smie"]) != 0 ?  \intval($input["smie"]) : 1 : 1;

        $this->data_for_db["sal_base"] = \array_key_exists("sal-base", $input) ? \floatval($input["sal-base"]) != 0 ?  \floatval($input["sal-base"]) : \null : \null;

        $this->data_for_db["sal_variable"] = \array_key_exists("sal-variable", $input) ? \intval($input["sal-variable"]) != 0 ?  \intval($input["sal-variable"]) : 0 : 0;

        $this->data_for_db["reduc_irsa"] = \array_key_exists("reduc-irsa", $input) ? \intval($input["reduc-irsa"]) != 0 ?  \intval($input["reduc-irsa"]) : 0 : 0;

        $this->data_for_db["nb_enfants"] = \array_key_exists("nb-enfants", $input) ? \intval($input["nb-enfants"]) != 0 ?  \intval($input["nb-enfants"]) : 0 : 0;

        $this->data_for_db["avantages"] = \array_key_exists("avantages", $input) ? \intval($input["avantages"]) != 0 ?  \intval($input["avantages"]) : 0 : 0;

        $this->data_for_db["categorie"] = \array_key_exists("csp", $input) ? \trim($input["csp"]) != "" ?  \trim($input["csp"]) : \null : \null;

        $this->data_for_db["noms"] = \array_key_exists("noms", $input) ? \trim($input["noms"]) != "" ?  \trim($input["noms"]) : \null : \null;

        $this->data_for_db["prenoms"] = \array_key_exists("prenoms", $input) ? \trim($input["prenoms"]) != "" ?  \trim($input["prenoms"]) : \null : \null;

        $this->data_for_db["cin"] = \array_key_exists("cin", $input) ? \trim($input["cin"]) != "" ?  \trim($input["cin"]) : \null : \null;

        $this->data_for_db["cin_date"] = \array_key_exists("cin-date", $input) ? \trim($input["cin-date"]) != "" ?  \trim($input["cin-date"]) : \null : \null;

        $this->data_for_db["cin_lieu"] = \array_key_exists("cin-lieu", $input) ? \trim($input["cin-lieu"]) != "" ?  \trim($input["cin-lieu"]) : \null : \null;

        $this->data_for_db["naissance_date"] = \array_key_exists("naissance-date", $input) ? \trim($input["naissance-date"]) != "" ?  \trim($input["naissance-date"]) : \null : \null;

        $this->data_for_db["naissance_lieu"] = \array_key_exists("naissance-lieu", $input) ? \trim($input["naissance-lieu"]) != "" ?  \trim($input["naissance-lieu"]) : \null : \null;

        $this->data_for_db["debut"] = \array_key_exists("debut", $input) ? \trim($input["debut"]) != "" ?  \trim($input["debut"]) : \null : \null;

        $this->data_for_db["fin"] = \array_key_exists("fin", $input) ? \trim($input["fin"]) != "" ?  \trim($input["fin"]) : \null : \null;

        $this->data_for_db["smie_num"] = \array_key_exists("smie-num", $input) ? \trim($input["smie-num"]) != "" ?  \trim($input["smie-num"]) : \null : \null;

        $this->data_for_db["cnaps_num"] = \array_key_exists("cnaps-num", $input) ? \trim($input["cnaps-num"]) != "" ?  \trim($input["cnaps-num"]) : \null : \null;
    }
}
