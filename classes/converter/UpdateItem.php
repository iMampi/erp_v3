<?php

// declare(strict_types=1);

namespace Converter;

class UpdateItem extends Converter
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

        $this->data_for_db["code"] = \array_key_exists("code", $input) ? \trim($input["code"]) != "" ?  \trim($input["code"]) : \null : \null;

        $this->data_for_db["name"] = \array_key_exists("name", $input) ? \trim($input["name"]) != "" ?  \trim($input["name"]) : \null : \null;

        $this->data_for_db["type_item"] = \array_key_exists("type", $input) ? \intval($input["type"]) != 0 ?  \intval($input["type"]) : 1 : 1;

        $this->data_for_db["active"] = \array_key_exists("actif", $input) ? \intval($input["actif"]) != 0 ?  \intval($input["actif"]) : 1 : 1;

        $this->data_for_db["famille"] = \array_key_exists("famille", $input) ? \trim($input["famille"]) != 0 ?  \trim($input["famille"]) : \null : \null;

        $this->data_for_db["category"] = \array_key_exists("categorie", $input) ? \trim($input["categorie"]) != 0 ?  \trim($input["categorie"]) : \null : \null;

        $this->data_for_db["unite_mesure_uid"] = \array_key_exists("measurement", $input) ? \intval($input["measurement"]) != 0 ?  \intval($input["measurement"]) : \null : \null;

        $this->data_for_db["stockable"] = \array_key_exists("stockable", $input) ? \intval($input["stockable"]) != 0 ?  \intval($input["stockable"]) : 0 : 0;

        $this->data_for_db["identifiable"] = \array_key_exists("identifiable", $input) ? \intval($input["identifiable"]) != 0 ?  \intval($input["identifiable"]) : 0 : 0;

        $this->data_for_db["declarable"] = \array_key_exists("declarable", $input) ? \intval($input["declarable"]) != 0 ?  \intval($input["declarable"]) : 0 : 0;

        $this->data_for_db["prix_vente"] = \array_key_exists("prix-vente", $input) ? \floatval($input["prix-vente"]) != 0 ?  \floatval($input["prix-vente"]) : \null : \null;

        $this->data_for_db["prix_achat_mp"] = \array_key_exists("pamp", $input) ? \floatval($input["pamp"]) != 0 ?  \floatval($input["pamp"]) : \null : \null;

        $this->data_for_db["note"] = \array_key_exists("note", $input) ? \trim($input["note"]) != "" ?  \trim($input["note"]) : \null : \null;
    }
}
